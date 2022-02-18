class SPRITE {
  constructor(props) {
    this.h = props.h;
    this.w = props.w;
    this.y = props.y;
    this.x = props.x;
    this.z = props.z;
    if(props.sheet) {
      var img = new Image();
      img.src = SPRITES_FOLDER + props.sheet;
      this.image = img;
    }
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
    this.hits = 0;
    this.hitsLimit = props.hitsLimit ? props.hitsLimit : 1;
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
    this.backgroundSize = props.backgroundSize;
    this.r = props.r;
    this.rY = props.rY;
    this.type = props.type;
    this.zoom = props.zoom,
    this.zooming = function() {
      let zoomSteps = [];
      if(!this.zoom) return [];
      for(let i = 0; i < this.zoom.length; i++){
        if(i < this.zoom.length - 1) {
          let currentState;
          let stateOrigin = this.zoom[i];
          let stateTarget = this.zoom[i + 1];
          let zoomType = stateOrigin.w < stateTarget.w ? 'in' : 'out';
          let steps = Math.abs((stateTarget.w - stateOrigin.w) / ENEMY_SPEED); // just based on w, not h
          for(let ii = 0; ii < steps; ii++) {
            currentState = zoomSteps.length > 0 ? zoomSteps[zoomSteps.length - 1] : stateOrigin;          
            if(zoomType === 'in') {
              step = {
                w: currentState.w + ENEMY_SPEED,
                h: currentState.h + ENEMY_SPEED
              }
            } else {
              step = {
                w: currentState.w - ENEMY_SPEED,
                h: currentState.h > stateTarget.h ? currentState.h - (ENEMY_SPEED * 0.7) : currentState.h
              }
            }
            zoomSteps.push(step);
            console.log(ii + ': w: ' + step.w + ' - ' + ' h: ' + step.h);
          }
        }
      }
      return zoomSteps;
    };
    // this.zoomSteps = this.zooming();
  };
}

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