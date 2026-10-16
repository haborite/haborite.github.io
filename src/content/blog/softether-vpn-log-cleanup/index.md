---
title: "Softether VPN serverのログ削除方法メモ"
description: "さくらVPSで動かしてたSoftether VPN server、なんか最近安定しないな？と思ってたらログが40 GBくらい溜まってストレージが満タンになってた。以下、不要なログを削除して解決。 または CGroupの欄を見る。たぶん/us"
pubDate: "2025-01-26T00:28:03+09:00"
updatedDate: "2025-02-18T13:08:55+09:00"
tags: ["Tips","Softether"]
cover: "./images.png"
wordpressId: 572
---

## 不要ログによるVPNサーバーの不安定化

さくらVPSで動かしてたSoftether VPN server、なんか最近安定しないな？と思ってたらログが40 GBくらい溜まってストレージが満タンになってた。以下、不要なログを削除して解決。

## 手順

### Softetherサービスの実行ファイルパスを確認

```bash
$ sudo systemctl status softether-vpnserver
```

または

```bash
$ sudo systemctl status vpnserver
```

CGroupの欄を見る。たぶん/usr/local/vpnserverとか /usr/libexec/softether/vpnserverとかその辺。ログの保管場所はvpnserver実行ファイルと同ディレクトリのこともあるし、/var/log/softether/内にあることもあるようだ。

### ログの容量をチェック

```bash
$ cd /usr/local/vpnserver
$ sudo du -h
```

ログ（packet\_log/ security\_log/ server\_log/）が溜まっている可能性が高い。

### ログディレクトリのパーミッションを変更して削除

```bash
$ sudo chmod -R 755 packet_log/ security_log/ server_log/
$ sudo rm -rf packet_log/ security_log/ server_log/
```

### 必要ないならログを保存しないように設定しておく

SE-VPNサーバー管理ツール –> 仮想HUBの管理 –> ログ保存設定 –>

-   セキュリティログを保存する
-   パケットログを保存する のチェックボックスを外す。セキュリティログとパケットログは上記手順でoffできるけど、サーバーログは溜まるようなので、cronで削除スケジューリングした方が良い。

## 参考

-   [https://ja.softether.org/4-docs/1-manual/3.\_SoftEther\_VPN\_Server\_Manual/3.10\_Logging\_Service](https://ja.softether.org/4-docs/1-manual/3._SoftEther_VPN_Server_Manual/3.10_Logging_Service)
-   [https://tech.kurojica.com/archives/56997](https://tech.kurojica.com/archives/56997/)
