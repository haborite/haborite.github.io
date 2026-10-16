---
title: "今週の分子軌道: メタン"
description: "[新コーナー] 今週の分子軌道（某アニメ風） 密度汎関数理論（DFT）を用いて計算したいろんな分子の分子軌道（MO: Molecular Orbital）を、特に解説するでもなくただひたすら載せるだけの誰得コーナーです。一応のポリシーとして"
pubDate: "2018-08-06T01:00:14+09:00"
updatedDate: "2025-02-08T20:18:31+09:00"
tags: ["Chemistry","Physics"]
draft: true
wordpressId: 66
---

**\[新コーナー\] 今週の分子軌道**（某アニメ風）

密度汎関数理論（DFT）を用いて計算したいろんな分子の分子軌道（MO: Molecular Orbital）を、**特に解説するでもなく**ただひたすら載せるだけの~誰得~コーナーです。一応のポリシーとしては

1.  全分子軌道を乗っける
2.  軌道エネルギーも併せて乗っける
3.  できれば分子軌道係数（Molecular Orbital Coefficient）も乗っける
4.  最後に占有軌道を全部重ねる

みたいな感じです。いつもフロンティア軌道ばっかりちやほやされるので、たまにはその他の膨大な軌道にも思いを馳せてください・・・というのが本音。

今日は第一回目ということで、シンプル・イズ・ザベスト「メタン」の分子軌道をずらずらと並べていきます。~水素分子はシンプルすぎてテンション上がらないから却下。~

**\[メタン\]** 分子式 CH4 モル質量 16.042 g/mol 外観 常温で無色透明の気体 calculated by B3LYP/STO-3G (isovalue = 0.02)

**分子軌道1**: φ<sub>1</sub> = 0.99Φ<sub>C1s</sub> + 0.05Φ<sub>C2s</sub> 軌道エネルギー: **-272 eV** エネルギー的に**地の底**にある分子軌道。ほぼ**ただの炭素1s軌道**。節0個。 ![f:id:Cyclodextrin:20180806001301j:plain](./20180806001301.jpg "f:id:Cyclodextrin:20180806001301j:plain")

**分子軌道2**: φ<sub>2</sub> = -0.23Φ<sub>C1s</sub> + 0.63Φ<sub>C2s</sub> + 4 × 0.18Φ<sub>H1s</sub> 軌道エネルギー: **\-18 eV** 入ってる電子数: 2 s軌道たちがほどほどに混ざった軌道。C1sの係数はマイナスなので、見えないけど内部に節が一つはあるはず。 ![f:id:Cyclodextrin:20180806001243j:plain](./20180806001243.jpg "f:id:Cyclodextrin:20180806001243j:plain")

**分子軌道3**: φ<sub>3</sub> = 0.58Φ<sub>C2pX</sub> + 2 × 0.30Φ<sub>H1s</sub> - 2 × 0.30Φ<sub>H1s</sub> 軌道エネルギー: **\-10 eV** 入ってる電子数: 2 **縮退その1**。炭素2pと水素1sが、同位相でいい感じに重なった軌道。 ![f:id:Cyclodextrin:20180806001644j:plain](./20180806001644.jpg "f:id:Cyclodextrin:20180806001644j:plain")

**分子軌道4**: φ<sub>4</sub> = 0.58Φ<sub>C2pY</sub> + 2 × 0.30Φ<sub>H1s</sub> - 2 × 0.30Φ<sub>H1s</sub> 軌道エネルギー: **-10 eV** 入ってる電子数: 2 縮退その2。 ![f:id:Cyclodextrin:20180806001414j:plain](./20180806001414.jpg "f:id:Cyclodextrin:20180806001414j:plain")

**分子軌道5**: φ<sub>5</sub> = 0.58Φ<sub>C2pZ</sub> + 2 × 0.30Φ<sub>H1s</sub> - 2 × 0.30Φ<sub>H1s</sub> 軌道エネルギー: **\-10 eV** 入ってる電子数: 2 縮退その3。**こいつら3つがHOMO（最高被占軌道）**。 ![f:id:Cyclodextrin:20180806001538j:plain](./20180806001538.jpg "f:id:Cyclodextrin:20180806001538j:plain")

**分子軌道6**: φ<sub>6</sub> = 1.11Φ<sub>C2pX</sub> + 2 × 0.63Φ<sub>H1s</sub> - 2 × 0.63Φ<sub>H1s</sub> 軌道エネルギー: **+12 eV** 入ってる電子数: 0 **LUMO（最低空軌道）**。HOMOとは逆に、炭素2pと水素1sが逆位相で重なっちゃった軌道。やっぱり３つ縮退している。 ![f:id:Cyclodextrin:20180806001741j:plain](./20180806001741.jpg "f:id:Cyclodextrin:20180806001741j:plain")

**分子軌道7**: φ<sub>7</sub> = 1.11Φ<sub>C2pY</sub> + 2 × 0.63Φ<sub>H1s</sub> - 2 × 0.63Φ<sub>H1s</sub> 軌道エネルギー: **+12 eV** 同上。軌道エネルギーがプラスってことは、電子の気持ちとしては「この軌道に入るぐらいなら真空（0 eV）に飛び出す方がマシ」ということか？ ![f:id:Cyclodextrin:20180806001845j:plain](./20180806001845.jpg "f:id:Cyclodextrin:20180806001845j:plain")

**分子軌道8**: φ<sub>8</sub> = 1.11Φ<sub>C2pZ</sub> + 2 × 0.63Φ<sub>H1s</sub> - 2 × 0.63Φ<sub>H1s</sub> 軌道エネルギー: **+12 eV** 同上。 ![f:id:Cyclodextrin:20180806001959j:plain](./20180806001959.jpg "f:id:Cyclodextrin:20180806001959j:plain")

**分子軌道9**: φ<sub>9</sub> = -0.26Φ<sub>C1s</sub> + 1.67Φ<sub>C2s</sub> + 4 × -0.68Φ<sub>H1s</sub> 軌道エネルギー: **+13 eV** 最高空軌道（HUMO?）とでもいうべきか。とりあえず節アンド節。 ![f:id:Cyclodextrin:20180806002128j:plain](./20180806002128.jpg "f:id:Cyclodextrin:20180806002128j:plain")

\[まとめ\] **占有軌道（軌道1～4）を重ね合わせた図** ![f:id:Cyclodextrin:20180806011541j:plain](./20180806011541.png "f:id:Cyclodextrin:20180806011541j:plain")

今週はここまで！
