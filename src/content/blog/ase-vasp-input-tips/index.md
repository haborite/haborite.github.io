---
title: "ASEでVASP用計算ファイルを作る際の注意点まとめ"
description: "何らかのファイルフォーマットでセルの原子座標をASEで読み込んだ後、普通にPOSCARフォーマットにwrite_vaspで変換すると、原子数カウントにおいて同じ原子のカウントが複数の項目に分割されてしまうことがある。たとえば であるべきとこ"
pubDate: "2025-02-20T14:08:06+09:00"
updatedDate: "2025-02-24T18:05:40+09:00"
tags: []
cover: "./images.jpg"
wordpressId: 1073
---

## 原子数カウントが分割される

何らかのファイルフォーマットでセルの原子座標をASEで読み込んだ後、普通にPOSCARフォーマットに`write_vasp`で変換すると、原子数カウントにおいて同じ原子のカウントが複数の項目に分割されてしまうことがある。たとえば

```text
H  O  Zn
 1.0000000000000000
    19.7340000000000018    0.0000000000000000    0.0000000000000000
     0.0000000000000000   15.9209999999999994    0.0000000000000000
     0.0000000000000000    0.0000000000000000   42.8280107699999988
 H   O   Zn 
   2 217 216
```

であるべきところが

```text
H  O  Zn
 1.0000000000000000
    19.7340000000000018    0.0000000000000000    0.0000000000000000
     0.0000000000000000   15.9209999999999994    0.0000000000000000
     0.0000000000000000    0.0000000000000000   42.8280107699999988
 H   O   Zn    O   Zn 
   2 117 116 100 100
```

のようになってしまう。このようになるとVASPでエラーを吐くので、きちんと整理してやる必要がある。

以下で可能

```python
species = atoms.get_chemical_symbols()
sorted_indices = np.argsort(species)
sorted_atoms = atoms[sorted_indices]
```

### 例

以下のスクリプトは、カレントディレクトリ直下のGaussianインプットファイル（.gjf）をすべてまとめて.cifとPOSCARに変換するもの。

```python
import os
from ase.io import read, write
import glob
import numpy as np

def convert_gjf_to_cif_poscar():
    # 現在のディレクトリを取得
    input_dir = os.getcwd()

    # 1. 入力ファイル（*.gjf）をすべて読み込む
    gjf_files = glob.glob(os.path.join(input_dir, "*.gjf"))

    for gjf_file in gjf_files:
        # 2. 元のファイル名（拡張子なし）を取得
        base_name = os.path.splitext(os.path.basename(gjf_file))[0]

        # 3. 新しいディレクトリを作成
        output_dir = os.path.join(input_dir, base_name)
        os.makedirs(output_dir, exist_ok=True)

        # 4. Gaussianの入力ファイルを読み込む
        atoms = read(gjf_file)

        # 5. 原子を種別ごとにソート
        species = atoms.get_chemical_symbols()
        sorted_indices = np.argsort(species)
        sorted_atoms = atoms[sorted_indices]

        # 6. POSCAR（VASP用座標ファイル）として保存
        poscar_file = os.path.join(output_dir, "POSCAR")
        write(poscar_file, sorted_atoms)

        # 7. CIFファイルとして保存
        cif_file = os.path.join(output_dir, f"{base_name}.cif")
        write(cif_file, sorted_atoms)

        print(f"変換完了: {gjf_file} -> {output_dir}")

# 実行例（ディレクトリ指定なしで自動的に現在のディレクトリを使用）
convert_gjf_to_cif_poscar()
```

## POTCARは過不足なく

POTCARはPOSCARでリストアップしている元素に対して過不足なく用意する必要がある。 手動では面倒なので、`make_potcar.sh`のようにPOSCARに合わせてPOTCARをつくるスクリプトを用意すると良い。 以下はPOTCAR格納ディレクトリが”/home/xxxxx/xxxxxxx/pgm/vasp/vaspp/potpaw\_PBE”の場合。

```
#!/bin/bash

# VASP用PAW POTCARのディレクトリ
pawdir="/home/xxxxx/xxxxxxx/pgm/vasp/vaspp/potpaw_PBE"

# POSCARの存在チェック
if [ ! -f POSCAR ]; then
    echo "Error: POSCAR file not found!"
    exit 1
fi

# POSCARの6行目（元素リスト）を取得
elements=$(sed -n '6p' POSCAR)

# POTCARを作成
> POTCAR  # 空のPOTCARを作成
for element in $elements; do
    if [ -f "$pawdir/$element/POTCAR" ]; then
        cat "$pawdir/$element/POTCAR" >> POTCAR
    else
        echo "Warning: POTCAR for $element not found in $pawdir"
    fi
done

echo "POTCAR successfully created based on POSCAR."
```
