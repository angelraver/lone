function drawHero() {
  let MoveY = 0;
  Hero.r = 0;
  Hero.rY = 0;

  if(Acelerate) {
    MoveY = topLimit(Hero) ? 0 : - speed;
  }

  if(Break) {
    MoveY = bottomLimit(Hero) ? 0 : speed;
  }

  let MoveX = 0;
  if(KeyRight) {
    MoveX = rightLimit(Hero) ? 0 : speed;
  }

  if(KeyLeft) {
    MoveX = leftLimit(Hero) ? 0 : -speed;
  }

  if(Acelerate && KeyRight) {
    Hero.r = 5;
    Hero.rY = 15;
  }

  if(Acelerate && KeyLeft) {
    Hero.r = -5;
    Hero.rY = -15;
  }

  Hero.y = Hero.y + MoveY;
  Hero.x = Hero.x + MoveX;

  Hero.framing();

  if(Hero.hit) {
    if(Lives > 0) {
      Lives--;
      Explosions.push(EXPLOSION(Hero));
      playSound('explosion1');
    }
  } else {
    addElement(Hero);
  }
}

function drawShoots() {
  if(Shoot) {
    Shoots.push(new SPRITE({
      x: Hero.x + Hero.w / 3,
      y: Hero.y,
      h: BLOCK_UNITY,
      w: BLOCK_UNITY,
      sheet: 'shoot.png',
      totalFrames: 2
    }));
    playSound('shoot1');
    Shoot = false;
    ShootCount++;
  }
  if(DiscardShoot) {
    Shoots.shift();
    DiscardShoot = false;
  }
  Shoots.map(function(shoot, i) {
    if(shoot.hit) {
      Shoots.splice(i, 1);
    } else {
      shoot.y = shoot.y - SHOOT_SPEED;
      DiscardShoot = shoot.y < 0;
      shoot.framing();
      addElement(shoot);
    }
  });
}

function drawPlanet(speed) {
  Jupiter.y = Jupiter.y + speed;
  addElement('jupiter', Jupiter);
}
let lastEnemy;
let BOSS_KILLED = false;
let BOSS_EXPLOSIONS_LOADED = false;
let BOSS_EXPOSION_ONE = true;
function drawEnemys() {
  loadLevelEnemys();
  Enemys.map(function(enemy, i) {
    let pos = enemy.path[enemy.pathIndex];
    enemy.x = pos.x;
    enemy.y = pos.y;
    enemy.r = pos.r;
    if(enemy.hit) {
      enemy.hit = false;
      enemy.hits++;
      if(enemy.hits >= (enemy.hitsLimit / 2) && enemy.type === 'boss1') {
        enemy.totalFrames = Boss.totalFramesExtended;
      }
      if(enemy.hits === enemy.hitsLimit) {
        if (enemy.type === 'boss1') { // multiple explosions at the boss possition
          let explosions = getExplosions(enemy);
          explosions.forEach(function (explosion) {
            Explosions.push(EXPLOSION(explosion));
          });
          BOSS_KILLED = true;
        } else { // one explosion at the enemys possition
          Explosions.push(EXPLOSION({ ...enemy }));
        }
        playSound('explosion2');
        Enemys.splice(i, 1);
      }
    } else {
    // it goes out of screen?
    if(enemy.x + BLOCK_UNITY * 4 <= 0 || enemy.x >= GAME_WIDTH || enemy.y >= GAME_HEIGHT - BLOCK_UNITY) {
      enemy.looping();
    }
    // it appears again?
    if(enemy.canLoop()) {
      enemy.framing();
      addElement(enemy);
    } else {
      Enemys.splice(i, 1);
    }
    
    if(enemy.type === 'boss1') {
      if(enemy.x % 14 === 0) {
        EnemyShoots.push(new ENEMYSHOOT(Hero, enemy));
      }
    }
  }
    enemy.pathIndex = enemy.pathIndex + 1 < enemy.path.length ? enemy.pathIndex + 1 : 0;
    lastEnemy = enemy;
  });
}

const getExplosions = (enemy) => {
  const explosions = [];
  const limit = 10;
  let boom = { ...enemy, w: BLOCK_UNITY * 4, h: BLOCK_UNITY * 4 };
  let bossExplosionsPositions = BOSS_EXPOSION_ONE ? bossExplosions : bossExplosions2;
  BOSS_EXPOSION_ONE = !BOSS_EXPOSION_ONE;
  bossExplosionsPositions.map((e) => {
    explosions.push({ ...boom, x: boom.x + (BLOCK_UNITY * e.x), y: boom.y + (BLOCK_UNITY * e.y) })
  });
  return explosions;
}

function loadLevelEnemys() {  
  Level.enemys.map(function(enemy) {
    if(enemy.spawnAt === GlobalTime && !enemy.spawned) {
      if(enemy.type === 'boss1') {
        Boss = enemy;
      } 
      Enemys.push(new ENEMY(enemy));
      enemy.spawned = true;
      EnemyCount++;
    }
  });
}

function drawEnemyShoots() {
  EnemyShoots.map(function(enemyShoot, i){
    let pos = enemyShoot.path[enemyShoot.pathIndex];
    enemyShoot.x = pos.x;
    enemyShoot.y = pos.y;
    enemyShoot.framing();
    addElement(enemyShoot);
    enemyShoot.pathIndex = enemyShoot.pathIndex + 1;
    if(enemyShoot.pathIndex === enemyShoot.path.length || enemyShoot.hit) {
      EnemyShoots.splice(i, 1);
    }
  });
}

function drawExplosions() {
  if (BOSS_KILLED) {
    addElement(lastEnemy);
    lastEnemy.framing();
    if (GlobalTime % 1 === 0.5 || GlobalTime % 1 === 0) {
      if (!BOSS_EXPLOSIONS_LOADED) {
        getExplosions(lastEnemy).forEach(function (explosion) {
          Explosions.push(EXPLOSION(explosion));
        });
        BOSS_EXPLOSIONS_LOADED = true;
      }
    }
  }
  Explosions.map(function (explosion, i){
    if(explosion.canLoop()) {
      if(explosion.currentFrame === explosion.totalFrames - 1) {
        explosion.looping();
      }
      explosion.framing();
      addElement(explosion);
    } else {
      Explosions.splice(i, 1);
    }
  });
  if (Explosions.length === 0) {
    BOSS_EXPLOSIONS_LOADED = false;
  }
}

const bossExplosions = [
  { x: 0, y: 0 }, { x:4, y: 0}, { x:8, y: 0 },
  { x: -2, y: 2 }, { x:2, y: 2 }, { x: 6, y: 2 }, { x: 10, y: 2 },
  { x: 0, y: 4 }, { x: 4, y: 4  }, { x: 8, y: 4 }
];
const bossExplosions2 = [
  { x: -2, y: 0 }, { x:2, y: 0 }, { x: 6, y: 0 }, { x: 10, y: 0 }, 
  { x: 0, y: 2 }, { x: 4, y: 2  }, { x: 8, y: 2 },
  { x: -2, y: 4 }, { x:2, y: 4 }, { x: 6, y: 4 }, { x: 10, y: 4 }
]