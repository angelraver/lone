var gameFrame = document.getElementById('game');
gameFrame.style.width = GAME_WIDTH + 'px';
gameFrame.style.height = GAME_HEIGHT + 'px';

function clearGameFrame() {
  GlobalIds.map(function(id){
    gameFrame.removeChild(document.getElementById(id));
  });
  GlobalIds = [];
}

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
    case 'action' :
      actionScreen();
    break;
    case 'levelStart' :
      levelStartScreen();
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

