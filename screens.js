function titleScreen () {
  sTitle.framing();
  addElement('gameName', sTitle);
  addElement('pressEnter', sPressEnter);
  addElement('copyr', sCopyr);
  drawStars(2);
}

function levelStartScreen () {
  if(SetNewGame) {
    Enemys = [];
    Lives = 1;
    GameOver =  false;
    Level = LevelConfig[CurrentLevel];
    SetNewGame = false;
    KillCount = 0;
    Hero = HERO();
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
  addElement('gameover', sGameOver);
}
