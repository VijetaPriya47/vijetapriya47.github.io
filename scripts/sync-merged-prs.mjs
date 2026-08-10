import fs from 'fs';
import path from 'path';

const GITHUB_USER = 'VijetaPriya47';
const GITLAB_USER = 'vijeta004';
const OUTPUT_FILE = path.join(process.cwd(), 'src', 'data', 'merged-prs.json');

async function fetchGithubPRs() {
    const headers = { Accept: 'application/vnd.github+json' };
    if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    let items = [];
    let page = 1;
    while (true) {
        const url = `https://api.github.com/search/issues?q=author:${GITHUB_USER}+is:pr+is:merged&sort=updated&order=desc&per_page=100&page=${page}`;
        const res = await fetch(url, { headers });
        if (!res.ok) {
            throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        items = items.concat(data.items);
        if (data.items.length < 100 || items.length >= data.total_count) break;
        page += 1;
    }

    return items.map(item => ({
        repo: item.repository_url.replace('https://api.github.com/repos/', ''),
        number: item.number,
        title: item.title,
        link: item.html_url,
        mergedAt: item.closed_at,
        source: 'github',
    }));
}

async function fetchGitlabMRs() {
    let items = [];
    let page = 1;
    while (true) {
        const url = `https://gitlab.com/api/v4/merge_requests?author_username=${GITLAB_USER}&scope=all&state=merged&per_page=100&page=${page}`;
        const res = await fetch(url, { headers: { Accept: 'application/json' } });
        if (!res.ok) {
            throw new Error(`GitLab API error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        items = items.concat(data);
        if (data.length < 100) break;
        page += 1;
    }

    return items.map(item => {
        const repo = item.web_url.split('/-/merge_requests/')[0].replace('https://gitlab.com/', '');
        return {
            repo,
            number: item.iid,
            title: item.title,
            link: item.web_url,
            mergedAt: item.merged_at,
            source: 'gitlab',
        };
    });
}

async function syncMergedPRs() {
    try {
        console.log(`Fetching merged PRs for @${GITHUB_USER} (GitHub) and @${GITLAB_USER} (GitLab)...`);
        const [githubPRs, gitlabMRs] = await Promise.all([fetchGithubPRs(), fetchGitlabMRs()]);

        const merged = [...githubPRs, ...gitlabMRs].sort(
            (a, b) => new Date(b.mergedAt).getTime() - new Date(a.mergedAt).getTime()
        );

        const dir = path.dirname(OUTPUT_FILE);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        console.log(`Found ${githubPRs.length} GitHub PRs and ${gitlabMRs.length} GitLab MRs (${merged.length} total).`);
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(merged, null, 2));
        console.log(`Saved merged log to ${OUTPUT_FILE}`);
        process.exit(0);
    } catch (error) {
        console.error('Error syncing merged PRs/MRs:', error);
        process.exit(1);
    }
}

syncMergedPRs();
