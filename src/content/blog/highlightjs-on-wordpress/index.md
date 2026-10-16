---
title: "Wordpressでhighlight.jsを使う"
description: "Wordpressでhighlight.jsを使うメモ マイナー言語にも対応したフルスペックのhighlight.jsを使う –> Custom buildの使用 テーマが更新されてもhighlight.js設定が消えないようにする –> "
pubDate: "2025-02-17T19:51:27+09:00"
updatedDate: "2025-02-18T13:03:20+09:00"
tags: ["Software","WordPress"]
cover: "./9039821.png"
wordpressId: 1002
---

## 概要

Wordpressでhighlight.jsを使うメモ

## ポイント

1.  マイナー言語にも対応したフルスペックのhighlight.jsを使う –> Custom buildの使用
2.  テーマが更新されてもhighlight.js設定が消えないようにする –> 子テーマの使用
3.  フォントがMSゴシックにならないようにする –> カスタムCSSの追加

## 今回の条件

-   Wordpressのインストール場所: `/var/www/html/wordpress`
-   テーマ: `vt-blogging`
-   Highlightスタイル: `atom-one-dark`

## 手順

### 子テーマの作成

1.  子テーマのディレクトリ作成

    ```bash
    $ sudo mkdir /var/www/html/wordpress/wp-content/themes/vt-blogging-child
    $ cd /var/www/html/wordpress/wp-content/themes/vt-blogging-child
    ```

2.  子テーマに空の`style.css`を設置

    ```bash
    $ sudo vim ./style.css
    ```

```css
/*
Theme Name: VT Blogging Child
Template: vt-blogging
Version: 1.0
*/
```

3.  子テーマに`functions.php`を設置

    ```bash
    $ sudo vim ./functions.php
    ```

```php
<?php
/**
 * Enqueue styles and scripts
 */
function vt_child_enqueue_assets() {
    if (!is_admin()) {
        // Highlight.js Styles & Script
        wp_enqueue_style('atom-one-dark', get_stylesheet_directory_uri() . '/highlight/styles/atom-one-dark.min.css');
        wp_enqueue_script('highlightJS', get_stylesheet_directory_uri() . '/highlight/highlight.min.js', [], false, true);
        wp_add_inline_script('highlightJS', 'hljs.highlightAll();');
    }

    // Parent Theme Style
    wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');
}
add_action('wp_enqueue_scripts', 'vt_child_enqueue_assets');
```

### highlight.jsのCustom Buildをダウンロード

1.  [https://highlightjs.org/download](https://highlightjs.org/download)
2.  “Select all languages”にチェック
3.  ダウンロード
4.  解凍
5.  解凍して得られた`highlight`ディレクトリを`vt-blogging-child`ディレクトリ内にコピー

### テーマの変更

1.  Wordpressの管理画面から –> 概観 –> vt-blogging-childを選択

### フォントの変更

1.  Wordpressのポスト画面から –> カスタマイズ –> 追加CSS –> 以下を追加して「公開」

```css
code {
    font-family: "Sans Mono", "Consolas", "Courier", monospace;
}
```

## 参考

-   [https://www.webdesignleaves.com/pr/plugins/highlight-js-wp.html](https://www.webdesignleaves.com/pr/plugins/highlight-js-wp.html)
-   [https://stackoverflow.com/questions/37426778/how-to-use-specific-font-with-highlight-js](https://stackoverflow.com/questions/37426778/how-to-use-specific-font-with-highlight-js)
