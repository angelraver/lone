function titleScreen () {
  // addElement('boos1', sSpider);
  sTitle.framing();
  addElement('gameName', sTitle);
  addElement('pressEnter', sPressEnter);
  addElement('copyr', sCopyr);
  drawStars(2);
}

function levelStartScreen () {
  if(SetNewGame) {
    GlobalIds = [];
    ShootCount = 0;
    Shoots = [];
    EnemyCount = 0;
    Enemys = [];
    EnemyShoots = [];
    Explosions = [];
    Lives = 1;
    GameOver =  false;
    Level = LevelConfig(CurrentLevel);
    SetNewGame = false;
    KillCount = 0;
    Hero = new SPRITE({
      x: GAME_WIDTH / 2 - BLOCK_UNITY / 2,
      y: GAME_HEIGHT - GAME_HEIGHT / 5,
      h: BLOCK_UNITY * 4,
      w: BLOCK_UNITY * 4,
      z: 20,
      sheet: 'shipHero.png',
      totalFrames: 6,
    });
  }
  addElement('level', sLevelN());
  addElement('getready', sGetReady);
  drawStars(5);

  if(GlobalTime - MarkTime === 3) {
    Screen = 'action';
    MarkTime = 0;
    GlobalTime = 0;
  }
}

function actionScreen () {
  checkColisions();
  drawActoinScreenTexts();
  drawStars(5);
  drawPlanet(.5);
  drawEnemyShoots();
  drawEnemys();
  drawExplosions();
  drawPlanet(1);

  if(!GameOver) {
    drawShoots();
    drawHero();
  }

  if(Lives === 0 && MarkTime === 0) {
    console.log('GAME OVER!')
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

function levelCompletedScreen () {
  drawLevelCompletedText();
}

function gameOverScreen () {
  CurrentLevel = 1;
  addElement('gameover', sGameOver);
}
