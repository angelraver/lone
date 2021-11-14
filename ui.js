var sGetReady = new SPRITE({
  x: 0,
  y: GAME_HEIGHT / 2 -50,
  w: GAME_WIDTH,
  h: 25,
  z: 30,
  text: 'GET READY!',
  cssClass: 'text'
});

var sTitle = new SPRITE({
  x: (GAME_WIDTH / 2) - 150,
  y: GAME_HEIGHT / 4, 
  w: 300,
  h: 50,
  z: 11,
  sheet: 'gamename.png',
  totalFrames: 3
});

const sLevelN = () => {
  return new SPRITE({
    x: 0,
    y: GAME_HEIGHT / 2 - 150,
    w: GAME_WIDTH,
    h: 25,
    text: 'LEVEL ' + CurrentLevel,
    cssClass: 'text'
  });
}

const sCompleted = new SPRITE({
  x: 0,
  y: GAME_HEIGHT / 2 - 125,
  w: GAME_WIDTH,
  h: 25,
  text: 'COMPLETED',
  cssClass: 'text'
});

const sKillsAction = new SPRITE({
  x: (GAME_WIDTH / 2) - 50,
  y: BLOCK_UNITY,
  w: 100,
  h: 20,
  z: 100,
  text: 'KILLS',
  cssClass: 'text'
});

const sKillCountAction = () => {
  return new SPRITE({
    x: (GAME_WIDTH / 2) - 50,
    y: BLOCK_UNITY * 3,
    w: 100,
    h: 20,
    z: 100,
    text: KillCount,
    cssClass: 'text'
  });
};

const sLevelAction = () => {
  return new SPRITE({
    x: (GAME_WIDTH / 10) - 50,
    y: BLOCK_UNITY,
    w: 100,
    h: 20,
    z: 100,
    text: 'LEVEL ' + CurrentLevel,
    cssClass: 'text'
  });
};

const sPressEnter = new SPRITE({
  x: 0,
  y: GAME_HEIGHT / 2,
  w: GAME_WIDTH,
  h: 25,
  z: 30,
  text: 'PRESS ENTER',
  cssClass: 'text'
});

var sGameOver = new SPRITE({
  x: 0,
  y: GAME_HEIGHT / 2 - 10,
  w: GAME_WIDTH,
  h: 20,
  z: 30,
  text: 'GAME OVER',
  cssClass: 'text'
});

const sAccuracy = () => {
  const accuracy = ShootCount > 0 ? (100 / ShootCount) * KillCount : 0;
  return new SPRITE({
    x: 0,
    y: GAME_HEIGHT / 2 -25,
    w: GAME_WIDTH,
    h: 25,
    text: 'ACCURACY: ' + accuracy.toFixed(2),
    cssClass: 'text'
  });
}

const sCopyr = new SPRITE({
  x: 0,
  y: GAME_HEIGHT - (GAME_HEIGHT / 10),
  w: GAME_WIDTH,
  h: 15,
  z: 30,
  text: 'raver games 2019',
  cssClass: 'text'
});

const sLivesAction = () => {
  return new SPRITE({
    x: GAME_WIDTH - 110,
    y: BLOCK_UNITY,
    w: 100,
    h: 20,
    z: 100,
    text: 'LIVES ' + Lives,
    cssClass: 'text'
  });
};

const sKilled = () => {
  return new SPRITE({
    x: 0,
    y: GAME_HEIGHT / 2 -50,
    w: GAME_WIDTH,
    h: 25,
    text: 'ENEMYS KILLED: ' + KillCount,
    cssClass: 'text'
  })
}

