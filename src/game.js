export const GRID_SIZE = 20;

export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
};

export let snake = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 }
];

export let direction = DIRECTIONS.RIGHT;
export let nextDirection = DIRECTIONS.RIGHT;

export let food = spawnFood();
export let score = 0;
export let gameOver = false;

export function setDirection(newDir) {
  if (
    direction.x + newDir.x === 0 &&
    direction.y + newDir.y === 0
  ) return;

  nextDirection = newDir;
}

export function updateGame() {
  if (gameOver) return;

  direction = nextDirection;

  const head = snake[0];
  const newHead = {
    x: head.x + direction.x,
    y: head.y + direction.y
  };

  if (
    newHead.x < 0 ||
    newHead.y < 0 ||
    newHead.x >= GRID_SIZE ||
    newHead.y >= GRID_SIZE
  ) {
    gameOver = true;
    return;
  }

  if (snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
    gameOver = true;
    return;
  }

  snake.unshift(newHead);

  if (newHead.x === food.x && newHead.y === food.y) {
    score += 10;
    food = spawnFood();
  } else {
    snake.pop();
  }
}

function spawnFood() {
  while (true) {
    const pos = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };

    if (!snake.some(s => s.x === pos.x && s.y === pos.y)) {
      return pos;
    }
  }
}
export function resetGame() {
  snake.length = 0;
  snake.push(
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  );

  direction = DIRECTIONS.RIGHT;
  nextDirection = DIRECTIONS.RIGHT;
  score = 0;
  gameOver = false;
  food = spawnFood();
}
