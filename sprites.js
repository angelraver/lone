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

const HERO =  () => {
  return  new SPRITE({
    x: GAME_WIDTH / 2 - BLOCK_UNITY / 2,
    y: GAME_HEIGHT - GAME_HEIGHT / 5,
    h: BLOCK_UNITY * 4,
    w: BLOCK_UNITY * 4,
    z: 20,
    sheet: 'shipHero.png',
    totalFrames: 6,
  });
}

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

const sAccuracy = () => {
  return new SPRITE({
    x: 0,
    y: GAME_HEIGHT / 2 -25,
    w: GAME_WIDTH,
    h: 25,
    text: 'ACCURACY: ' + ((100 / ShootCount) * KillCount).toFixed(2),
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
