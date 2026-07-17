export const BOARD_SIZE = 20;

export const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
};

export function createGame(random = Math.random) {
  const snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
  return {
    snake,
    direction: { x: 1, y: 0 },
    food: placeFood(snake, random),
    score: 0,
    started: false,
    gameOver: false,
  };
}

export function changeDirection(state, nextDirection) {
  if (!nextDirection || state.gameOver) return state;
  const isOpposite = state.direction.x + nextDirection.x === 0
    && state.direction.y + nextDirection.y === 0;
  if (isOpposite) return state;
  return { ...state, direction: nextDirection, started: true };
}

export function step(state, random = Math.random) {
  if (!state.started || state.gameOver) return state;

  const head = state.snake[0];
  const nextHead = {
    x: head.x + state.direction.x,
    y: head.y + state.direction.y,
  };
  const ateFood = nextHead.x === state.food.x && nextHead.y === state.food.y;
  const bodyToCheck = ateFood ? state.snake : state.snake.slice(0, -1);
  const hitWall = nextHead.x < 0 || nextHead.y < 0
    || nextHead.x >= BOARD_SIZE || nextHead.y >= BOARD_SIZE;
  const hitSelf = bodyToCheck.some(({ x, y }) => x === nextHead.x && y === nextHead.y);

  if (hitWall || hitSelf) return { ...state, gameOver: true };

  const snake = [nextHead, ...state.snake];
  if (!ateFood) snake.pop();

  return {
    ...state,
    snake,
    food: ateFood ? placeFood(snake, random) : state.food,
    score: ateFood ? state.score + 1 : state.score,
  };
}

export function placeFood(snake, random = Math.random) {
  const openCells = [];
  for (let y = 0; y < BOARD_SIZE; y += 1) {
    for (let x = 0; x < BOARD_SIZE; x += 1) {
      if (!snake.some((part) => part.x === x && part.y === y)) openCells.push({ x, y });
    }
  }
  if (openCells.length === 0) return null;
  return openCells[Math.floor(random() * openCells.length)];
}
