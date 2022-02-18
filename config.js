const BLOCK_UNITY = 10;
const MINI_BLOCK_UNITY = 1;
const SPEED_BACKGROUND_1 = 3;
const SHOOT_SPEED = 20;
const ENEMY_SHOOT_SPEED = 10;
const GAME_SPEED = 45;
const GAME_WIDTH = 500;
const GAME_HEIGHT = 700;
const GAME_MID_H =  GAME_WIDTH / 2;
const GAME_MID_V =  GAME_HEIGHT / 2;
const ENEMY_SPEED = 6;
const ENEMY_SIZE = BLOCK_UNITY * 4;
const SPRITES_FOLDER = './assets/sprites/';
const SOUND_FOLDER = './assets/sounds/';

const canvas = document.getElementById('canvas');
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
const ctx = canvas.getContext("2d");

const SOUND = {
  ['explosion1']: 'explosion1.mp3',
  ['shoot1']: 'shoot1.mp3',
  ['explosion2']: 'explosion2.mp3',
  ['shoot2']: 'shoot2.mp3',
  ['start']: 'start.mp3'
}

const random = (limit) => Math.floor(Math.random() * limit);

const colision = (a, b) => {
  return a.x + a.w > b.x &&
    a.y + a.h > b.y &&
    a.x < b.x + b.w &&
    a.y < b.y + b.h;
}

const topLimit = (shape) => shape.y < BLOCK_UNITY;
const rightLimit = (shape) => shape.x + shape.w + BLOCK_UNITY >= GAME_WIDTH;
const bottomLimit = (shape) => shape.y + shape.h >= GAME_HEIGHT - BLOCK_UNITY;
const leftLimit = (shape) => shape.x - BLOCK_UNITY <= 0;
