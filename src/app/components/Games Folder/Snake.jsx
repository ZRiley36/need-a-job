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
  const [score, setScore] = useState(0);
  const moveRef = useRef();
  const directionBuffer = useRef([]);
  const currentDirection = useRef(INITIAL_DIRECTION);

  // Update currentDirection ref when direction state changes
  useEffect(() => {
    currentDirection.current = direction;
  }, [direction]);

  // Handle keyboard input
  useEffect(() => {
    function handleKey(e) {
      // Prevent default behavior for game controls to avoid page scrolling
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(e.key)) {
        e.preventDefault();
      }
      
      let newDirection = null;
      
      // Arrow keys
      if (e.key === "ArrowUp") newDirection = { x: 0, y: -1 };
      if (e.key === "ArrowDown") newDirection = { x: 0, y: 1 };
      if (e.key === "ArrowLeft") newDirection = { x: -1, y: 0 };
      if (e.key === "ArrowRight") newDirection = { x: 1, y: 0 };
      
      // WASD keys
      if (e.key === "w" || e.key === "W") newDirection = { x: 0, y: -1 };
      if (e.key === "s" || e.key === "S") newDirection = { x: 0, y: 1 };
      if (e.key === "a" || e.key === "A") newDirection = { x: -1, y: 0 };
      if (e.key === "d" || e.key === "D") newDirection = { x: 1, y: 0 };
      
      if (newDirection) {
        // Get the last direction from buffer or current direction
        const lastDirection = directionBuffer.current.length > 0 
          ? directionBuffer.current[directionBuffer.current.length - 1]
          : currentDirection.current;
        
        // Check if new direction is opposite to the last direction (would cause self-collision)
        const isOpposite = (newDirection.x === -lastDirection.x && newDirection.y === -lastDirection.y);
        
        // Only add to buffer if it's not opposite and not the same as the last direction
        if (!isOpposite && (newDirection.x !== lastDirection.x || newDirection.y !== lastDirection.y)) {
          // Keep buffer size reasonable (max 2 moves ahead)
          if (directionBuffer.current.length < 2) {
            directionBuffer.current.push(newDirection);
          }
        }
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Game loop
  useEffect(() => {
    if (gameOver) return;
    
    const gameLoop = () => {
      // Get next direction from buffer or use current direction
      if (directionBuffer.current.length > 0) {
        const nextDirection = directionBuffer.current.shift();
        currentDirection.current = nextDirection;
        setDirection(nextDirection);
      }
      
      setSnake(prev => {
        const newHead = {
          x: prev[0].x + currentDirection.current.x,
          y: prev[0].y + currentDirection.current.y,
        };
        
        // Check border collision
        if (newHead.x < 0 || newHead.x >= BOARD_SIZE || newHead.y < 0 || newHead.y >= BOARD_SIZE) {
          setGameOver(true);
          return prev;
        }
        
        // Check self collision
        if (prev.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
          setGameOver(true);
          return prev;
        }
        let newSnake;
        if (newHead.x === food.x && newHead.y === food.y) {
          newSnake = [newHead, ...prev];
          setFood(getRandomFood(newSnake));
          setScore(s => s + 10);
        } else {
          newSnake = [newHead, ...prev.slice(0, -1)];
        }
        return newSnake;
      });
    };

    moveRef.current = setInterval(gameLoop, 120);
    return () => {
      if (moveRef.current) {
        clearInterval(moveRef.current);
      }
    };
  }, [direction, food, gameOver]);

  function resetGame() {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(getRandomFood(INITIAL_SNAKE));
    setGameOver(false);
    setScore(0);
    directionBuffer.current = [];
    currentDirection.current = INITIAL_DIRECTION;
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold mb-2 text-rich">Snake</h2>
      <div className="mb-4 text-lg font-semibold text-accent">Score: {score}</div>
      <div
        className="grid border-4 border-rich bg-black"
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
                className={`w-5 h-5 border border-gray-600
                  ${isHead ? "bg-green-400 border-green-300" : isSnake ? "bg-green-600 border-green-500" : isFood ? "bg-red-500 border-red-400" : "bg-gray-900 border-gray-700"}
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
            className="ml-4 px-4 py-2 bg-rich text-light rounded hover:bg-accent"
            onClick={resetGame}
          >
            Restart
          </button>
        </div>
      )}
      <div className="mt-2 text-gray-400 text-sm">
        Use arrow keys or WASD to move.
      </div>
    </div>
  );
}