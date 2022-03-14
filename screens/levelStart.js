function levelStartScreen () {
  if (SetNewGame) {
    ShootCount = 0;
    Shoots = [];
    EnemyCount = 0;
    Enemys = [];
    EnemyShoots = [];
    Explosions = [];
    GameOver =  false;
    Level = GetLevelConfig(CurrentLevel);
    SetNewGame = false;
    KillCount = 0;
    Hero = new SPRITE({
      x: GAME_MID_H - BLOCK_UNITY / 2,
      y: GAME_HEIGHT - GAME_HEIGHT / 5,
      h: BLOCK_UNITY * 4,
      w: BLOCK_UNITY * 4,
      sheet: 'shipHero.png',
      totalFrames: 6,
    });
  }
  addElement(sLevelN());
  addElement(sGetReady());

  if(GlobalTime - MarkTime === 3) {
    Screen = 'action';
    MarkTime = 0;
    GlobalTime = 0;
  }
}

var sGetReady = () => {
  return new SPRITE({
    x: GAME_MID_H,
    y: GAME_MID_V - 50,
    w: GAME_WIDTH,
    h: 25,
    text: 'G E T  R E A D Y !'
  });
}

const sLevelN = () => {
  return new SPRITE({
    x: GAME_MID_H,
    y: GAME_MID_V - 150,
    w: GAME_WIDTH,
    h: 25,
    text: 'L E V E L  ' + CurrentLevel
  });
}