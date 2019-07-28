var levelEnemys = LevelEnemys();

var Title = new SPRITE({
  x: (GAME_WIDTH / 2) - 150,
  y: GAME_HEIGHT / 4, 
  w: 300,
  h: 50,
  sheet: 'gamename.png',
  totalFrames: 3
});

var Hero = new SPRITE({
  x: GAME_WIDTH / 2 - BLOCK_UNITY / 2,
  y: GAME_HEIGHT - GAME_HEIGHT / 5,
  h: BLOCK_UNITY * 4,
  w: BLOCK_UNITY * 4,
  sheet: 'shipHero.png',
  totalFrames: 6,
});

const EXPLOSION = (origin) => {
  return new SPRITE({
    x: origin.x,
    y: origin.y,
    w: origin.w,
    h: origin.h,
    sheet: 'explosion1.png',
    totalFrames: 5,
    loops: 1
  })
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
