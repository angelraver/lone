function gameOverScreen () {
  CurrentLevel = 1;
  addElement(sGameOver());

  if (Enter) {
    Screen = 'title';
  }
}

const sGameOver = () => {
  return new SPRITE({
    x: GAME_MID_H,
    y: GAME_MID_V - 10,
    w: GAME_WIDTH,
    h: 20,
    text: 'G A M E  O V E R'
  });
}
