---
title: "RTX810でIPoE(DS-Lite)とPPPoE(IPv4)を併用する(VLAN利用)"
description: "NTT系の光回線において ・ 速いけどLAN内サーバーにWANからアクセスできないIPoE(DS-lite) ・ WAN⇒LANアクセスは普通にできるけど時間帯によっては極端に遅いPPPoE(IPv4) をVLANを使うことで併用できるよう"
pubDate: "2021-03-20T23:48:54+09:00"
updatedDate: "2025-02-18T13:07:20+09:00"
tags: ["Tips","Network","YAMAHA"]
cover: "./euicyqhueaaafrp-200x150-1.jpg"
wordpressId: 507
---

## 概要

NTT系の光回線において ・ 速いけどLAN内サーバーにWANからアクセスできないIPoE(DS-lite) ・ WAN⇒LANアクセスは普通にできるけど時間帯によっては極端に遅いPPPoE(IPv4) をVLANを使うことで併用できるようにしました、という話。 PCからのインターネット接続はIPoEを使い、公開サーバーはPPPoEを使っています。 似たようなことは沢山の人がやっているので、細かな事は割愛。

## 条件

-   ブロードバンドサービス: [IIJmioひかり](https://www.iijmio.jp/imh/)
-   地域: NTT東日本圏内
-   ルーター: RTX810 (Rev.11.01.34)
-   公開サーバーIPアドレス: 192.168.110.2
-   VLan1: 192.168.100.0/24
-   VLan2: 192.168.110.0/24
-   ネットボランチ使用

## コマンド

```text
# デフォルトゲートウェイをtunnel 1(DS-Lite)に設定 VLan2からの通信をfilter 1300でpp 1に流す
ip route default gateway tunnel 1 gateway pp 1 filter 1300

IPv6のプレフィックスを設定
ipv6 prefix 1 ra-prefix@lan2::/64

# VLANを切る. 今回はポート1-3はvlan1, ポート4がvlan2
vlan port mapping lan1.1 vlan1
vlan port mapping lan1.2 vlan1
vlan port mapping lan1.3 vlan1
vlan port mapping lan1.4 vlan2
lan type lan1 port-based-option=divide-network

# vlan1にIPv4用のDHCP設定
ip vlan1 address 192.168.100.1/24

# vlan1にIPv6用のDHCP設定
ipv6 vlan1 address ra-prefix@lan2::1/64
ipv6 vlan1 rtadv send 1 o_flag=on
ipv6 vlan1 dhcp service server

# vlan2にIPv4用のDHCP設定
ip vlan2 address 192.168.110.1/24

# lan2(WAN)にDS-Lite用のDHCPクライアント設定. フィルタを適用
ipv6 lan2 dhcp service client ir=on
ipv6 lan2 secure filter in 1010 1011 1012 2000
ipv6 lan2 secure filter out 3000 dynamic 100 101 102 103 104 105 106

# プロバイダ名称設定
provider vlan1 name LAN:VLAN-1
provider vlan2 name LAN:VLAN-2
provider lan2 name ipv6 PRV/0/4/0/0/1/1:iij
provider ntpdate ntp.nict.jp

# PPPoE設定
pp select 1
 pp always-on on
 pppoe use lan2
 pppoe auto disconnect off
 pp auth accept pap chap
 pp auth myname ユーザーID パスワード
 ppp lcp mru on 1454
 ppp ipcp ipaddress on
 ppp ipcp msext on
 ppp ccp type none
 ip pp secure filter in 1200 1201 1202 200000 200001 200002 200003 200008 200009 200010 200011 200012 200013 200014 200015 200016
 ip pp secure filter out 200004 200005 200006 200007 200008 200009 200010 200011 200012 200013 200099 dynamic 200080 200081 200082 200083 200084 200085 200098 200099
 ip pp nat descriptor 1
 netvolante-dns use pp server=1 auto
 netvolante-dns hostname host pp server=1 ネットボランチホスト名
 pp enable 1

# DS-Lite設定
tunnel select 1
 tunnel name ds-lite
 tunnel encapsulation ipip
 tunnel endpoint address 2404:8e00::feed:100
 tunnel enable 1

# 公開サーバーへの外部からのアクセスを許可
ip filter 1200 pass * 192.168.110.2 tcp * www
ip filter 1201 pass * 192.168.110.2 tcp * https
ip filter 1202 pass * 192.168.110.2 tcp * 22

# VLan2からの通信を捕捉するためのフィルタ
ip filter 1300 pass 192.168.110.0/24 * * * *

# PPPoE用フィルタ設定
ip filter 200000 reject 10.0.0.0/8 * * * *
ip filter 200001 reject 172.16.0.0/12 * * * *
ip filter 200002 reject 192.168.0.0/16 * * * *
ip filter 200003 reject 192.168.100.0/24 * * * *
ip filter 200004 reject * 10.0.0.0/8 * * *
ip filter 200005 reject * 172.16.0.0/12 * * *
ip filter 200006 reject * 192.168.0.0/16 * * *
ip filter 200007 reject * 192.168.110.0/24 * * *
ip filter 200008 reject * * udp,tcp 135 *
ip filter 200009 reject * * udp,tcp * 135
ip filter 200010 reject * * udp,tcp netbios_ns-netbios_ssn *
ip filter 200011 reject * * udp,tcp * netbios_ns-netbios_ssn
ip filter 200012 reject * * udp,tcp 445 *
ip filter 200013 reject * * udp,tcp * 445
ip filter 200014 pass * * icmp * *
ip filter 200015 pass * * established * *
ip filter 200016 pass * * tcp * ident
ip filter 200099 pass * * * * *
ip filter 500000 restrict * * * * *
ip filter dynamic 200080 * * ftp
ip filter dynamic 200081 * * domain
ip filter dynamic 200082 * * www
ip filter dynamic 200083 * * smtp
ip filter dynamic 200084 * * pop3
ip filter dynamic 200085 * * telnet
ip filter dynamic 200098 * * tcp
ip filter dynamic 200099 * * udp

# ポート開放設定（80, 443, 22）
nat descriptor type 1 masquerade
nat descriptor masquerade static 1 1 192.168.110.2 tcp www
nat descriptor masquerade static 1 2 192.168.110.2 tcp https
nat descriptor masquerade static 1 3 192.168.110.2 tcp 22

# IPv6用フィルタ設定
ipv6 filter 1010 pass * * icmp6 * *
ipv6 filter 1011 pass * * tcp * ident
ipv6 filter 1012 pass * * udp * 546
ipv6 filter 2000 reject * * * * *
ipv6 filter 3000 pass * * * * *
ipv6 filter dynamic 100 * * ftp
ipv6 filter dynamic 101 * * domain
ipv6 filter dynamic 102 * * www
ipv6 filter dynamic 103 * * smtp
ipv6 filter dynamic 104 * * pop3
ipv6 filter dynamic 105 * * tcp
ipv6 filter dynamic 106 * * udp

# NAT ディスクリプタの動作タイプの設定
nat descriptor type 1 masquerade

# DHCP設定
dhcp service server
dhcp server rfc2131 compliant except remain-silent
dhcp scope 1 192.168.100.20-192.168.100.191/24
dhcp scope 2 192.168.110.20-192.168.110.191/24
dns server dhcp lan2
dns server fallback on

# NTP設定
schedule at 1 */Sun 01:11 * ntpdate ntp.nict.jp

# telnet接続をLANからに限定
telnetd host lan

# SDカードの使用
sd use on
```

フィルタのベストなかけ方は正直良く分かっていない。
