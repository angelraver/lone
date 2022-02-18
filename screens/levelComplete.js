function levelCompletedScreen () {
  addElement(sLevelNumnber());
  addElement(sCompleted());
  addElement(sKilled());
  addElement(sAccuracy());
  if(Enter) {
    CurrentLevel++;
    Screen = 'levelStart';
    MarkTime = GlobalTime;
    SetNewGame = true;
  }
}

const sLevelNumnber = () => {
  return new SPRITE({
    x: GAME_MID_H,
    y: GAME_MID_V - 170,
    w: GAME_WIDTH,
    h: 25,
    text: 'L E V E L  ' + CurrentLevel
  });
}

const sCompleted = () => {
  return new SPRITE({
    x: GAME_MID_H,
    y: GAME_MID_V - 145,
    w: GAME_WIDTH,
    h: 25,
    text: 'C O M P L E T E D',
  });
}

const sKilled = () => {
  return new SPRITE({
    x: GAME_MID_H,
    y: GAME_MID_V -70,
    w: GAME_WIDTH,
    h: 25,
    text: 'K I L L S :  ' + KillCount,
  })
}

const sAccuracy = () => {
  const accuracy = ShootCount > 0 ? (100 / ShootCount) * KillCount : 0;
  return new SPRITE({
    x: GAME_MID_H,
    y: GAME_MID_V - 45,
    w: GAME_WIDTH,
    h: 25,
    text: 'A C C U R A C Y : ' + accuracy.toFixed(2) + '%',
  });
}
