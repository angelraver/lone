
var Jupiter = () => {
  return new SPRITE({
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

const STAR_LINE = function() {
  let blocks = '';
  for(let i = 0; i < GAME_WIDTH / BLOCK_UNITY; i++) {
    let block = random(10) === 1 ? random(8) + 1 : ' ';
    blocks = blocks +  block;
  }
  this.blocks = blocks;
  this.y = 0;
}
