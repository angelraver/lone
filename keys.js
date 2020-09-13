function keyDown(e) {
  switch (e.code) {
    case 'ArrowRight':
      KeyRight = true;
      break;
    case 'ArrowLeft':
      KeyLeft = true;
      break;
    case 'ArrowUp':
      Acelerate = true;
      break;
    case 'ArrowDown':
      Break = true;
      break;
    case 'KeyX':
      Shoot = true;
      break;
    case 'Enter':
      if(Screen === 'title') {
        Screen = 'levelStart';
        MarkTime = GlobalTime;
        SetNewGame = true;
      }

      if(Screen === 'action') {
        Pause = !Pause;
        if(Pause) {
          playSound('start');
          stop();
        } else {
          playSound('start');
          go();
        }
      }

      if(Screen === 'gameOver') {
        Screen = 'title';
      }

      if(Screen === 'levelCompleted') {
        CurrentLevel++;
        Screen = 'levelStart';
        MarkTime = GlobalTime;
        SetNewGame = true;
      }
      break;
    default:
      break;
  }
}

function keyUp(e) {
  switch (e.code) {
    case 'ArrowRight':
      KeyRight = false;
      break;
    case 'ArrowLeft':
      KeyLeft = false;
      break;
    case 'ArrowUp':
      Acelerate = false;
      break;
    case 'ArrowDown':
      Break = false;
      break;
    case 'KeyX':
      Shoot = false;
      break;
    default:
      break;
  }
}
