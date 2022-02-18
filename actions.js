function addElement(sprite) {
  const isText = sprite.text && !sprite.image;
  if (isText) {
    ctx.font = "28px ArcadeClassic";
    ctx.fillText(sprite.text, sprite.x, sprite.y);
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
  } else {
    ctx.drawImage(sprite.image, 0, sprite.sheetY, sprite.w, sprite.h, sprite.x, sprite.y, sprite.w, sprite.h);
  }
// ctx.fillStyle = "#FF00FF";
// ctx.fill();
// ctx.fillRect(5,5,3,3);
}

function clearGameFrame() {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
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

const playSound = function(sound) {
  let audio = new Audio(SOUND_FOLDER + SOUND[sound]);
  // audio.play();
  audio = null;
}
