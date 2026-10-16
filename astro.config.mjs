// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://haborite.github.io',
  trailingSlash: 'always',
  integrations: [
    mdx(),
    sitemap({
      // Project pages are served from their own repositories under the same origin.
      customPages: ['https://haborite.github.io/shall-we-bunt/'],
    }),
  ],
  image: {
    layout: 'constrained',
  },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
      remarkRehype: { footnoteLabel: '脚注', footnoteBackLabel: '本文へ戻る' },
      smartypants: false,
    }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    },
  },
});
