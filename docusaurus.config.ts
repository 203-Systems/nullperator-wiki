import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'NullPerator Manual',
  tagline: 'The official guide to NullPerator',
  favicon: 'img/app-icon.png',

  future: {
    v4: true,
  },

  url: 'https://np-wiki.203.io',
  baseUrl: '/',
  organizationName: '203-Systems',
  projectName: 'nullperator-wiki',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
      onBrokenMarkdownImages: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
        },
        blog: false,
        pages: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@cmfcmf/docusaurus-search-local',
      {
        indexBlog: false,
        indexDocSidebarParentCategories: 2,
        indexPages: false,
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'NullPerator',
      hideOnScroll: true,
      logo: {
        alt: '203 Systems',
        src: 'img/203.svg',
        srcDark: 'img/203-dark.svg',
        width: 74,
        height: 30,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'manual',
          position: 'left',
          label: 'Manual',
        },
        {
          href: 'https://github.com/203-Systems/NullPerator',
          label: 'GitHub',
          position: 'right',
          'aria-label': 'NullPerator firmware repository',
        },
      ],
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Project',
          items: [
            {
              label: 'Firmware',
              href: 'https://github.com/203-Systems/NullPerator',
            },
            {
              label: 'Documentation source',
              href: 'https://github.com/203-Systems/nullperator-wiki',
            },
          ],
        },
      ],
      logo: {
        alt: '203 Systems',
        src: 'img/203-systems-long-dark.svg',
        href: 'https://203.io',
        target: '_self',
        style: {
          maxWidth: 240,
        },
      },
      copyright: `NullPerator Manual · Copyright © ${new Date().getFullYear()} 203 Systems`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
