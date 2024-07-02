// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Workhop AI',
  tagline: 'IaC - AI',
  favicon: 'img/ikdoeict.png',

  // Set the production url of your site here
  url: 'https://ikdoeict.gitlab.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docenten/infrastructure_as_code/iac-projecten-git/22-23-iac-project-git/22-23-iac-project-git-team6/workshop-ai/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ikdoeict', // Usually your GitHub org/user name.
  projectName: 'project-iac', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      // 'classic',
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          remarkPlugins: [math],
          rehypePlugins: [katex],
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      navbar: {
        title: 'Infrastructure as Code',
        logo: {
          alt: 'ikdoeict',
          src: 'img/ikdoeict.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'doc-inleiding',
            sidebarId: 'workshopSidebar',
            position: 'left',
            label: 'Workshop',
            to: '/docs/inleiding'
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Workshop',
                to: '/docs/inleiding',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Odisee',
                to: 'https://www.odisee.be',
              },
              {
                label: 'GitLab',
                href: 'https://gitlab.com/ikdoeict',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Odisee-opleiding Elektronica-ict, built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
