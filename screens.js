function titleScreen () {
  Title.framing();

  addElement('gamename', Title);

  addElement('pressEnter', 
    new SPRITE({
      x: 0,
      y: GAME_HEIGHT / 2,
      w: GAME_WIDTH,
      h: 25,
      z: 30,
      text: 'PRESS ENTER',
      cssClass: 'text'
    })
  );

  addElement('pressEnter', 
    new SPRITE({
      x: 0,
      y: GAME_HEIGHT - (GAME_HEIGHT / 10),
      w: GAME_WIDTH,
      h: 15,
      z: 30,
      text: 'raver games 2019',
      cssClass: 'text'
    })
  );

  drawStars(2);
}

function levelStartScreen () {
  if(SetNewGame) {
    Enemys = [];
    Lives = 1;
    GameOver =  false;
    levelEnemys = LevelEnemys(CurrentLevel);
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

    Jupiter = new SPRITE({
      x: GAME_WIDTH / 3,
      y: -GAME_HEIGHT,
      w: GAME_WIDTH,
      h: GAME_HEIGHT,
      z: 10,
      sheet: 'jupiter.png',
      totalFrames: 1,
      cssClass: 'planet'
    });
  }

  addElement('level', 
    new SPRITE({
      x: 0,
      y: GAME_HEIGHT / 2 - 100,
      w: GAME_WIDTH,
      h: 25,
      z: 30,
      text: 'LEVEL ' + CurrentLevel,
      cssClass: 'text'
    })
  );

  addElement('getready',
    new SPRITE({
      x: 0,
      y: GAME_HEIGHT / 2 -50,
      w: GAME_WIDTH,
      h: 25,
      z: 30,
      text: 'GET READY!',
      cssClass: 'text'
    })
  );

  drawStars(5);

  if(GlobalTime - MarkTime === 3) {
    Screen = 'action';
    MarkTime = 0;
    GlobalTime = 0;
  }

}

function actionScreen () {
  checkColisions();
  drawGameTexts();
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

    if(GlobalTime > 80 && Enemys.length === 0) {
      Screen = 'levelComplete';
    }

}

function levelCompleteScreen () {
  addElement('level', 
    new SPRITE({
      x: 0,
      y: GAME_HEIGHT / 2 - 150,
      w: GAME_WIDTH,
      h: 25,
      text: 'LEVEL ' + CurrentLevel,
      cssClass: 'text'
    })
  );

  addElement('complete', 
    new SPRITE({
      x: 0,
      y: GAME_HEIGHT / 2 - 125,
      w: GAME_WIDTH,
      h: 25,
      text: 'COMPLETED',
      cssClass: 'text'
    })
  );

  addElement('killed',
    new SPRITE({
      x: 0,
      y: GAME_HEIGHT / 2 -50,
      w: GAME_WIDTH,
      h: 25,
      text: 'ENEMYS KILLED:          ' + KillCount,
      cssClass: 'text'
    })
  );

  addElement('accuracy',
    new SPRITE({
      x: 0,
      y: GAME_HEIGHT / 2 -25,
      w: GAME_WIDTH,
      h: 25,
      text: 'SHOOTS:          ' + ShootCount,
      cssClass: 'text'
    })
  );

  addElement('killed',
    new SPRITE({
      x: 0,
      y: GAME_HEIGHT / 2,
      w: GAME_WIDTH,
      h: 25,
      text: 'ACCURACY: ' + ((100 / ShootCount) * KillCount).toFixed(2),
      cssClass: 'text'
    })
  );
  
  // if(GlobalTime - MarkTime === 3) {
  //   Screen = 'action';
  //   MarkTime = 0;
  //   GlobalTime = 0;
  // }

}

function gameOverScreen () {
  addElement('gameover', 
    new SPRITE({
      x: 0,
      y: GAME_HEIGHT / 2 - 10,
      w: GAME_WIDTH,
      h: 20,
      z: 30,
      text: 'GAME OVER',
      cssClass: 'text'
    })
  );
}
