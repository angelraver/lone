const train = (timeStart, timeGap, units, type, x, y, shoot, loop) => {
  let enemys = [];
  let spawnAt = timeStart;
  let getY = (y, type) => {
    if(y === null) {
      switch(type){
        case 'randomLeftToRight':
        case 'randomRightToLeft':
          return random(GAME_HEIGHT/2);
        default:
          return random(GAME_HEIGHT);
      }
    }

    return y;
  }
  for(var i = 0; i < units; i++) {
    enemys.push({
      spawnAt,
      type,
      h: ENEMY_SIZE,
      w: ENEMY_SIZE,
      x: x === null ? random(GAME_WIDTH) : x,
      y: getY(y, type),
      s: getEnemySpeed(type),
      shootAt: shoot > 0 ? random(2) : -1,
      loops: loop,
      spawned: false
    });
    spawnAt = spawnAt + timeGap;
  }

  return enemys;
}

const GetLevelConfig = (n) => {
  const levels = {
    1: {
      enemys: [
        ...train(1, 1, 5, 'topDownRandom', null, 0, -1, 1),
        ...train(1, 1, 30, 'topDownRandom', null, 0, -1, 1),
        ...train(5, .5, 5, 'topLeftTrain', -ENEMY_SIZE, BLOCK_UNITY * 4, -1, 2),
        ...train(10, .5, 5, 'pathAngular', GAME_WIDTH - ENEMY_SIZE, 0, 1, 1),
        ...train(15, .5, 5, 'pathAngular2',  -ENEMY_SIZE, 0, 1, 1),
        ...train(25, .5, 5, 'pathAngular', GAME_WIDTH - ENEMY_SIZE, 0, 1, 1),
        ...train(30, 2, 15, 'topDownRandom', null, 0, -1, 2),
        ...train(35, .5, 5, 'pathAngular2',  -ENEMY_SIZE, 0, 1, 1),
        ...train(40, .5, 5, 'zigZagDown1', GAME_WIDTH / 5, 0, -1, 1),
        ...train(45, .5, 5, 'zigZagDown2', GAME_WIDTH - (GAME_WIDTH) / 5, 0, -1, 1),
        ...train(50, .5, 5, 'topRightTrain', GAME_WIDTH, BLOCK_UNITY * 12, 5, 2),
        ...train(55, .5, 5, 'topLeftTrain', 0, BLOCK_UNITY * 6, 5, 2),
        ...train(60, .5, 5, 'randomLeftToRight', 0, null, 5, 1),
        ...train(65, .5, 5, 'randomRightToLeft', GAME_WIDTH, null, 5, 1),
        getBoss(n, 72)
      ]
    },
    2: {
      enemys: [
        ...train(1, 1.5, 50, 'topDownRandom', null, 0, -1, 2),
        ...train(5, .5, 10, 'topLeftTrain', -ENEMY_SIZE, BLOCK_UNITY * 4, -1, 2),
        ...train(15, .5, 10, 'pathAngular', GAME_WIDTH - ENEMY_SIZE, 0, 1, 1),
        ...train(20, .5, 10, 'pathAngular2',  -ENEMY_SIZE, 0, 1, 1),
        ...train(25, .5, 10, 'pathAngular', GAME_WIDTH - ENEMY_SIZE, 0, 1, 1),
        ...train(30, 1, 25, 'topDownRandom', null, 0, -1, 2),
        ...train(35, .5, 10, 'pathAngular2',  -ENEMY_SIZE, 0, 1, 1),
        ...train(40, .5, 10, 'zigZagDown1', GAME_WIDTH / 5, 0, -1, 1),
        ...train(45, .5, 10, 'zigZagDown2', GAME_WIDTH - (GAME_WIDTH) / 5, 0, -1, 1),
        ...train(50, .5, 10, 'topRightTrain', GAME_WIDTH, BLOCK_UNITY * 12, 5, 2),
        ...train(55, .5, 10, 'topLeftTrain', 0, BLOCK_UNITY * 6, 5, 2),
        ...train(60, .5, 20, 'randomLeftToRight', 0, null, 5, 1),
        ...train(65, .5, 20, 'randomRightToLeft', GAME_WIDTH, null, 5, 1),
      ]
    },
    3: {
      enemys: [
        ...train(1, 1, 60, 'topDownRandom', null, 0, -1, 2),
        ...train(5, .5, 10, 'topLeftTrain', -ENEMY_SIZE, BLOCK_UNITY * 4, -1, 2),
        ...train(15, .5, 10, 'pathAngular', GAME_WIDTH - ENEMY_SIZE, 0, 1, 1),
        ...train(20, .5, 10, 'pathAngular2',  -ENEMY_SIZE, 0, 1, 1),
        ...train(25, .5, 10, 'pathAngular', GAME_WIDTH - ENEMY_SIZE, 0, 1, 1),
        ...train(35, .5, 10, 'pathAngular2',  -ENEMY_SIZE, 0, 1, 1),
        ...train(40, .5, 10, 'zigZagDown1', GAME_WIDTH / 5, 0, -1, 1),
        ...train(45, .5, 10, 'zigZagDown2', GAME_WIDTH - (GAME_WIDTH) / 5, 0, -1, 1),
        ...train(50, .5, 10, 'topRightTrain', GAME_WIDTH, BLOCK_UNITY * 12, 5, 2),
        ...train(55, .5, 10, 'topLeftTrain', 0, BLOCK_UNITY * 6, 5, 2),
        ...train(60, .5, 10, 'randomLeftToRight', 0, null, 5, 1),
        ...train(65, .5, 10, 'randomRightToLeft', GAME_WIDTH, null, 5, 1),
      ]
    }
  }

  return levels[n];
}

const getBoss = (levelN, spawnAt) => {
  const BOSSES = {
    1: {
        type: "boss1",
        h: BLOCK_UNITY * 8 + 5,
        w: BLOCK_UNITY * 12,
        x: 0,
        y: BLOCK_UNITY * 10,
        s: 12,
        loops: 1,
        shootAt: 3,
        spawnAt,
        spawned: false,
        hitsLimit: 3,
        totalFramesExtended: 8
      }
  };
  return BOSSES[levelN];
}

