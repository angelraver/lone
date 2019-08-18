const BLOCK_UNITY = 10;
const MINI_BLOCK_UNITY = 1;
const GRAVITY = 5;
const SPEED_BACKGROUND_1 = 3;
const SHOOT_SPEED = 20;
const ENEMY_SHOOT_SPEED = 10;
const GAME_SPEED = 45;
const GAME_WIDTH = 500;
const GAME_HEIGHT = 700;
const JUMP_HEIGHT = BLOCK_UNITY * 3;
const ENEMY_SPEED = 6;
const ENEMY_SIZE = BLOCK_UNITY * 4;
const SPRITES_FOLDER = './sprites/';
const SOUND_FOLDER = './sounds/';

function addElement(id, sprite) { 
  var el = document.createElement("div"); 
  el.setAttribute('id', id);
  el.style.top = sprite.y + 'px';
  el.style.left = sprite.x + 'px';
  el.style.width = sprite.w + 'px';
  el.style.height = sprite.h + 'px';
  el.style.zIndex = sprite.z;
  el.setAttribute("class", sprite.cssClass);

  if(sprite.sheet) {
    el.style.background = 'url("' + sprite.sheet + '") 0 ' + sprite.sheetY + 'px';
  }

  if(sprite.text) {
    el.setAttribute('class', sprite.cssClass);
    el.style.fontSize = sprite.h + 'px';
    el.appendChild(document.createTextNode(sprite.text));
  }

  if(sprite.r) {
    el.style.transform = 'rotate(' + sprite.r + 'deg) ';
    if(sprite.rY) {
      el.style.transform = 'rotate(' + sprite.r + 'deg) rotateY(' + sprite.rY + 'deg)';
    }
  }

  gameFrame.appendChild(el);
  GlobalIds.push(id);
}

function checkColisions() {
  Enemys.map(function(enemy, i){
    Shoots.map(function(shoot, ii){
      if(colision(enemy, shoot)){
        KillCount++;
        enemy.hit = true;
        shoot.hit = true;
      }
    });

    if(colision(enemy, Hero) && !Hero.hit){
      Hero.hit = true;
      enemy.hit = true;
    }
  });

  EnemyShoots.map(function(enemyShoot) {
    if(colision(enemyShoot, Hero) && !Hero.hit) {
      Hero.hit = true;
      enemyShoot.hit = true;
    }
  });
}

const playSound = function(soundFile) {
  var audio = new Audio(SOUND_FOLDER + soundFile);
  audio.play();
  audio = null;
}

const random = function (limit) {
  return Math.floor(Math.random() * limit);
}

const colision = (a, b) => {
  return a.x + a.w > b.x &&
    a.y + a.h > b.y &&
    a.x < b.x + b.w &&
    a.y < b.y + b.h;
}

const topLimit = (shape) => shape.y < BLOCK_UNITY;
const rightLimit = (shape) => shape.x + shape.w + BLOCK_UNITY >= GAME_WIDTH;
const bottomLimit = (shape) => shape.y + shape.h >= GAME_HEIGHT - BLOCK_UNITY;
const leftLimit = (shape) => shape.x - BLOCK_UNITY <= 0;

var starLinesBegin = [
  {
    blocks: " 1            5                3      4 ",
    y: 570
  },
  {
    blocks: "                      4   6             ",
    y: 470
  },
  {
    blocks: "   66      6  1  2     2 6  6           ",
    y: 370
  },
  {
    blocks: "  4      5    32                       7",
    y: 270
  },
  {
    blocks: "                       8        6       ",
    y: 170
  },
  {
    blocks: "               861          6           ",
    y: 70
  }
];
