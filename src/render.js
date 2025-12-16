import {
  GRID_SIZE,
  snake,
  food,
  updateGame,
  gameOver
} from "./game.js";

import "./input.js";
import { analyzeMoves } from "./ai.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const CELL_SIZE = canvas.width / GRID_SIZE;

function drawCell(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(
    x * CELL_SIZE,
    y * CELL_SIZE,
    CELL_SIZE,
    CELL_SIZE
  );
}

function draw() {
  // Clear screen
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw food
  drawCell(food.x, food.y, "#f00");

  // Draw snake
  snake.forEach((segment, index) => {
    drawCell(
      segment.x,
      segment.y,
      index === 0 ? "#0f0" : "#0a0"
    );
  });

  // 🧠 AI Coach overlay + risk label
  const { bestMove, riskLevel } = analyzeMoves();

  if (bestMove) {
    const head = snake[0];

    // Ghost cell (AI suggestion)
    ctx.fillStyle = "rgba(0,255,255,0.4)";
    ctx.fillRect(
      (head.x + bestMove.x) * CELL_SIZE,
      (head.y + bestMove.y) * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );

    // Risk label text
    ctx.fillStyle = "#0ff";
    ctx.font = "16px monospace";
    ctx.fillText(`AI: ${riskLevel}`, 10, 20);
  }

  if (gameOver) {
    ctx.fillStyle = "#0f0";
    ctx.font = "30px monospace";
    ctx.fillText("GAME OVER", 80, 200);
  }
}

function gameLoop() {
  updateGame();
  draw();
}

setInterval(gameLoop, 120);
