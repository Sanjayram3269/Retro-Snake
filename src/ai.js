import { GRID_SIZE, snake, food, DIRECTIONS } from "./game.js";

export function analyzeMoves() {
  const head = snake[0];
  let bestMove = null;
  let bestScore = -Infinity;
  let riskLevel = "DEADLY";

  for (let dir of Object.values(DIRECTIONS)) {
    const next = { x: head.x + dir.x, y: head.y + dir.y };

    // Hard collision checks
    if (
      next.x < 0 ||
      next.y < 0 ||
      next.x >= GRID_SIZE ||
      next.y >= GRID_SIZE
    ) continue;

    if (snake.some(seg => seg.x === next.x && seg.y === next.y)) continue;

    // Distance to food (reward)
    const foodDist =
      Math.abs(food.x - next.x) + Math.abs(food.y - next.y);

    // Distance to nearest wall (risk)
    const wallDist = Math.min(
      next.x,
      next.y,
      GRID_SIZE - next.x - 1,
      GRID_SIZE - next.y - 1
    );

    // Distance to body (risk)
    let bodyPenalty = 0;
    snake.forEach(seg => {
      const d = Math.abs(seg.x - next.x) + Math.abs(seg.y - next.y);
      if (d <= 2) bodyPenalty += 10;
    });

    const score =
      100 - foodDist * 2 + wallDist * 3 - bodyPenalty;

    if (score > bestScore) {
      bestScore = score;
      bestMove = dir;
    }
  }

  if (bestMove) {
    if (bestScore >= 90) riskLevel = "SAFE";
    else if (bestScore >= 60) riskLevel = "RISKY";
    else riskLevel = "DEADLY";
  }

  return { bestMove, riskLevel };
}
