function drawHero() {
  let MoveY = 0;
  Hero.rotate = 0;
  Hero.rotateY = 0;

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
    Hero.rotate = 5;
    Hero.rotateY = 15;
  }

  if(Acelerate && KeyLeft) {
    Hero.rotate = -5;
    Hero.rotateY = -15;
  }

  Hero.y = Hero.y + MoveY;
  Hero.x = Hero.x + MoveX;

  Hero.framing();

  if(Hero.hit) {
    if(Lives > 0) {
      Hero.hit = false;
      Lives--;
      Explosions.push(EXPLOSION(Hero));
      playSound('explosion1.mp3');
      Hero.x = -Hero.w;
      Hero.y = -Hero.h;
    }
  } else {
    addElement('Hero', Hero);
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
    playSound('shoot1.mp3');
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
      addElement('shoot' + i, shoot);
    }
  });
}

function drawStars(speed) {
  if(AddStarLine) {
    StarLines.push(new STAR_LINE());
  }
  if(StarLines.length === 8){
    StarLines.shift();
  }
  StarLines.map(function(starLine) {
    starLine.y = starLine.y + speed;
    AddStarLine = GAME_HEIGHT / 6 - starLine.y < 3;
    DiscardStarLine = starLine.y > GAME_HEIGHT;
    starLine.blocks.split('').map(function (block, i) {
      let star = new SPRITE({
        x: i * BLOCK_UNITY,
        y: starLine.y - (parseInt(block) * 10),
        h: 3,
        w: 3,
        sheet: 'star.png',
        totalFrames: 1
      });
      if(block !== ' ') {
        addElement('backgoundStar' + i, star);
      }
    });
  });
}

function drawEnemys() {
  levelEnemys.map(function(enemy) {
    if(enemy.spawnAt === GlobalTime && !enemy.spawned) {
      Enemys.push(new ENEMY(enemy.type, enemy.x, enemy.y, enemy.spawnAt, enemy.shootAt, enemy.loops));
      enemy.spawned = true;
      EnemyCount++;
    }
  });
  
  Enemys.map(function(enemy, i) {
    let pos = enemy.path[enemy.pathIndex];
    enemy.x = pos.x;
    enemy.y = pos.y;
    if(enemy.hit) {
      Explosions.push(EXPLOSION(enemy));
      playSound('explosion2.mp3');
      Enemys.splice(i, 1);
    } else {

      if(enemy.x + BLOCK_UNITY * 4 <= 0 || enemy.x >= GAME_WIDTH || enemy.y >= GAME_HEIGHT - BLOCK_UNITY) {
        enemy.looping();
      }

      if(enemy.canLoop()) {
        enemy.framing();
        addElement('enemy' + i, enemy);
      } else {
        Enemys.splice(i, 1);
      }

      if(enemy.spawnedAt + enemy.shootAt === GlobalTime && !enemy.shooted && !Hero.hit) {
        enemy.shooted = true;
        EnemyShoots.push(new ENEMYSHOOT(Hero, enemy)); 
        playSound('shoot2.mp3');
      }
    }
    enemy.pathIndex = enemy.pathIndex + 1 < enemy.path.length ? enemy.pathIndex + 1 : 0;
  });
}

function drawEnemyShoots() {
  EnemyShoots.map(function(enemyShoot, i){
    let pos = enemyShoot.path[enemyShoot.pathIndex];
    enemyShoot.x = pos.x;
    enemyShoot.y = pos.y;
    enemyShoot.framing();
    addElement('enemyshoot' + i, enemyShoot);
    enemyShoot.pathIndex = enemyShoot.pathIndex + 1;
    if(enemyShoot.pathIndex === enemyShoot.path.length || enemyShoot.hit) {
      EnemyShoots.splice(i, 1);
    }
  });
}

function drawGameTexts() {
  addElement('Kills',
    new SPRITE({
      x: (GAME_WIDTH / 2) - 50,
      y: BLOCK_UNITY,
      w: 100,
      h: 20,
      text: 'KILLS',
      cssClass: 'text'
    })
  );
  addElement('KillCount', 
    new SPRITE({
      x: (GAME_WIDTH / 2) - 50,
      y: BLOCK_UNITY * 3,
      w: 100,
      h: 20,
      text: KillCount,
      cssClass: 'text'
    })
  );
  addElement('Level', 
    new SPRITE({
      x: (GAME_WIDTH / 10) - 50,
      y: BLOCK_UNITY,
      w: 100,
      h: 20,
      text: 'Level ' + CurrentLevel,
      cssClass: 'text'
    })
  );
  addElement('Lives', 
    new SPRITE({
      x: GAME_WIDTH - 110,
      y: BLOCK_UNITY,
      w: 100,
      h: 20,
      text: 'Lives ' + Lives,
      cssClass: 'text'
    })
  );
}

function drawExplosions() {
  Explosions.map(function (explosion, i){
    if(explosion.canLoop()) {
      if(explosion.currentFrame === explosion.totalFrames - 1) {
        explosion.looping();
      }
      explosion.framing();
      addElement('enemy' + i, explosion);
    } else {
      Explosions.splice(i, 1);
    }
  });
}
