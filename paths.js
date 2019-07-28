const buildCurve = (name, x, y, unity) => {
  const RightDown =  (x, y, unity) => { return { x: x + unity / 4, y: y + unity / 4 } };
  const Down = (x, y, unity) => { return { x: x, y: y + unity / 2 } };
  const DownLeft = (x, y, unity) => { return { x: x - unity / 4, y: y + unity / 4 } };
  const LeftUp = (x, y, unity) => { return { x: x - unity / 4, y: y - unity / 4 } };
  const Up = (x, y, unity) => { return { x: x, y: y - unity / 2 } };
  const UpRight = (x, y, unity) => { return { x: x + unity / 4, y: y - unity / 4 } };

  let pattern = [];
  switch (name) {
    case '12-3-6':
      pattern = [RightDown, RightDown, RightDown, RightDown, Down, Down, Down, Down, Down, Down, DownLeft, DownLeft, DownLeft, DownLeft];
    break;
    case '6-9-12':
      pattern = [LeftUp, LeftUp, LeftUp, LeftUp, Up, Up, Up, Up, Up, Up, UpRight, UpRight, UpRight, UpRight];
    break;
    case 'zigzag-down-right':
      pattern = [
        RightDown, RightDown, RightDown, RightDown, RightDown, RightDown, RightDown, RightDown,
        RightDown, RightDown, RightDown, RightDown, RightDown, RightDown, RightDown, RightDown,
        DownLeft, DownLeft, DownLeft, DownLeft, DownLeft, DownLeft, DownLeft, DownLeft,
        DownLeft, DownLeft, DownLeft, DownLeft, DownLeft, DownLeft, DownLeft, DownLeft
      ];
    break;
    case 'zigzag-down-left':
      pattern = [
        DownLeft, DownLeft, DownLeft, DownLeft, DownLeft, DownLeft, DownLeft, DownLeft,
        DownLeft, DownLeft, DownLeft, DownLeft, DownLeft, DownLeft, DownLeft, DownLeft,
        RightDown, RightDown, RightDown, RightDown, RightDown, RightDown, RightDown, RightDown,
        RightDown, RightDown, RightDown, RightDown, RightDown, RightDown, RightDown, RightDown
      ];
    break;
    default:
    break;
  }
  let positions = [];
  let actualPostion = { x, y };
  pattern.map(function(p){
    actualPostion = p(actualPostion.x, actualPostion.y, unity);
    positions.push(actualPostion);
  });
  return positions;
 }

const pathZigZagDown1 = (enemy) => {
  let positions = [];
  for(var i = 0; i < 8; i++) {
    buildCurve('zigzag-down-right', enemy.x, enemy.y, BLOCK_UNITY).map(function(pos){
      enemy.y = pos.y;
      enemy.x = pos.x;
      positions.push(pos);
    });
  };

  return positions;
}

const pathZigZagDown2 = (enemy) => {
  let positions = [];
  for(var i = 0; i < 8; i++) {
    buildCurve('zigzag-down-left', enemy.x, enemy.y, BLOCK_UNITY).map(function(pos){
      enemy.y = pos.y;
      enemy.x = pos.x;
      positions.push(pos);
    });
  };

  return positions;
}

const pathRightThenCurveToDownThenToLeft = (enemy) => {
  let positions = [];
  for(let i = 0; i < GAME_WIDTH - (GAME_WIDTH / 10);) {
    enemy.x = enemy.x + ENEMY_SPEED;
    positions.push({
      x: enemy.x,
      y: enemy.y
    })
    i = i + ENEMY_SPEED
  }
  buildCurve('12-3-6', enemy.x, enemy.y, BLOCK_UNITY).map(function(pos){
    enemy.y = pos.y;
    positions.push(pos);
  });
  for(let i = 0; i < GAME_WIDTH - (GAME_WIDTH / 10);) {
    enemy.x = enemy.x - ENEMY_SPEED;
    positions.push({
      x: enemy.x,
      y: enemy.y
    })
    i = i + ENEMY_SPEED
  }
  return positions;
}

const pathLeftThenCurveToUpThenToRight = (enemy) => {
  let positions = [];
  for(let i = 0; i < GAME_WIDTH - (GAME_WIDTH / 10);) {
    enemy.x = enemy.x - ENEMY_SPEED;
    positions.push({
      x: enemy.x,
      y: enemy.y
    })
    i = i + ENEMY_SPEED
  }
  buildCurve('6-9-12', enemy.x, enemy.y, BLOCK_UNITY).map(function(pos){
    enemy.y = pos.y;
    positions.push(pos);
  });
  for(let i = 0; i < GAME_WIDTH - (GAME_WIDTH / 10);) {
    enemy.x = enemy.x + ENEMY_SPEED;
    positions.push({
      x: enemy.x,
      y: enemy.y
    })
    i = i + ENEMY_SPEED
  }
  return positions;
}

const pathTopDown = (enemy) => {
  let positions = [];
  for(let i = 0; i < GAME_HEIGHT;) {
    enemy.y = enemy.y + ENEMY_SPEED;
    positions.push({
      x: enemy.x,
      y: enemy.y
    })
    i = i + ENEMY_SPEED
  }
  return positions;
}

const pathLinear = function (origin, target, speed) {
  const distance = {
    x: target.x - origin.x,
    y: target.y - origin.y
  };
  const ySteps = distance.y / speed;
  const xSteps = Math.abs(distance.x / (speed / 4));
  const xStepsInYDistance = ySteps / xSteps;
  const yStepsLimit = (GAME_HEIGHT - target.y) / speed;
  let currentXSerie	 = 0;
  let countSeries = 0;
  let positions = [];
  for(var i = 0; i < ySteps + yStepsLimit; i++){
    if(countSeries >= xStepsInYDistance) {
      currentXSerie++;
      countSeries = 0;
    }

    let pos;
    if(target.y < origin.y) {
      pos = { y: origin.y - (speed * i) };
    } else {
      pos = { y: origin.y + (speed * i) };
    }
    
    if(target.x < GAME_WIDTH / 2) {
      pos.x = origin.x - (speed / 4 * currentXSerie);
    } else {
      pos.x = origin.x + (speed / 4 * currentXSerie);
    }

    positions.push(pos);
    countSeries++;
  }

  return positions;
}

const pathLinearSegment = function (origin, target, speed) {
  const distance = {
    x: target.x - origin.x,
    y: target.y - origin.y
  };
  const ySteps = Math.round(Math.abs(distance.y) / speed);
  const xSpeed = distance.x / ySteps;
  let positions = [];
  let y = origin.y;
  let x = origin.x;
  for(var i = 0; i < ySteps; i++) {
    y = y + speed;
    x = x + xSpeed;
    positions.push({ x, y });
  }

  return positions;
}

const pathLinearSegmentH = function (origin, target, speed) {
  const distance = {
    x: target.x - origin.x,
    y: target.y - origin.y
  };

  const xSteps = Math.round(Math.abs(distance.x) / speed);
  const ySpeed = distance.y / xSteps;
  let positions = [];
  let y = origin.y;
  let x = origin.x;
  for(var i = 0; i < xSteps; i++) {
    if(origin.x < target.x) {
      x = x + speed;
    } else {
      x = x - speed;
    }

    if(origin.y < target.y) {
      y = y + ySpeed;
    } else {
      y = y - ySpeed;
    }

    positions.push({ x, y });
  }

  return positions;
}

const pathAngular = (enemy) => {
  //path like this shape: <
  let step1 = pathLinearSegment(
    enemy,
    { x: 0, y: (GAME_HEIGHT / 2) }, 
    ENEMY_SPEED
  );
  let step2 = pathLinearSegment(
    step1[step1.length -1],
    { x: GAME_WIDTH, y: GAME_HEIGHT }, 
    ENEMY_SPEED
  );

  return [
    ...step1,
    ...step2
  ]
}

const pathAngular2 = (enemy) => {
  //path like this shape: >
  let step1 = pathLinearSegment(
    enemy,
    { x: GAME_WIDTH - ENEMY_SIZE, y: (GAME_HEIGHT / 2) }, 
    ENEMY_SPEED
  );
  let step2 = pathLinearSegment(
    step1[step1.length -1],
    { x: 0, y: GAME_HEIGHT }, 
    ENEMY_SPEED
  );

  return [
    ...step1,
    ...step2
  ]
}
