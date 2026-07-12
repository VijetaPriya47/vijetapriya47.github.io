import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import DotMorph from './DotMorph';
import styles from './TerminalHero.module.css';

type Line =
    | { type: 'command'; content: string }
    | { type: 'output'; content: string }
    | { type: 'ok'; label: string; content: string };

const BOOT_SCRIPT: { cmd: string; output: Line[] }[] = [
    {
        cmd: 'whoami',
        output: [
            { type: 'output', content: 'Vijeta Priya — Backend & Distributed Systems Engineer' },
            { type: 'output', content: 'focus: high scale · low latency · open source' },
        ],
    },
    {
        cmd: 'ls projects/',
        output: [
            { type: 'output', content: 'ridesync/   trading-hft/   cses-solutions/' },
        ],
    },
    {
        cmd: 'cat contributions.log',
        output: [
            { type: 'ok', label: 'k8s', content: 'goroutine leak fix in pv controller tests' },
            { type: 'ok', label: 'capi', content: 'finalizer cleanup + cert-rotation events' },
            { type: 'ok', label: 'gitlab', content: 'token rotation refactor, 9+ merged MRs' },
            { type: 'ok', label: 'capa', content: 'deflaked ROSANetwork reconciler tests' },
        ],
    },
];

const COMMANDS: Record<string, string> = {
    help: 'commands: whoami · projects · contact · skills · achievements · clear',
    whoami: 'Vijeta Priya\nBackend & Distributed Systems Engineer\nNIT Agartala · B.Tech 2026',
    contact: 'github    github.com/VijetaPriya47\nlinkedin  linkedin.com/in/vzsaz\nmedium    medium.com/@vijeta004\ncodeforces codeforces.com/profile/vijetapriya',
    projects: 'ridesync/        Go microservices, gRPC, RabbitMQ, OTel\ntrading-hft/     C++ low-latency order engine\ncses-solutions/  competitive programming editorials\n\nscroll down for details ↓',
    skills: 'languages   Go · C++ · Python · SQL · Bash\nbackend     gRPC · REST · GraphQL · Protobuf\ncore        distributed systems · concurrency · LLD/HLD',
    achievements: 'meta hacker cup 2024   AIR 332 · world rank 1594\ncodeforces             specialist 1423+ · 1000+ solved',
};

const TYPE_SPEED = 45;
const LINE_PAUSE = 260;
const CMD_PAUSE = 650;

const SOCIALS = [
    { label: 'github', href: 'https://github.com/VijetaPriya47' },
    { label: 'linkedin', href: 'https://linkedin.com/in/vzsaz' },
    { label: 'medium', href: 'https://medium.com/@vijeta004' },
    { label: 'codeforces', href: 'https://codeforces.com/profile/vijetapriya' },
];

const TerminalHero = () => {
    const [lines, setLines] = useState<Line[]>([]);
    const [typing, setTyping] = useState('');
    const [booting, setBooting] = useState(true);
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);
    const timers = useRef<number[]>([]);
    const resumeUrl = useBaseUrl('/resume/VijetaPriya.pdf');

    const schedule = useCallback((fn: () => void, ms: number) => {
        timers.current.push(window.setTimeout(fn, ms));
    }, []);

    // Auto-play the boot script: type each command, then print its output.
    useEffect(() => {
        let delay = 500;
        BOOT_SCRIPT.forEach(({ cmd, output }) => {
            for (let i = 1; i <= cmd.length; i++) {
                schedule(() => setTyping(cmd.slice(0, i)), delay);
                delay += TYPE_SPEED;
            }
            delay += LINE_PAUSE;
            schedule(() => {
                setTyping('');
                setLines(prev => [...prev, { type: 'command', content: cmd }]);
            }, delay);
            output.forEach(line => {
                delay += LINE_PAUSE;
                schedule(() => setLines(prev => [...prev, line]), delay);
            });
            delay += CMD_PAUSE;
        });
        schedule(() => setBooting(false), delay);
        return () => timers.current.forEach(clearTimeout);
    }, [schedule]);

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [lines, typing]);

    const handleCommand = (raw: string) => {
        const cmd = raw.trim().toLowerCase();
        if (!cmd) return;
        if (cmd === 'clear') {
            setLines([]);
            return;
        }
        const response = COMMANDS[cmd] ?? `command not found: ${cmd} — try "help"`;
        setLines(prev => [
            ...prev,
            { type: 'command', content: raw },
            ...response.split('\n').map(content => ({ type: 'output' as const, content })),
        ]);
    };

    return (
        <header className={styles.hero}>
            <div className={styles.heroInner}>
                {/* Intro column */}
                <div className={styles.intro}>
                    <div className={styles.kicker}>$ whoami</div>
                    <h1 className={styles.name}>Vijeta Priya</h1>
                    <p className={styles.role}>
                        Backend &amp; <span className={styles.roleAccent}>Distributed Systems</span> Engineer
                    </p>
                    <p className={styles.bio}>
                        I build high-scale, low-latency systems in Go and C++, and contribute to
                        Kubernetes, Cluster API, and the GitLab Terraform Provider.
                    </p>
                    <div className={styles.actions}>
                        <Link className={styles.btnPrimary} to="/#projects">./view_projects</Link>
                        <a className={styles.btnSecondary} href={resumeUrl} target="_blank" rel="noreferrer">
                            cat resume.pdf
                        </a>
                    </div>
                    <div className={styles.socials}>
                        {SOCIALS.map(s => (
                            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className={styles.socialLink}>
                                {s.label} <span className={styles.socialArrow}>↗</span>
                            </a>
                        ))}
                    </div>
                    <DotMorph
                        shapes={[
                            { src: '/img/morph/go.svg', label: 'golang' },
                            { src: '/img/morph/cncf.svg', label: 'cncf' },
                            { text: 'KubeCon 2026', label: 'kubecon-2026' },
                        ]}
                    />
                </div>

                {/* Terminal column */}
                <div className={styles.terminal} onClick={() => inputRef.current?.focus()}>
                    <div className={styles.terminalHeader}>
                        <span className={`${styles.dot} ${styles.dotRed}`} />
                        <span className={`${styles.dot} ${styles.dotAmber}`} />
                        <span className={`${styles.dot} ${styles.dotGreen}`} />
                        <span className={styles.terminalTitle}>vijeta@backend-sys:~</span>
                    </div>
                    <div className={styles.terminalBody} ref={bodyRef}>
                        {lines.map((line, i) => {
                            if (line.type === 'command') {
                                return (
                                    <div key={i} className={styles.line}>
                                        <span className={styles.prompt}>~ ❯</span>{' '}
                                        <span className={styles.cmdText}>{line.content}</span>
                                    </div>
                                );
                            }
                            if (line.type === 'ok') {
                                return (
                                    <div key={i} className={styles.line}>
                                        <span className={styles.okLabel}>[{line.label}]</span>{' '}
                                        <span className={styles.outText}>{line.content}</span>{' '}
                                        <span className={styles.okTick}>✓</span>
                                    </div>
                                );
                            }
                            return (
                                <div key={i} className={`${styles.line} ${styles.outText}`}>
                                    {line.content}
                                </div>
                            );
                        })}
                        {booting ? (
                            <div className={styles.line}>
                                <span className={styles.prompt}>~ ❯</span>{' '}
                                <span className={styles.cmdText}>{typing}</span>
                                <span className={styles.cursor} />
                            </div>
                        ) : (
                            <div className={styles.inputLine}>
                                <span className={styles.prompt}>~ ❯</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            handleCommand(input);
                                            setInput('');
                                        }
                                    }}
                                    className={styles.input}
                                    placeholder='type "help"…'
                                    aria-label="terminal input"
                                    spellCheck={false}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TerminalHero;
