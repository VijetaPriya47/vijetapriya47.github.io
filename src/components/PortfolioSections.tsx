import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';
import styles from './PortfolioSections.module.css';
import githubPRs from '../data/github-prs.json';

const GITHUB_HANDLE = 'VijetaPriya47';

const SectionHeading = ({ name, flag }: { name: string; flag?: string }) => (
    <h2 className="term-heading">
        {name}
        {flag && <span className="term-heading-flag">{flag}</span>}
    </h2>
);

/* ---------------- Stats ---------------- */

const stats = [
    { value: 'AIR 332', label: 'Meta Hacker Cup 2024', sub: 'world rank 1594 · round 1' },
    { value: '1423+', label: 'Codeforces Specialist', sub: '1000+ problems solved' },
    { value: '15+', label: 'Merged PRs / MRs', sub: 'k8s · CAPI · GitLab · Hyperledger' },
    { value: '10+', label: 'Technical Articles', sub: 'distributed systems on Medium' },
];

const StatsSection = () => (
    <section className={styles.section}>
        <div className={styles.statsGrid}>
            {stats.map(s => (
                <div key={s.label} className={styles.statCard}>
                    <div className={styles.statValue}>{s.value}</div>
                    <div className={styles.statLabel}>{s.label}</div>
                    <div className={styles.statSub}>{s.sub}</div>
                </div>
            ))}
        </div>
    </section>
);

/* ---------------- Experience ---------------- */

interface ExperienceEntry {
    logo: string;
    logoExternal?: boolean;
    date: string;
    role: string;
    org: string;
    items: { text: React.ReactNode; link?: { href: string; label: string } }[];
}

const experience: ExperienceEntry[] = [
    {
        logo: 'https://github.com/kubernetes.png',
        logoExternal: true,
        date: 'Jan 2026 — present',
        role: 'Open Source Contributor',
        org: 'Kubernetes & Cluster API',
        items: [
            {
                text: <>Fixed a goroutine leak in <code>TestNodeSyncResync</code> by correctly handling the <code>opChan</code> lifecycle, preventing test hangs in core Kubernetes.</>,
                link: { href: 'https://github.com/kubernetes/kubernetes/pull/135217', label: 'PR #135217' },
            },
            {
                text: <>Resolved flakiness in <code>TestROSANetworkReconciler</code> (CAPA / AWS provider) with <code>Eventually</code> assertions.</>,
                link: { href: 'https://github.com/kubernetes-sigs/cluster-api-provider-aws/pull/5861', label: 'PR #5861' },
            },
            {
                text: <>Updated Cluster API controller to remove finalizers during deletion when <code>ownerRef</code> was never set.</>,
                link: { href: 'https://github.com/kubernetes-sigs/cluster-api/pull/13239', label: 'PR #13239' },
            },
            {
                text: <>Added Kubernetes Events for automatic certificate rotation in <code>KubeadmControlPlane</code>.</>,
                link: { href: 'https://github.com/kubernetes-sigs/cluster-api/pull/13242', label: 'PR #13242' },
            },
            {
                text: <>Proposed <code>maxRetry</code> for <code>RemediationStrategy</code> in MachineDeployments to align with KCP remediation.</>,
                link: { href: 'https://github.com/kubernetes-sigs/cluster-api/issues/12553', label: 'Issue #12553' },
            },
        ],
    },
    {
        logo: '/img/gitlab.png',
        date: '2024 — present',
        role: 'Open Source Contributor',
        org: 'GitLab Terraform Provider',
        items: [
            {
                text: <>Refactored token rotation into a shared <code>RotatableToken</code> interface across Project, Group, Personal and Service Account tokens.</>,
                link: { href: 'https://gitlab.com/gitlab-org/terraform-provider-gitlab/-/merge_requests/2894', label: 'MR !2894' },
            },
            {
                text: <>Implemented <code>gitlab_project_security_settings</code> resource for automated security management.</>,
                link: { href: 'https://gitlab.com/gitlab-org/terraform-provider-gitlab/-/merge_requests/2897', label: 'MR !2897' },
            },
            {
                text: <>Fixed wiki subpage title drift and special-character slug handling.</>,
                link: { href: 'https://gitlab.com/gitlab-org/terraform-provider-gitlab/-/merge_requests/2896', label: 'MR !2896' },
            },
            {
                text: <>Hardened <code>DetermineExpiryDate</code> to return proper validation info, preventing segfaults across all token resources.</>,
                link: { href: 'https://gitlab.com/gitlab-org/terraform-provider-gitlab/-/merge_requests/2722', label: 'MR !2722' },
            },
            {
                text: <>Made project label renames in-place via numeric ID mapping instead of full resource replacement.</>,
                link: { href: 'https://gitlab.com/gitlab-org/terraform-provider-gitlab/-/merge_requests/2719', label: 'MR !2719' },
            },
            {
                text: <>Built artifact-file data source to download text and binary CI/CD job artifacts through Terraform.</>,
                link: { href: 'https://gitlab.com/gitlab-org/terraform-provider-gitlab/-/merge_requests/2721', label: 'MR !2721' },
            },
            {
                text: <>Added group service account token data source, package dependency proxy resource (GraphQL), label priority support, and compliance requirement resource.</>,
                link: { href: 'https://gitlab.com/gitlab-org/terraform-provider-gitlab/-/merge_requests/2805', label: 'MR !2805 +' },
            },
            {
                text: <>Added <code>gitlab_compliance_requirement</code> resource for managing Compliance Framework Requirements and Controls (Ultimate) via GraphQL.</>,
                link: { href: 'https://gitlab.com/gitlab-org/terraform-provider-gitlab/-/merge_requests/3178', label: 'MR !3178' },
            },
        ],
    },
    {
        logo: '/img/jubilant.jpeg',
        date: 'Jun — Jul 2025',
        role: 'GET Intern',
        org: 'Jubilant Ingrevia Limited',
        items: [
            { text: <>Enhanced distillation efficiency using Fenske–Underwood–Gilliland and McCabe–Thiele methods.</> },
            { text: <>Analyzed performance data with Matplotlib and applied pattern recognition to identify critical optimization factors.</> },
        ],
    },
    {
        logo: '/img/asksenior.jpeg',
        date: '2023 — 2024',
        role: 'Mentor',
        org: 'Ask Senior',
        items: [
            { text: <>Created 50+ video editorials on bit manipulation and interactive problems.</> },
            { text: <>Mentored junior developers in competitive programming.</> },
        ],
    },
];

const TimelineLogo = ({ entry }: { entry: ExperienceEntry }) => {
    const resolved = useBaseUrl(entry.logo);
    return (
        <img
            src={entry.logoExternal ? entry.logo : resolved}
            alt={entry.org}
            className={styles.timelineLogo}
            loading="lazy"
        />
    );
};

const ExperienceSection = () => (
    <section className={styles.section}>
        <SectionHeading name="git log" flag="--experience" />
        <div className={styles.timeline}>
            {experience.map(entry => (
                <article key={entry.org} className={styles.timelineItem}>
                    <div className={styles.timelineRail}>
                        <TimelineLogo entry={entry} />
                        <div className={styles.timelineLine} />
                    </div>
                    <div className={styles.timelineContent}>
                        <div className={styles.timelineMeta}>
                            <span className={styles.timelineDate}>{entry.date}</span>
                            <h3 className={styles.timelineOrg}>{entry.org}</h3>
                            <span className={styles.timelineRole}>{entry.role}</span>
                        </div>
                        <ul className={styles.timelineList}>
                            {entry.items.map((item, i) => (
                                <li key={i}>
                                    {item.text}
                                    {item.link && (
                                        <>
                                            {' '}
                                            <a href={item.link.href} target="_blank" rel="noreferrer" className={styles.mrLink}>
                                                [{item.link.label}]
                                            </a>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </article>
            ))}
        </div>
    </section>
);

/* ---------------- Merged contributions log ---------------- */

interface MergedPR {
    repo: string;
    number: number;
    title: string;
    link: string;
    mergedAt: string;
}

const merged = githubPRs as MergedPR[];

const MergedLogSection = () => (
    <section className={styles.section}>
        <SectionHeading name="tail -f merged.log" flag="--open-source" />
        <div className={styles.logWindow}>
            <div className={styles.logHeader}>
                <span className={`${styles.dot} ${styles.dotRed}`} />
                <span className={`${styles.dot} ${styles.dotAmber}`} />
                <span className={`${styles.dot} ${styles.dotGreen}`} />
                <span className={styles.logTitle}>
                    merged.log — @{GITHUB_HANDLE} — {merged.length} entries
                    <span className={styles.logCron}> (managed by a Cron Job)</span>
                </span>
            </div>
            <div className={styles.logTableHead}>
                <span className={styles.logIndex}>#</span>
                <span className={styles.logRepo}>repo</span>
                <span className={styles.logDesc}>title</span>
                <span className={styles.logStatus}>merged</span>
            </div>
            <div className={styles.logBody}>
                {merged.map((m, i) => (
                    <a key={m.link} href={m.link} target="_blank" rel="noreferrer" className={styles.logRow}>
                        <span className={styles.logIndex}>{String(i + 1).padStart(2, '0')}</span>
                        <span className={styles.logRepo}>{m.repo}</span>
                        <span className={styles.logDesc}>{m.title}</span>
                        <span className={styles.logStatus}>
                            {new Date(m.mergedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}
                        </span>
                    </a>
                ))}
            </div>
        </div>
    </section>
);

/* ---------------- Projects ---------------- */

const projects = [
    {
        file: 'ridesync.go',
        title: 'RideSync',
        description:
            'Distributed ride-sharing backend in Go: gRPC microservices behind a custom API gateway, carpooling via path-overlap matching, MongoDB 2dsphere + CAS to prevent double-dispatch, RabbitMQ DLQ fault tolerance, OTel + Jaeger tracing, and a Stripe-backed finance/audit subsystem.',
        tech: ['Go', 'gRPC', 'RabbitMQ', 'MongoDB', 'OpenTelemetry', 'Stripe'],
        link: 'https://vijetapriya47.github.io/RideSync/',
        external: true,
    },
    {
        file: 'trading_engine.cpp',
        title: 'Low-Latency Trading System',
        description:
            'C++ order engine with a factory-pattern order lifecycle (place / modify / cancel), chrono + spdlog latency instrumentation, and a runtime-switchable WebSocket layer — benchmarked Zsocket 9% faster than Boost.',
        tech: ['C++', 'Boost', 'WebSocket', 'spdlog'],
        link: 'https://vijetapriya47.github.io/docs/cses/intro',
        external: true,
    },
    {
        file: 'cses_solutions.md',
        title: 'CSES Solutions',
        description:
            'A growing collection of editorial-style solutions to CSES problems — dynamic programming, graphs, sorting, and mathematics — with multiple approaches and complexity analysis.',
        tech: ['C++', 'Algorithms', 'Data Structures'],
        link: '/docs/cses/intro',
        external: false,
    },
];

const ProjectsSection = () => (
    <section id="projects" className={styles.section}>
        <SectionHeading name="ls projects/" flag="--featured" />
        <div className={styles.projectsGrid}>
            {projects.map(p => (
                <article key={p.file} className={styles.projectCard}>
                    <div className={styles.projectHeader}>
                        <span className={`${styles.dot} ${styles.dotRed}`} />
                        <span className={`${styles.dot} ${styles.dotAmber}`} />
                        <span className={`${styles.dot} ${styles.dotGreen}`} />
                        <span className={styles.projectFile}>{p.file}</span>
                    </div>
                    <div className={styles.projectBody}>
                        <h3 className={styles.projectTitle}>{p.title}</h3>
                        <p className={styles.projectDesc}>{p.description}</p>
                        <div className={styles.projectTags}>
                            {p.tech.map(t => (
                                <span key={t} className={styles.projectTag}>{t}</span>
                            ))}
                        </div>
                    </div>
                    <div className={styles.projectFooter}>
                        {p.external ? (
                            <a href={p.link} target="_blank" rel="noreferrer" className={styles.projectLink}>
                                ./open <span aria-hidden>↗</span>
                            </a>
                        ) : (
                            <Link to={p.link} className={styles.projectLink}>
                                ./open <span aria-hidden>→</span>
                            </Link>
                        )}
                    </div>
                </article>
            ))}
        </div>
    </section>
);

/* ---------------- Skills ---------------- */

const skillGroups = [
    { key: 'languages', items: ['Go', 'C++', 'Python', 'SQL', 'Bash'] },
    { key: 'backend', items: ['gRPC', 'REST', 'GraphQL', 'Protobuf', 'RabbitMQ', 'WebSockets'] },
    { key: 'infra', items: ['Kubernetes', 'Terraform', 'Docker', 'CI/CD', 'OpenTelemetry'] },
    { key: 'core', items: ['Distributed Systems', 'Concurrency', 'System Design (LLD/HLD)', 'SOLID'] },
];

const SkillsSection = () => (
    <section className={styles.section}>
        <SectionHeading name="cat skills.yaml" />
        <div className={styles.skillsCard}>
            {skillGroups.map(group => (
                <div key={group.key} className={styles.skillRow}>
                    <span className={styles.skillKey}>{group.key}:</span>
                    <div className={styles.skillChips}>
                        {group.items.map(item => (
                            <span key={item} className={styles.skillChip}>{item}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </section>
);

/* ---------------- Root ---------------- */

const PortfolioSections = () => (
    <div className={styles.container}>
        <StatsSection />
        <ExperienceSection />
        <MergedLogSection />
        <ProjectsSection />
        <SkillsSection />
    </div>
);

export default PortfolioSections;
