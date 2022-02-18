function timing() {
  GlobalTime = GlobalTime + .5;
}

function go() {
  start = setInterval(rolling, GAME_SPEED);
}

function stop() {
  clearInterval(start);
}

function rolling() {
  clearGameFrame();
  switch(Screen) {
    case 'title' :
      titleScreen();
      break;
    case 'levelStart' :
      levelStartScreen();
      break;
    case 'action' :
      actionScreen();
      break;
    case 'gameOver' :
      gameOverScreen();
      break;
    case 'levelCompleted':
      levelCompletedScreen();
      break;
  }
}

document.body.addEventListener('keydown', keyDown);
document.body.addEventListener('keyup', keyUp);

setInterval(timing, 500);
var start = setInterval(rolling, GAME_SPEED);
