# haborite.github.io

haborite の個人サイト（ブログ・作ったもの）。[Astro](https://astro.build/) で生成し、GitHub Actions で GitHub Pages にデプロイしている。

## 記事を書く

```sh
npm install
npm run new -- my-new-post "記事のタイトル"   # src/content/blog/my-new-post/index.md ができる
npm run dev                                    # http://localhost:4321 でプレビュー（下書きも表示される）
```

- 1記事 = 1フォルダ（`src/content/blog/<slug>/index.md`）。URL は `/blog/<slug>/`。
- 画像は同じフォルダに置いて `![説明](./image.png)` で参照（ビルド時に WebP 化・リサイズされる）。
- 書き終えたら frontmatter の `draft: true` を消して `main` に push すれば公開される。
- コードブロックは言語名つきのフェンス（```` ```python ````）で書く。Shiki でビルド時にハイライトされる。
- 数式は `$...$` / `$$...$$`（KaTeX）。
- インタラクティブな要素を入れたい記事は `index.mdx` にすればコンポーネントを埋め込める。

### frontmatter

| キー | 必須 | 説明 |
| --- | --- | --- |
| `title` | ✓ | タイトル |
| `pubDate` | ✓ | 公開日時（`2026-10-16T12:00:00+09:00`） |
| `description` | | 一覧・OGP 用の要約 |
| `updatedDate` | | 更新日時 |
| `tags` | | タグの配列 |
| `cover` | | アイキャッチ画像（`./cover.png`） |
| `draft` | | `true` なら本番ビルドから除外 |

## 構成

| パス | 内容 |
| --- | --- |
| `src/content/blog/` | 記事 |
| `src/data/projects.ts` | Projects ページ・トップの成果物一覧 |
| `src/consts.ts` | サイト名、SNS リンク、giscus（コメント）設定 |
| `src/pages/hanoi.astro` | ハノイの塔 |

`npm run build` で `dist/` に静的サイトと Pagefind の検索インデックスが生成される。
