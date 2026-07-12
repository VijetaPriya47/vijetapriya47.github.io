import React, { useEffect, useRef, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './DotMorph.module.css';

/**
 * Dot-matrix logo morph (inspired by envoy1084.xyz's dot-morph-canvas):
 * each logo is sampled into a grid of dots, and the dots fly between
 * shapes on a timer.
 */

interface Shape {
    src?: string;   // logo image, sampled by alpha
    text?: string;  // or a text shape rendered in dots
    label: string;
}

const WIDTH = 460;         // internal render size, landscape
const HEIGHT = 200;
const STEP = 5;            // sampling grid step in px
const HOLD_MS = 2800;      // time a shape stays still
const MORPH_MS = 950;      // transition duration
const DOT_RADIUS = 1.4;

const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

async function samplePoints(shape: Shape, resolvedSrc: string): Promise<[number, number][]> {
    const off = document.createElement('canvas');
    off.width = WIDTH;
    off.height = HEIGHT;
    const ctx = off.getContext('2d')!;

    if (shape.text) {
        // scale the text to fit the canvas width
        ctx.font = 'bold 100px "JetBrains Mono", monospace';
        const measured = ctx.measureText(shape.text).width;
        const size = Math.min(100 * ((WIDTH * 0.82) / measured), HEIGHT * 0.55);
        ctx.font = `bold ${size}px "JetBrains Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#fff';
        ctx.fillText(shape.text, WIDTH / 2, HEIGHT / 2);
    } else {
        const img = new Image();
        img.src = resolvedSrc;
        await img.decode();
        // fit the (square) logo to the canvas height, centered horizontally
        const pad = HEIGHT * 0.12;
        const side = HEIGHT - pad * 2;
        ctx.drawImage(img, (WIDTH - side) / 2, pad, side, side);
    }

    const { data } = ctx.getImageData(0, 0, WIDTH, HEIGHT);
    const points: [number, number][] = [];
    for (let y = 0; y < HEIGHT; y += STEP) {
        for (let x = 0; x < WIDTH; x += STEP) {
            if (data[(y * WIDTH + x) * 4 + 3] > 128) {
                points.push([x, y]);
            }
        }
    }
    return points;
}

const DotMorph = ({ shapes }: { shapes: Shape[] }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [labelIdx, setLabelIdx] = useState(0);
    const resolvedSrcs = shapes.map(s => useBaseUrl(s.src ?? '')); // eslint-disable-line react-hooks/rules-of-hooks

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        let raf = 0;
        let disposed = false;

        (async () => {
            // Wait for the web font so text shapes sample the right glyphs
            await document.fonts.ready.catch(() => undefined);
            const shapePoints = await Promise.all(
                shapes.map((s, i) => samplePoints(s, resolvedSrcs[i])),
            );
            if (disposed || shapePoints.some(p => p.length === 0)) return;

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = WIDTH * dpr;
            canvas.height = HEIGHT * dpr;
            const ctx = canvas.getContext('2d')!;
            ctx.scale(dpr, dpr);

            const count = Math.max(...shapePoints.map(p => p.length));
            // Every particle needs a target in every shape: pad the smaller
            // point sets by reusing random members.
            const targets = shapePoints.map(points => {
                const padded = [...points];
                while (padded.length < count) {
                    padded.push(points[(Math.random() * points.length) | 0]);
                }
                return padded;
            });

            const seeds = Array.from({ length: count }, () => Math.random() * Math.PI * 2);
            let shape = 0;
            let from = targets[0];
            let to = targets[0];
            let morphStart = performance.now() - MORPH_MS; // start settled
            let nextSwitch = performance.now() + HOLD_MS;

            const style = getComputedStyle(canvas);
            const dotColor = style.getPropertyValue('--term-green').trim() || '#3ee08f';

            const tick = (now: number) => {
                if (now >= nextSwitch) {
                    shape = (shape + 1) % targets.length;
                    from = to;
                    to = targets[shape];
                    morphStart = now;
                    nextSwitch = now + MORPH_MS + HOLD_MS;
                    setLabelIdx(shape);
                }

                const t = easeInOutCubic(Math.min(1, (now - morphStart) / MORPH_MS));
                ctx.clearRect(0, 0, WIDTH, HEIGHT);
                ctx.fillStyle = dotColor;

                for (let i = 0; i < count; i++) {
                    const [fx, fy] = from[i];
                    const [tx, ty] = to[i];
                    // subtle idle shimmer
                    const wob = Math.sin(now / 900 + seeds[i]) * 0.6;
                    const x = fx + (tx - fx) * t + wob;
                    const y = fy + (ty - fy) * t + wob * 0.7;
                    ctx.globalAlpha = 0.55 + 0.45 * Math.sin(now / 1200 + seeds[i] * 2) ** 2;
                    ctx.beginPath();
                    ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.globalAlpha = 1;
                raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
        })();

        return () => {
            disposed = true;
            cancelAnimationFrame(raf);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.wrap}>
            <canvas ref={canvasRef} className={styles.canvas} aria-hidden />
            <div className={styles.caption}>
                <span className={styles.captionPrompt}>$ kubectl config use-context</span>
                <span key={labelIdx} className={styles.captionLabel}>
                    {shapes[labelIdx].label}
                </span>
            </div>
        </div>
    );
};

export default DotMorph;
