// Grid configuration
export const GRID_SIZE = 20;

// Directions
export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
};

// Initial game state
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

// Prevent instant reverse (classic rule)
export function setDirection(newDir) {
  if (
    direction.x + newDir.x === 0 &&
    direction.y + newDir.y === 0
  ) {
    return;
  }
  nextDirection = newDir;
}

// Game tick update
export function updateGame() {
  if (gameOver) return;

  direction = nextDirection;

  const head = snake[0];
  const newHead = {
    x: head.x + direction.x,
    y: head.y + direction.y
  };

  // Wall collision
  if (
    newHead.x < 0 ||
    newHead.y < 0 ||
    newHead.x >= GRID_SIZE ||
    newHead.y >= GRID_SIZE
  ) {
    gameOver = true;
    return;
  }

  // Self collision
  for (let segment of snake) {
    if (segment.x === newHead.x && segment.y === newHead.y) {
      gameOver = true;
      return;
    }
  }

  snake.unshift(newHead);

  // Food collision
  if (newHead.x === food.x && newHead.y === food.y) {
    score += 10;
    food = spawnFood();
  } else {
    snake.pop();
  }
}

// Spawn food in empty cell
function spawnFood() {
  let newFood;
  while (true) {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };

    const collision = snake.some(
      segment => segment.x === newFood.x && segment.y === newFood.y
    );

    if (!collision) break;
  }
  return newFood;
}
