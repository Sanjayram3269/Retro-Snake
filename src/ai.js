import { GRID_SIZE, snake, food, DIRECTIONS } from "./game.js";

export function analyzeMoves() {
  const head = snake[0];

  let bestMove = null;
  let bestScore = -Infinity;
  let riskLevel = "DEADLY";

  for (let dir of Object.values(DIRECTIONS)) {
    const next = {
      x: head.x + dir.x,
      y: head.y + dir.y
    };

    // ❌ Wall collision check
    if (
      next.x < 0 ||
      next.y < 0 ||
      next.x >= GRID_SIZE ||
      next.y >= GRID_SIZE
    ) {
      continue;
    }

    // ❌ Self collision check
    if (snake.some(seg => seg.x === next.x && seg.y === next.y)) {
      continue;
    }

    // 📏 Distance-based heuristic (Manhattan distance)
    const distanceToFood =
      Math.abs(food.x - next.x) + Math.abs(food.y - next.y);

    // Higher score = better move
    const score = 100 - distanceToFood;

    if (score > bestScore) {
      bestScore = score;
      bestMove = dir;
    }
  }

  // 🎯 Assign human-readable risk level
  if (bestMove) {
    if (bestScore >= 70) {
      riskLevel = "SAFE";
    } else if (bestScore >= 40) {
      riskLevel = "RISKY";
    } else {
      riskLevel = "DEADLY";
    }
  }

  return {
    bestMove,
    riskLevel
  };
}
