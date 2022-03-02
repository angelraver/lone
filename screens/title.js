function titleScreen () {
  sTitle.framing();
  drawStars(3);
  addElement(sTitle);
  addElement(sPressEnter());
  addElement(sCopyr());

  if (Enter) {
    Screen = 'levelStart';
    MarkTime = GlobalTime;
    SetNewGame = true;
  }
}

const sTitle = new SPRITE({
  x: GAME_MID_H - 150,
  y: GAME_HEIGHT / 4, 
  w: 300,
  h: 50,
  sheet: 'gamename.png',
  totalFrames: 3
});

const sPressEnter = () => {
  return new SPRITE({
    x: GAME_MID_H,
    y: GAME_MID_V,
    w: GAME_WIDTH,
    h: 25,
    text: 'P R E S S  E N T E R'
  });
}

const sCopyr = () => {
  return new SPRITE({
    x: GAME_MID_H,
    y: GAME_HEIGHT - (GAME_HEIGHT / 10),
    w: GAME_WIDTH,
    h: 15,
    text: 'r a v e r  g a m e s  2 0 1 9'
  });
}
