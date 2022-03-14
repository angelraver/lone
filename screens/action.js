function actionScreen () {  
  drawActionScreenTexts();
  drawStars(5);
  // drawPlanet(.5);

  if(!HideEnemys) {
    checkColisions();
    drawEnemys();
    drawExplosions();
    drawEnemyShoots();
  }

  if(!GameOver) {
    drawShoots();
    drawHero();
  }

  // set game over
  if(Lives === 0 && !GameOver) {
    GameOver = true;
    MarkTime = GlobalTime;
  }
  if(GameOver && GlobalTime - MarkTime === TIME_AFTER_HERO_DEATH) {
    Screen = 'gameOver';
    MarkTime = 0;
  }

  // set level complete
  if(Enemys.length === 0 && BossKilled && !LevelComplete) {
    LevelComplete = true;
    MarkTime = GlobalTime;
  }
  if(GlobalTime - MarkTime === TIME_BOSS_EXPLOSION && LevelComplete) {
    HideEnemys = true;
  }
  if(GlobalTime - MarkTime === TIME_AFTER_BOSS_DEATH && MarkTime > 0 && LevelComplete) {
    Screen = 'levelCompleted';
    MarkTime = 0;
    LevelComplete = false;
    HideEnemys = false;
    BossKilled = false;
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
    text: `K I L L S  ${KillCount}`
  });
};

const sLevelAction = () => {
  return new SPRITE({
    x: GAME_MID_H,
    y: BLOCK_UNITY * 3,
    w: 100,
    h: 20,
    text: 'L E V E L  ' + CurrentLevel
  });
};

const sLivesAction = () => {
  return new SPRITE({
    x: GAME_WIDTH - BLOCK_UNITY * 8,
    y: BLOCK_UNITY * 3,
    w: 100,
    h: 20,
    text: 'L I V E S ' + Lives
  });
};