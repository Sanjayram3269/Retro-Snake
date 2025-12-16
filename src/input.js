import { setDirection, DIRECTIONS } from "./game.js";

window.addEventListener("keydown", (e) => {
  e.preventDefault();

  switch (e.key) {
    case "ArrowUp":
      setDirection(DIRECTIONS.UP);
      break;
    case "ArrowDown":
      setDirection(DIRECTIONS.DOWN);
      break;
    case "ArrowLeft":
      setDirection(DIRECTIONS.LEFT);
      break;
    case "ArrowRight":
      setDirection(DIRECTIONS.RIGHT);
      break;
  }
});
