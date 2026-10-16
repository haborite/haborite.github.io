---
title: "ThinkPad有線トラックポイントキーボード（0B47208）のFnキーとCtrlキーの入れ替え方法"
description: "ThinkPad有線トラックポイント日本語キーボード0B47208（KU-1255）のFnキーとCtrlキーの入れ替え方法 ファームウェアを書き換えることで、キーボード内部でキーを変換する ファームウェア書き換え用のGUIを作ったので、その"
pubDate: "2025-03-12T02:07:28+09:00"
updatedDate: "2025-12-15T17:13:01+09:00"
tags: []
wordpressId: 1095
legacyComments: [{"id":12,"author":"um","date":"2025-12-12T16:36:38+09:00","body":"ANSI配列のThinkPad有線キーボードで活用させてもらっています。\n\n以下の症状について、知見あればアドバイスほしいです。\nこのファームウェアやPC上でキーイベントを置き換えるタイプのソフトでCapsLockをCtrlに置き換えた前提での話なんですが、\n\nアプリのショートカットなどに利用するキーコンボで、\nShift+Ctrl(CapsLock)+[1 or 3]は認識されるけど、\nShift+Ctrl(CapsLock)+2 や Ctrl(CapsLock)+2 が認識されない現象に困っています。\nこの挙動がThinkpadキーボードのハード側の仕様なのかって知ってたりしますか？\n\nなお元のCtrlキーを使うとShift+Ctrl+2もCtrl+2も正しく認識されます"},{"id":14,"parent":12,"author":"haborite","date":"2025-12-15T16:28:11+09:00","body":"コメントありがとうございます。\n\n>Shift+Ctrl(CapsLock)+2 や Ctrl(CapsLock)+2が認識されない\nこれはキーボードのハード側の仕様ですね。\n\n\nいわゆる「Nキーロールオーバー」対応のキーボードで無い限り、3キー以上になると同時押しが不可能な組み合わせが必ず発生します。\n\n\n私の以下の投稿をご覧いただければ幸いです。\nhttps://github.com/lentinj/tp-compact-keyboard/issues/32#issuecomment-3040501846\n\n↑に添付した表において、3つのキーを選んだ時に、「行・列ともに他の2キーと重複する」キーが発生してしまう時、3番目に押したキーが認識されなくなります。\n\n\nこれは、物理的な電気配線上の制約ですので、「CapsLockの位置にあるキー」と「Left Shiftの位置にあるキー」と「2の位置にあるキー」は、配線に手を加えない限りは絶対に同時に発火させられない、ということです。\n\n\nThinkpadキーボードに限らず、一般的な「Nキーロールオーバー非対応」のキーボードには必ずこのような電気配線上の制約があります。"},{"id":15,"parent":14,"author":"haborite","date":"2025-12-17T08:23:18+09:00","body":"......と思いましたが、Shiftキーの列にはほとんどキーがアサインされていないので、これを上手く使えば3キー同時押し可能な組み合わせを増やせることに気づきました（3キー押した時に、上表の中で残り一つの頂点に相当するキーが未アサインになる場合は一意に特定できる）。ファームウェアの大幅な改造が必要ですが、工夫できる余地はあると思います。\n\n>Ctrl(CapsLock)+2 が認識されない\n誤読していてすみませんが、これは認識されるはずです（私も普段使っているcombination key）。"},{"id":16,"parent":15,"author":"haborite","date":"2025-12-18T15:41:41+09:00","body":"検証してみたところ、うまく行ったので、ku1255-firmware-modifierの新バージョンをリリースしました。\n\nhttps://github.com/haborite/ku1255-firmware-modifier/releases/tag/v0.9.0\n\nこちらで作ったファームウェアを適用することで、それらのコンビネーションキーが使えるようになります。"},{"id":17,"parent":16,"author":"um","date":"2025-12-26T14:38:01+09:00","body":"インストールして手元で動作確認できました！\nすごい！！！！！本当にありがとうございます！！日常的に使うコンビネーションだったので、めちゃくちゃ嬉しいです。\n\n指摘の通り、前のファームウェアで\"Ctrl(CapsLock)+2\"は動いていました。簡略化して伝えようと推敲した末に削りすぎてました。\n実際に使えないと気づいたのは、\n\"Alt+Shift+Ctrl(CapsLock)+2\" \n\"Shift+Ctrl(CapsLock)+2\"\nこの２つでしたが、v0.9.0でバッチリ使えるようになりました。\n\nハードの制約かなーと思いつつ、インストールするときにREADMEの\"Limitation of combination keys\"の項目まで読まなかった結果こちらにコメントしたのですが、まさか解決方法が見つかるとは。\n正直キーの特定ロジックの実態がいまいちつかめていませんが、GitHub上のCommitを追って理解してみようと思います。\n\n&gt; https://github.com/lentinj/tp-compact-keyboard/issues/32#issuecomment-3687692311\n別の方も書いていますが、GitHub Sponsorsなどサポートする手段があれば協力させてもらいます。\nありがとうございました！"},{"id":18,"parent":17,"author":"haborite","date":"2025-12-27T15:41:47+09:00","body":"私のコミットはかなり汚いので、たぶんそこから辿るのは難しいと思います。Qiitaに簡単な解説がありますので、もしご興味があればそちらを参照頂ければと思います。\nhttps://qiita.com/plotter/items/76e828bd9714492a29cc"}]
---

## 概要

-   [ThinkPad有線トラックポイント日本語キーボード0B47208](https://www.lenovo.com/jp/ja/p/accessories-and-software/keyboards-and-mice/keyboards/0b47208)（KU-1255）のFnキーとCtrlキーの入れ替え方法
-   ファームウェアを書き換えることで、キーボード内部でキーを変換する
-   [ファームウェア書き換え用のGUIを作った](https://github.com/haborite/ku1255-firmware-modifier)ので、その簡易解説
-   Bluetooth接続バージョンの後継機[ThinkPad トラックポイント キーボード II](https://www.lenovo.com/jp/ja/p/accessories-and-software/keyboards-and-mice/keyboards/4y40x49522)には適用できないので注意

## 手順

**以下の手順は旧バージョン用（ver 0.5.0以前）。 現行バージョンは以下のQiita記事を参照: [https://qiita.com/plotter/items/4eec54eaf3f8fc5e74a0](https://qiita.com/plotter/items/4eec54eaf3f8fc5e74a0)**

（旧バージョン用の手順）

1.  [Lenovo公式サイト](https://support.lenovo.com/ca/en/solutions/pd026745)から、ファームウェア（`tp_compact_usb_kb_with_trackpoint_fw.exe`）をダウンロード
2.  [GitHubのダウンロードページ](https://github.com/haborite/ku1255-firmware-modifier/releases/latest)から、ファームウェア書き換えツールをダウンロード
3.  2を解凍して、中にある`ku1255-fw-remapper.exe`を起動

![Keymap tool GUI overview](./gui-overview.png)

*Keymap tool GUI overview*

4.  「**1\. Select Original Firmware**」 をクリックして、1.でダウンロードした公式ファームウェアを指定。”Original SHA256: “の欄に`7116a3819ee094857d21e4671cb6cf953d582372126f0f6728f6b2421eda7bd4`と表示されていることを確認
5.  「**2\. Select Key Remap csv**」をクリックして、3.で解凍したフォルダ内にあるexamplesフォルダの中にある`Swap-Fn-Ctrl.csv`を選択
6.  「**3\. Modify and Save New Firmware**」を押して、変換後のファームウェアに名前を付けて保存。”Modified SHA256: “の欄に`123143092dab578550c87a62526b07a6c5f06c047f2455be87971aa51577e300`と表示されていることを確認
7.  ThinkpadキーボードをUSBに接続
8.  変換後のexeを実行して、ファームウェアを更新する
9.  ThinkpadキーボードをUSBから一度抜き、再度差す

以上の手順でFnと左Ctrlが入れ替わる。

## その他

設定CSVを編集すれば、任意のキーの入れ替え等が可能。私はFn-Ctrl入れ替えの他に

-   変換キーと無変換キーにIME ON / OFFを割り当て（MacOS風）
-   矢印キーと誤打しやすいPageUpとPgDownを無効化

している。詳しくは[GitHubのREADME](https://github.com/haborite/ku1255-firmware-modifier)を参照。

もし質問などあれば、GitHubのissueから質問して頂ければ幸いです（日本語 or 英語、どちらでもok）。
