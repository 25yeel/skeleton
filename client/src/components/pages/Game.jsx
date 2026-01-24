import React, { useEffect, useRef } from "react";

const rows = 25;
const cols = 25;
const cell_size = 20;

const wall_color = "black";
const path_color = "white";

const Game = () => {
  const canvasRef = useRef(null);
  const mazeRef = useRef(
    Array(rows).fill().map(() => Array(cols).fill(1))
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = cols * cell_size;
    canvas.height = rows * cell_size;

    function generateMaze() {
      const maze = mazeRef.current;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          maze[r][c] = 1;
        }
      }

      carvePassage(1, 1);
    }

    function carvePassage(r, c) {
      const maze = mazeRef.current;
      const directions = [
        [-2, 0],
        [0, 2],
        [2, 0],
        [0, -2],
      ].sort(() => Math.random() - 0.5);

      maze[r][c] = 0;

      for (let [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;

        if (
          nr > 0 &&
          nr < rows - 1 &&
          nc > 0 &&
          nc < cols - 1 &&
          maze[nr][nc] === 1
        ) {
          maze[r + dr / 2][c + dc / 2] = 0;
          carvePassage(nr, nc);
        }
      }
    }

    function drawMaze() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const maze = mazeRef.current;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          ctx.fillStyle = maze[r][c] === 1 ? wall_color : path_color;
          ctx.fillRect(
            c * cell_size,
            r * cell_size,
            cell_size,
            cell_size
          );
        }
      }
    }

    generateMaze();
    drawMaze();

    const button = document.getElementById("startGame");
    button.addEventListener("click", () => {
      generateMaze();
      drawMaze();
    });

    return () => button.removeEventListener("click", drawMaze);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} />
      <button id="startGame">Generate Maze</button>
    </>
  );
};

export default Game;
