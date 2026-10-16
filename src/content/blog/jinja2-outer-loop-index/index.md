---
title: "Jinja2で多重ループの外側ループのインデックスを取得する"
description: "備忘録的な小ネタ。Pythonのテンプレートエンジン「Jinja2」で多重forループのインデックスを取得する方法についてです。 Jinja2では、pythonのenumerate関数に相当するものが無いので、ループのインデックスを取得する"
pubDate: "2017-10-02T22:28:04+09:00"
updatedDate: "2025-02-18T13:21:33+09:00"
tags: ["Python"]
cover: "./jinja_logo.png"
wordpressId: 74
---

## 概要

備忘録的な小ネタ。Pythonのテンプレートエンジン「[Jinja2](http://jinja.pocoo.org/docs/2.9/)」で多重forループのインデックスを取得する方法についてです。

## Jinja2でインデックスを取得する

Jinja2では、pythonのenumerate関数に相当するものが無いので、ループのインデックスを取得する際は**loop.index0**（インデックスを1から始めたいときは**loop.index**）というオブジェクトを使います。

```text
{% for i in list %}
    {{ loop.index0 }}
{% endfor %}
```

## 多重ループでインデックスを取得する

では、多重ループがあって、その内側のループの中で外側のループのインデックスを扱い時はどうすれば良いでしょうか？その場合は、**set**を使うと上手くいくそうです。

```text
{% for i in list_a %}
    {% set outer_loop = loop %}
    {% for j in list_b %}
        {{ outer_loop.index0 }}
    {% endfor %}
{% endfor %}
```

## 参考

[Get loop index of outer loop](https://stackoverflow.com/questions/1567291/get-loop-index-of-outer-loop)
