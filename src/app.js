import { BOARD_SIZE, DIRECTIONS, changeDirection, createGame, step } from './game.js';

const canvas = document.querySelector('#board');
const context = canvas.getContext('2d');
const score = document.querySelector('#score');
const status = document.querySelector('#status');
const restart = document.querySelector('#restart');
const cellSize = canvas.width / BOARD_SIZE;
let state = createGame();

function drawCell({ x, y }, color, inset = 1) {
  context.fillStyle = color;
  context.fillRect(x * cellSize + inset, y * cellSize + inset, cellSize - inset * 2, cellSize - inset * 2);
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (state.food) drawCell(state.food, '#ef6f61', 3);
  state.snake.forEach((part, index) => drawCell(part, index === 0 ? '#a8ed9a' : '#65bf70', 2));
  score.textContent = String(state.score);
  status.textContent = state.gameOver
    ? 'Game over. Restart to try again.'
    : state.started ? 'Keep going.' : 'Use arrow keys or WASD to begin.';
}

document.addEventListener('keydown', (event) => {
  const direction = DIRECTIONS[event.key];
  if (!direction) return;
  event.preventDefault();
  state = changeDirection(state, direction);
  render();
});

restart.addEventListener('click', () => {
  state = createGame();
  render();
});

setInterval(() => {
  state = step(state);
  render();
}, 120);

render();
