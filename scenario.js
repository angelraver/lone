
var Jupiter = () => {
  return new SPRITE({
    x: GAME_WIDTH / 3,
    y: -GAME_HEIGHT,
    w: GAME_WIDTH,
    h: GAME_HEIGHT,
    z: 10,
    sheet: 'jupiter.png',
    totalFrames: 1,
  });
}

function drawStars(speed) {
  if(AddStarLine) {
    StarLines.push(getStarLine());
  }

  if(StarLines.length === 8){
    StarLines.shift();
  }
  StarLines.map(function(starLine) {
    starLine.y = starLine.y + speed;
    AddStarLine = GAME_HEIGHT / 6 - starLine.y < 3;
    starLine.blocks.split('').map(function (block, i) {
      if(block !== ' ') {
        addElement(new SPRITE({
          x: i * BLOCK_UNITY,
          y: starLine.y - (parseInt(block) * 10),
          h: 30,
          w: 30,
          z: 0,
          text: "."
        }));
      }
    });
  });
}

const getStarLine = () => {
  let blocks = '';
  for(let i = 0; i < GAME_WIDTH / BLOCK_UNITY; i++) {
    let block = random(5) === 1 ? random(8) + 1 : ' ';
    blocks = blocks +  block;
  }
  return {
    blocks,
    y: 0
  }
}

const getStarLines = () => {
  const linesN = 7;
  const lines = [];
  let y = GAME_HEIGHT;
  for(let i = 0; i < linesN; i++) {
    let newLine = getStarLine();
    newLine.y = y - (100 * i);
    lines.push(newLine);
  }
  return lines;
}

var StarLines = getStarLines();
var AddStarLine = false;
