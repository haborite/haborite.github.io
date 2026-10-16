export type Project = {
  name: string;
  description: string;
  /** Playable / usable page */
  url?: string;
  repo?: string;
  tags: string[];
  featured?: boolean;
};

export const PROJECT_GROUPS: { title: string; items: Project[] }[] = [
  {
    title: 'Web アプリ・ゲーム',
    items: [
      {
        name: '囲碁サッカー',
        description: 'サッカーボール型（切頂二十面体）の格子を碁盤にした、球面で打つ3D碁。MCTS の NPC 対戦とオンライン対戦。',
        url: 'https://football-go.haborite.com/',
        repo: 'https://github.com/haborite/football_go',
        tags: ['TypeScript', 'Three.js', 'MCTS'],
        featured: true,
      },
      {
        name: '盾麻雀',
        description: '立直麻雀に防御用の「盾牌」を加えた4人対戦 Web 麻雀。',
        url: 'https://dunpai-mahjong.haborite.com/',
        repo: 'https://github.com/haborite/Dunpai-mahjong',
        tags: ['Game', 'WebSocket'],
        featured: true,
      },
      {
        name: 'Shall We Bunt?',
        description: 'マルコフ過程モデルで、ヒッティングとバントの得点期待値・得点確率を状況別に比較する野球戦術分析ツール。',
        url: 'https://haborite.github.io/shall-we-bunt/',
        repo: 'https://github.com/haborite/shall-we-bunt',
        tags: ['Baseball', 'Statistics'],
        featured: true,
      },
      {
        name: 'ハノイの塔',
        description: '2018年10月から64枚の円盤を移し続けている「世界の終わり」までのカウントダウン。',
        url: '/hanoi/',
        tags: ['Canvas'],
      },
    ],
  },
  {
    title: 'ツール',
    items: [
      {
        name: 'ku1255-firmware-modifier',
        description: 'ThinkPad 有線トラックポイントキーボード（KU-1255）のファームウェアを書き換えてキー配置をカスタマイズする GUI ツール。',
        repo: 'https://github.com/haborite/ku1255-firmware-modifier',
        tags: ['Keyboard', 'Firmware'],
        featured: true,
      },
      {
        name: 'celum',
        description: '物理次元と単位を第一級でサポートする、科学計算用 CSV エディタ。',
        repo: 'https://github.com/haborite/celum',
        tags: ['Science', 'Units'],
      },
      {
        name: 'flashsn8-gui',
        description: 'SN8 マイコン書き込みツール flashsn8 の簡易 GUI。',
        repo: 'https://github.com/haborite/flashsn8-gui',
        tags: ['Hardware'],
      },
      {
        name: 'ComfyUI-NoiseTools',
        description: 'ComfyUI でノイズを扱うためのカスタムノード。',
        repo: 'https://github.com/haborite/ComfyUI-NoiseTools',
        tags: ['ComfyUI'],
      },
      {
        name: 'bptracker-to-healthplanet',
        description: '血圧記録アプリのエクスポートデータを Health Planet へ自動転記するスクリプト。',
        repo: 'https://github.com/haborite/bptracker-to-healthplanet',
        tags: ['Automation'],
      },
      {
        name: 'irrp.py',
        description: '長い赤外線コードを圧縮できるように改造した irrp.py（学習リモコン用）。',
        repo: 'https://github.com/haborite/irrp.py',
        tags: ['Raspberry Pi'],
      },
      {
        name: 'emoji_ski',
        description: 'Fediverse の各サーバーでよく使われる絵文字リアクションの集計表。',
        repo: 'https://github.com/haborite/emoji_ski',
        tags: ['Fediverse'],
      },
    ],
  },
];
