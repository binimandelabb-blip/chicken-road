// Chicken Road game with bilingual UI and Telebirr donate shown in UI.
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;

let scoreEl = document.getElementById('score');
let restartBtn = document.getElementById('restart');
let donateLink = document.getElementById('donate-link');
let donateText = document.getElementById('donate-text');
let titleEl = document.getElementById('title');
let langSelect = document.getElementById('lang');

// Telebirr number provided by user
const TELEBIRR = '0927145171';

donateLink.href = '#';
donateLink.textContent = 'Telebirr: ' + TELEBIRR;

// i18n strings
const i18n = {
  am: {
    title: 'ዶሮ መባለያ',
    scoreLabel: 'ነጥብ',
    restart: 'ድገም',
    donateText: 'ደግ ይስጡ',
    instructions: 'አርማዎች: Arrow keys ወይስ WASD'
  },
  en: {
    title: 'Chicken Road',
    scoreLabel: 'Score',
    restart: 'Restart',
    donateText: 'Support / Donate',
    instructions: 'Controls: Arrow keys or WASD'
  }
};

let currentLang = 'am';
function setLanguage(lang){
  if(!i18n[lang]) return;
  currentLang = lang;
  titleEl.textContent = i18n[lang].title;
  restartBtn.textContent = i18n[lang].restart;
  donateText.textContent = i18n[lang].donateText + ‘:’;
  updateScore();
}

langSelect.addEventListener('change', e=> setLanguage(e.target.value));
setLanguage(currentLang);

// Player (chicken)
const player = { x: W/2 - 12, y: H - 60, w: 24, h: 28, speed: 3, color: '#fff176' };

const lanes = [
  { y: 120, speed: 2, dir: 1 },
  { y: 200, speed: 3, dir: -1 },
  { y: 280, speed: 2.5, dir: 1 },
  { y: 360, speed: 3.2, dir: -1 },
  { y: 440, speed: 2.2, dir: 1 }
];

let cars = [];
let keys = {};
let score = 0;

function spawnCars(){
  cars = [];
  for(let i=0;i<lanes.length;i++){
    const lane = lanes[i];
    const count = 3;
    for(let j=0;j<count;j++){
      const cw = 40 + Math.random()*30;
      const gap = 120 + Math.random()*180;
      const x = (j * gap) * (lane.dir === 1 ? -1 : 1) + (Math.random()*200);
      cars.push({ x: x + (lane.dir===1 ? -W : W), y: lane.y, w: cw, h: 22, speed: lane.speed + Math.random()*1.2, dir: lane.dir, color: '#f44336' });
    }
  }
}
spawnCars();

function resetPlayer(){ player.x = W/2 - player.w/2; player.y = H - 60; }

function update(){
  // move player
  if(keys['ArrowLeft'] || keys['a']) player.x -= player.speed;
  if(keys['ArrowRight'] || keys['d']) player.x += player.speed;
  if(keys['ArrowUp'] || keys['w']) player.y -= player.speed;
  if(keys['ArrowDown'] || keys['s']) player.y += player.speed;

  player.x = Math.max(10, Math.min(W - player.w - 10, player.x));
  player.y = Math.max(10, Math.min(H - player.h - 10, player.y));

  // move cars
  cars.forEach(c => {
    c.x += c.speed * c.dir;
    if(c.dir === 1 && c.x - c.w > W + 100) c.x = -200 - Math.random()*200;
    if(c.dir === -1 && c.x + c.w < -100) c.x = W + 200 + Math.random()*200;
  });

  // collision
  for(const c of cars){
    if(rectIntersect(player, c)){
      resetPlayer();
      score = Math.max(0, score - 1);
      updateScore();
      break;
    }
  }

  // reach top
  if(player.y <= 20){ score++; updateScore(); resetPlayer(); }
}

function rectIntersect(a,b){ return !(a.x + a.w < b.x || a.x > b.x + b.w || a.y + a.h < b.y || a.y > b.y + b.h); }

function draw(){
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle = '#7ec850'; ctx.fillRect(0,0,W,H);
  ctx.fillStyle = '#444'; const roadTop = 100, roadBottom = 500; ctx.fillRect(0, roadTop, W, roadBottom - roadTop);

  ctx.strokeStyle = '#f5f5f5'; ctx.lineWidth = 2;
  for(let i=0;i<lanes.length;i++){
    const y = lanes[i].y - 40;
    ctx.setLineDash([30,20]); ctx.beginPath(); ctx.moveTo(0, y+11); ctx.lineTo(W, y+11); ctx.stroke(); ctx.setLineDash([]);
  }

  cars.forEach(c => {
    ctx.fillStyle = c.color; ctx.fillRect(c.x, c.y - c.h/2, c.w, c.h);
    ctx.fillStyle = '#222'; ctx.fillRect(c.x + 6, c.y + c.h/2 - 4, 8, 4); ctx.fillRect(c.x + c.w - 14, c.y + c.h/2 - 4, 8, 4);
  });

  ctx.fillStyle = player.color; ctx.beginPath(); ctx.ellipse(player.x + player.w/2, player.y + player.h/2, player.w/2, player.h/2, 0, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#ff8f00'; ctx.beginPath(); ctx.moveTo(player.x + player.w, player.y + player.h/2 - 2); ctx.lineTo(player.x + player.w + 8, player.y + player.h/2); ctx.lineTo(player.x + player.w, player.y + player.h/2 + 4); ctx.fill();
}

function loop(){ update(); draw(); requestAnimationFrame(loop); }

function updateScore(){
  const label = (currentLang === 'am') ? i18n.am.scoreLabel : i18n.en.scoreLabel;
  scoreEl.textContent = label + ': ' + score;
}

document.addEventListener('keydown', e => { keys[e.key] = true; });
document.addEventListener('keyup', e => { keys[e.key] = false; });

restartBtn.addEventListener('click', () => { score = 0; updateScore(); resetPlayer(); spawnCars(); });

// start
resetPlayer(); updateScore(); loop();