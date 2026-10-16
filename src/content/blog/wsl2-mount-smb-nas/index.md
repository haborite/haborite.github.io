---
title: "WSL2にNAS(SMB)をマウントする"
description: "WSL2 (Ubuntu) からNASドライブ(SMB ver 1.0)を自動的にマウントするための手順メモ CIFS (SMB) プロトコルを使ってNASドライブをマウントするために、cifs-utils パッケージをインストール マウン"
pubDate: "2025-02-20T13:54:27+09:00"
updatedDate: "2025-02-24T18:09:55+09:00"
tags: []
cover: "./smb.png"
wordpressId: 1067
---

## 概要

WSL2 (Ubuntu) からNASドライブ(SMB ver 1.0)を自動的にマウントするための手順メモ

## 手順

1.  CIFS (SMB) プロトコルを使ってNASドライブをマウントするために、cifs-utils パッケージをインストール

    ```bash
    sudo apt update
    sudo apt install cifs-utils
    ```

2.  マウントディレクトリの作成 例えば、/mnt/nas ディレクトリを作成

    ```bash
    sudo mkdir -p /mnt/nas
    ```

3.  SMBユーザー名とパスワードを保存するために、資格情報ファイルを作成（~/.smbcredentials）

    ```bash
    vim ~/.smbcredentials
    ```

    以下の内容を記述：

    ```
    username=ユーザー名
    password=パスワード
    ```

4.  権限を設定

    ```
    chmod 600 ~/.smbcredentials
    ```

5.  システム起動時に自動的にNASドライブがマウントされるように、/etc/fstab にエントリを追加

    ```bash
    sudo vim /etc/fstab
    ```

6.  以下のエントリを追加. 以下はたとえばマウント先が`//192.168.100.2/share/usr/Username`の場合は以下の通り。 デフォルトではSMB ver 1.0が無効になっているので、`vers=1.0 0 0`がポイント

    ```text
    //192.168.100.2/share/usr/Username /mnt/nas cifs credentials=/home/Username/.smbcredentials,uid=1000,gid=1000,vers=1.0 0 0
    ```

7.  マウントの確認 手動でマウントするには、次のコマンドを実行

    ```bash
    sudo systemctl daemon-reload
    sudo mount -a
    ```
