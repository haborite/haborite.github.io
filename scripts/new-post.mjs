// Scaffold a new post: npm run new -- <slug> ["タイトル"]
import fs from 'node:fs';
import path from 'node:path';

const [slug, title = slug] = process.argv.slice(2);
if (!slug || !/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
  console.error('Usage: npm run new -- <slug (a-z, 0-9, -)> ["タイトル"]');
  process.exit(1);
}
const dir = path.join('src/content/blog', slug);
if (fs.existsSync(dir)) {
  console.error(`${dir} already exists`);
  process.exit(1);
}
const now = new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 19) + '+09:00';
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(
  path.join(dir, 'index.md'),
  `---
title: ${JSON.stringify(title)}
description: ""
pubDate: ${JSON.stringify(now)}
tags: []
draft: true
---

本文。画像はこのフォルダに置いて \`![説明](./image.png)\` で参照する。
`,
);
console.log(`Created ${dir}/index.md`);
