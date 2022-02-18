function actionScreen () {
  checkColisions();
  drawActionScreenTexts();
  drawStars(5);
  // drawPlanet(.5);
  drawEnemyShoots();
  drawEnemys();
  drawExplosions();

  if(!GameOver) {
    drawShoots();
    drawHero();
  }  

  if(Lives === 0 && MarkTime === 0) {
    GameOver = true;
    MarkTime = GlobalTime;
  }

  if(GlobalTime - MarkTime === 5 && MarkTime > 0) {
    Screen = 'gameOver';
    MarkTime = 0;
  }

  if(GlobalTime > Level.time && Enemys.length === 0) {
    Screen = 'levelCompleted';
  }
}

function drawActionScreenTexts() {
  addElement(sKillCountAction());
  addElement(sLevelAction());
  addElement(sLivesAction());
}

const sKillCountAction = () => {
  return new SPRITE({
    x: BLOCK_UNITY * 8,
    y: BLOCK_UNITY * 3,
    w: 100,
    h: 20,
    z: 100,
    text: `K I L L S  ${KillCount}`
  });
};

const sLevelAction = () => {
  return new SPRITE({
    x: GAME_MID_H,
    y: BLOCK_UNITY * 3,
    w: 100,
    h: 20,
    z: 100,
    text: 'L E V E L  ' + CurrentLevel
  });
};

const sLivesAction = () => {
  return new SPRITE({
    x: GAME_WIDTH - BLOCK_UNITY * 8,
    y: BLOCK_UNITY * 3,
    w: 100,
    h: 20,
    z: 100,
    text: 'L I V E S ' + Lives
  });
};