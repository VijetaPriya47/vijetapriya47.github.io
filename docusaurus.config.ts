import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Vijeta Priya',
  tagline: 'Backend & Distributed Systems Engineer',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://vijetapriya47.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'VijetaPriya47', // Usually your GitHub org/user name.
  projectName: 'vijetapriya47.github.io', // Usually your repo name.
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/VijetaPriya47/vijetapriya47.github.io/tree/main/',
        },
        blog: false,
        theme: {
          customCss: ['./src/css/custom.css', './src/css/cses-docs.css', './src/css/dictionary.css'],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Vijeta Priya',
      logo: {
        alt: 'Vijeta Priya Logo',
        src: 'img/avatar_logo.png',
        // style: { borderRadius: '50%' } // Moved to custom.css for better control
      },
      items: [
        { to: '/', label: 'Home', position: 'left' },
        { to: '/dictionary', label: 'Dictionary', position: 'left' },
        {
          type: 'docSidebar',
          sidebarId: 'csesSidebar',
          position: 'left',
          label: 'CSES Solutions',
        },
        {
          href: 'https://github.com/VijetaPriya47',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Portfolio',
          items: [
            {
              label: 'Home',
              to: '/',
            },
            {
              label: 'Projects',
              to: '/#projects',
            },
            {
              label: 'Dictionary',
              to: '/dictionary',
            },
            {
              label: 'CSES Solutions',
              to: '/docs/cses/intro',
            },
          ],
        },
        {
          title: 'Connect',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/VijetaPriya47',
            },
            {
              label: 'LinkedIn',
              href: 'https://linkedin.com/in/vzsaz',
            },
            {
              label: 'Codeforces',
              href: 'https://codeforces.com/profile/vijetapriya',
            },
            {
              label: 'Medium',
              href: 'https://medium.com/@vijeta004',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/#blog',
            },
            {
              label: 'Resume',
              href: '/resume/VijetaPriya.pdf',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Vijeta Priya. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
