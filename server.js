const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

// 🔥 50+ 게임 데이터 (팁 + 스크립트 링크)
const games = {
  valorant: { name: 'Valorant', tips: ['ESP 우회', 'Aimbot 스크립트', 'Vanguard 바이패스'], script: '/script/valorant_full_cheat.js' },
  cs2: { name: 'Counter-Strike 2', tips: ['Wallhack CFG', 'Triggerbot', 'Skin Changer'], script: '/script/cs2_aimbot.py' },
  lol: { name: 'League of Legends', tips: ['맵핵', '스킨 해시', '자동 라스트히트'], script: '/script/lol_cheat.ahk' },
  apex: { name: 'Apex Legends', tips: ['ESP', 'No Recoil', 'Speedhack'], script: '/script/apex_esp.js' },
  pubg: { name: 'PUBG', tips: ['Aimbot', 'No Recoil', 'Radar'], script: '/script/pubg_aimbot.py' },
  fortnite: { name: 'Fortnite', tips: ['Building Hack', 'Aimbot', 'ESP'], script: '/script/fortnite_aim.py' },
  lostark: { name: 'Lost Ark', tips: ['던전 자동', '아이템 복제', '스탯 해킹'], script: '/script/lostark_auto.py' },
  maplestory: { name: 'MapleStory', tips: ['자동 사냥', '몹 핵', '캐시 아이템'], script: '/script/maple_auto.ahk' },
  dfonline: { name: 'Dungeon Fighter Online', tips: ['던전 자동', '피로회복'], script: '/script/dfo_auto.py' },
  fconline: { name: 'FC Online', tips: ['자동 패스', '스탯 업'], script: '/script/fc_auto.ahk' },
  suddenattack: { name: 'Sudden Attack', tips: ['에임', '월핵'], script: '/script/sa_aim.py' },
  roblox: { name: 'Roblox', tips: ['Lua Executor', 'Speed Hack'], script: '/script/roblox_lua.txt' },
  minecraft: { name: 'Minecraft', tips: ['X-Ray', 'Fly Hack'], script: '/script/mc_mod.zip' },
  genshin: { name: 'Genshin Impact', tips: ['자동 사냥', '원석 무한'], script: '/script/genshin_auto.py' },
  // ... 30+ 더 추가 (아래처럼 복사)
  monsterhunterwilds: { name: 'Monster Hunter Wilds', tips: ['무한 체력', '아이템 드롭'], script: null },
  hades2: { name: 'Hades 2', tips: ['God Mode', '무한 골드'], script: null },
  doomdarkages: { name: 'Doom: The Dark Ages', tips: ['God Mode', '무한 탄환'], script: null },
  metalgearsoliddelta: { name: 'Metal Gear Solid Delta', tips: ['무한 탄환', 'ESP'], script: null },
  // 전체 50+ (공간 절약 위해 축약, 실제론 풀 리스트)
};

app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

// 게임 페이지
app.get('/game/:id', (req, res) => {
  const id = req.params.id.toLowerCase().replace(/-/g, '');
  const game = games[id] || { name: 'Unknown Game', tips: [], script: null };
  res.render('game', { game, allGames: Object.values(games) });
});

// 스크립트 다운로드 (예시 10개, scripts/ 폴더에 저장)
app.get('/script/:file', (req, res) => {
  const fileMap = {
    'valorant_full_cheat.js': 'valorant_full_cheat.js',
    'lol_cheat.ahk': 'lol_cheat.ahk',
    'pubg_aimbot.py': 'pubg_aimbot.py',
    // ... 더 추가
  };
  const filename = fileMap[req.params.file] || req.params.file;
  const filePath = path.join(__dirname, 'scripts', filename);
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).send('Script not found');
  }
});

app.listen(port, () => console.log(`🚀 http://localhost:${port}`));
