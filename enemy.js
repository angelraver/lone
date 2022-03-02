const ENEMY = function ({ type, h, w, x, y, s, spawnedAt, shootAt, loops, hitsLimit }) {
  let spriteSheet = getEnemySheet[type];
  let path = enemyPath({x, y, s, w, h, type});
  return new SPRITE({
    x,
    y,
    h,
    w,
    s,
    r: spriteSheet.r,
    sheet: spriteSheet.sheet,
    totalFrames: spriteSheet.totalFrames,
    path,
    loops,
    spawnedAt,
    shootAt,
    type,
    hit: false,
    hits: 0,
    hitsLimit
  });
}

const ENEMYSHOOT = function (hero, enemy) {
  let sprite = new SPRITE({
    x: enemy.x + enemy.w  / 2,
    y: enemy.y + enemy.h,
    h: BLOCK_UNITY,
    w: BLOCK_UNITY,
    sheet: 'shoot2.png',
    totalFrames: 2
  });

  sprite.path = pathLinear(sprite, hero, ENEMY_SHOOT_SPEED)

  return sprite
}

const enemyPath = (enemy) => {
  switch(enemy.type){
    case 'topLeftTrain':
      return pathRightThenCurveToDownThenToLeft(enemy);
    case 'topRightTrain':
      return pathLeftThenCurveToUpThenToRight(enemy);
    case 'topDown': 
      return pathTopDown(enemy);
    case 'topDownRandom': 
      return pathLinear(enemy, { x: random(GAME_WIDTH), y: GAME_HEIGHT}, enemy.s);
    case 'zigZagDown1':
      return pathZigZagDown1(enemy);
    case 'zigZagDown2':
      return pathZigZagDown2(enemy);
    case 'pathAngular':
      return pathAngular(enemy);
    case 'pathAngular2':
      return pathAngular2(enemy);
    case 'randomLeftToRight':
      return pathLinearSegmentH(enemy, { x: GAME_WIDTH, y: random(GAME_HEIGHT)}, enemy.s);
    case 'randomRightToLeft':
      return pathLinearSegmentH(enemy, { x: -ENEMY_SIZE, y: random(GAME_HEIGHT)}, enemy.s);
    case 'boss1':
      return pathBoss1(enemy, enemy.s);
    default:
      return;
  }
}

const getEnemySheet = {
  'topLeftTrain': { sheet: 'enemy1-2.png', totalFrames: 2 },
  'topDownRandom': { sheet: 'enemy4-2.png', totalFrames: 2 },
  'topRightTrain': { sheet: 'enemy1-2.png', totalFrames: 2 },
  'zigZagDown1': { sheet: 'enemy1-2.png', totalFrames: 2 },
  'zigZagDown2': { sheet: 'enemy1-2.png', totalFrames: 2 },
  'pathAngular': { sheet: 'enemy2-4.png', totalFrames: 4 },
  'pathAngular2': { sheet: 'enemy2-4.png', totalFrames: 4 },
  'randomLeftToRight': { sheet: 'enemy7-18.png', totalFrames: 18 },
  'randomRightToLeft': { sheet: 'enemy7-18.png', totalFrames: 18 },
  'boss1': { sheet: 'boss1.png', totalFrames: 4 },
}

const getEnemySpeed = (type) => {
  switch(type) {
    default:
      return ENEMY_SPEED;
  }
}
