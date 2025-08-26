import React, { useRef, useEffect, useState } from "react";

const BOARD_SIZE = 15;
const INITIAL_SNAKE = [
  { x: 7, y: 7 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };

function getRandomFood(snake) {
  let food;
  do {
    food = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  } while (snake.some(seg => seg.x === food.x && seg.y === food.y));
  return food;
}

export default function Snake() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(getRandomFood(INITIAL_SNAKE));
  const [gameOver, setGameOver] = useState(false);
  const moveRef = useRef();

  // Handle keyboard input
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "ArrowUp" && direction.y !== 1) setDirection({ x: 0, y: -1 });
      if (e.key === "ArrowDown" && direction.y !== -1) setDirection({ x: 0, y: 1 });
      if (e.key === "ArrowLeft" && direction.x !== 1) setDirection({ x: -1, y: 0 });
      if (e.key === "ArrowRight" && direction.x !== -1) setDirection({ x: 1, y: 0 });
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction]);

  // Game loop
  useEffect(() => {
    if (gameOver) return;
    moveRef.current = setInterval(() => {
      setSnake(prev => {
        const newHead = {
          x: (prev[0].x + direction.x + BOARD_SIZE) % BOARD_SIZE,
          y: (prev[0].y + direction.y + BOARD_SIZE) % BOARD_SIZE,
        };
        // Check collision
        if (prev.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
          setGameOver(true);
          clearInterval(moveRef.current);
          return prev;
        }
        let newSnake;
        if (newHead.x === food.x && newHead.y === food.y) {
          newSnake = [newHead, ...prev];
          setFood(getRandomFood(newSnake));
        } else {
          newSnake = [newHead, ...prev.slice(0, -1)];
        }
        return newSnake;
      });
    }, 120);
    return () => clearInterval(moveRef.current);
  }, [direction, food, gameOver]);

  function resetGame() {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(getRandomFood(INITIAL_SNAKE));
    setGameOver(false);
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold mb-2 text-brand">Snake</h2>
      <div
        className="grid border-4 border-brand-dark bg-black"
        style={{
          gridTemplateRows: `repeat(${BOARD_SIZE}, 20px)`,
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 20px)`,
        }}
      >
        {[...Array(BOARD_SIZE)].map((_, y) =>
          [...Array(BOARD_SIZE)].map((_, x) => {
            const isSnake = snake.some(seg => seg.x === x && seg.y === y);
            const isHead = snake[0].x === x && snake[0].y === y;
            const isFood = food.x === x && food.y === y;
            return (
              <div
                key={x + "-" + y}
                className={`w-5 h-5 border border-gray-800
                  ${isHead ? "bg-green-400" : isSnake ? "bg-green-700" : isFood ? "bg-red-500" : "bg-gray-900"}
                `}
              />
            );
          })
        )}
      </div>
      {gameOver && (
        <div className="mt-4 text-red-400 font-bold">
          Game Over!
          <button
            className="ml-4 px-4 py-2 bg-brand-dark text-white rounded hover:bg-brand"
            onClick={resetGame}
          >
            Restart
          </button>
        </div>
      )}
      <div className="mt-2 text-gray-400 text-sm">
        Use arrow keys to move.
      </div>
    </div>
  );
}