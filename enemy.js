const ENEMY = function (type, x, y, spawnedAt, shootAt, loops) {
  let spriteSheet = getEnemySprite(type);
  let path = enemyPath({x, y, type});
  return new SPRITE({
    x,
    y,
    h: ENEMY_SIZE,
    w: ENEMY_SIZE,
    z: 20,
    sheet: spriteSheet.sheet,
    totalFrames: spriteSheet.totalFrames,
    path,
    loops,
    spawnedAt,
    shootAt
  });
}

const ENEMYSHOOT = function (hero, enemy) {
  return new SPRITE({
    x: enemy.x,
    y: enemy.y,
    h: BLOCK_UNITY,
    w: BLOCK_UNITY,
    z: 20,
    sheet: 'shoot2.png',
    totalFrames: 2,
    path: pathLinear(enemy, hero, ENEMY_SHOOT_SPEED)
  });
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
      return pathLinear(enemy, { x: random(GAME_WIDTH), y: GAME_HEIGHT}, ENEMY_SPEED);
    case 'zigZagDown1':
      return pathZigZagDown1(enemy);
    case 'zigZagDown2':
      return pathZigZagDown2(enemy);
    case 'pathAngular':
      return pathAngular(enemy);
    case 'pathAngular2':
      return pathAngular2(enemy);
    case 'randomLeftToRight':
      return pathLinearSegmentH(enemy, { x: GAME_WIDTH, y: random(GAME_HEIGHT)}, ENEMY_SPEED);
    case 'randomRightToLeft':
      return pathLinearSegmentH(enemy, { x: -ENEMY_SIZE, y: random(GAME_HEIGHT)}, ENEMY_SPEED);
    default:
      return;
  }
}

const getEnemySprite = (type) => {
  switch(type){
    case 'topLeftTrain':
      return {
        sheet: 'enemy1-2.png',
        totalFrames: 2,
      }
    case 'topDownRandom':
      return {
        sheet: 'enemy4-2.png',
        totalFrames: 2,
      }
    case 'topRightTrain':
      return {
        sheet: 'enemy1-2.png',
        totalFrames: 2,
      }
    case 'zigZagDown1':
      return {
        sheet: 'enemy7-18.png',
        totalFrames: 18,
      }
    case 'zigZagDown2':
      return {
        sheet: 'enemy7-18.png',
        totalFrames: 3,
      }
    case 'pathAngular':
      return {
        sheet: 'enemy2-4.png',
        totalFrames: 4,
      }
    case 'pathAngular2':
      return {
        sheet: 'enemy2-4.png',
        totalFrames: 4,
      }
    case 'randomLeftToRight':
      return {
        sheet: 'enemy5-3.png',
        totalFrames: 3,
      }
    case 'randomRightToLeft':
      return {
        sheet: 'enemy5-3.png',
        totalFrames: 2,
      }
    default:
      return {};
  }
}
