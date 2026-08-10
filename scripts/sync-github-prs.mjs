import fs from 'fs';
import path from 'path';

const GITHUB_USER = 'VijetaPriya47';
const OUTPUT_FILE = path.join(process.cwd(), 'src', 'data', 'github-prs.json');
const API_URL = `https://api.github.com/search/issues?q=author:${GITHUB_USER}+is:pr+is:merged&sort=updated&order=desc&per_page=100`;

async function syncGithubPRs() {
    try {
        console.log(`Fetching merged PRs for @${GITHUB_USER}...`);
        const headers = { Accept: 'application/vnd.github+json' };
        if (process.env.GITHUB_TOKEN) {
            headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
        }

        let items = [];
        let page = 1;
        while (true) {
            const res = await fetch(`${API_URL}&page=${page}`, { headers });
            if (!res.ok) {
                throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
            }
            const data = await res.json();
            items = items.concat(data.items);
            if (data.items.length < 100 || items.length >= data.total_count) break;
            page += 1;
        }

        const prs = items
            .map(item => {
                const repoUrl = item.repository_url;
                const repo = repoUrl.replace('https://api.github.com/repos/', '');
                return {
                    repo,
                    number: item.number,
                    title: item.title,
                    link: item.html_url,
                    mergedAt: item.closed_at,
                };
            })
            .sort((a, b) => new Date(b.mergedAt).getTime() - new Date(a.mergedAt).getTime());

        const dir = path.dirname(OUTPUT_FILE);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        console.log(`Found ${prs.length} merged PRs.`);
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(prs, null, 2));
        console.log(`Saved PRs to ${OUTPUT_FILE}`);
        process.exit(0);
    } catch (error) {
        console.error('Error fetching GitHub PRs:', error);
        process.exit(1);
    }
}

syncGithubPRs();
