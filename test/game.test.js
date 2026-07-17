import test from 'node:test';
import assert from 'node:assert/strict';
import { changeDirection, createGame, placeFood, step } from '../src/game.js';

test('the snake moves one cell in its current direction', () => {
  const state = { ...createGame(() => 0), started: true };
  const next = step(state, () => 0);
  assert.deepEqual(next.snake[0], { x: 11, y: 10 });
  assert.equal(next.snake.length, state.snake.length);
});

test('eating food grows the snake and increments the score', () => {
  const state = { ...createGame(() => 0), started: true, food: { x: 11, y: 10 } };
  const next = step(state, () => 0);
  assert.equal(next.score, 1);
  assert.equal(next.snake.length, state.snake.length + 1);
});

test('a direct reversal is ignored', () => {
  const state = createGame(() => 0);
  const next = changeDirection(state, { x: -1, y: 0 });
  assert.deepEqual(next.direction, { x: 1, y: 0 });
});

test('hitting the wall ends the game', () => {
  const state = {
    ...createGame(() => 0),
    snake: [{ x: 19, y: 10 }],
    direction: { x: 1, y: 0 },
    started: true,
  };
  assert.equal(step(state).gameOver, true);
});

test('food is never placed on the snake', () => {
  const snake = [{ x: 0, y: 0 }, { x: 1, y: 0 }];
  assert.deepEqual(placeFood(snake, () => 0), { x: 2, y: 0 });
});
