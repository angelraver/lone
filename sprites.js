const SPRITE = function (props) {
  this.h = props.h;
  this.w = props.w;
  this.y = props.y;
  this.x = props.x;
  this.hit = false;
  this.sheet = props.sheet ? SPRITES_FOLDER + props.sheet : null;
  this.totalFrames = props.totalFrames;
  this.currentFrame = 0;
  this.sheetY = 0;
  this.framing = function() {
    this.sheetY = this.currentFrame * this.h;
    if(this.currentFrame < this.totalFrames - 1) {
      this.currentFrame++;
    } else {
      this.currentFrame = 0;
    }
  };
  this.path = props.path;
  this.pathIndex = 0;
  this.hit = false;
  this.loops = props.loops;
  this.currentLoop = 0;
  this.canLoop = () =>  this.currentLoop < this.loops;
  this.looping = function () {
    this.currentLoop++;
  }
  this.spawnedAt = props.spawnedAt; 
  this.shootAt = props.shootAt;
  this.shooted = false;
  this.text = props.text;
  this.cssClass = props.cssClass;
  this.z = props.z;
  this.backgroundSize = props.backgroundSize;
};

var Title = new SPRITE({
  x: (GAME_WIDTH / 2) - 150,
  y: GAME_HEIGHT / 4, 
  w: 300,
  h: 50,
  z: 11,
  sheet: 'gamename.png',
  totalFrames: 3
});

const EXPLOSION = (origin) => {
  return new SPRITE({
    x: origin.x,
    y: origin.y,
    w: origin.w,
    h: origin.h,
    z: 20,
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
