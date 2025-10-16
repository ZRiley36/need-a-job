import React, { useEffect, useRef, useState } from "react";

// Tetris constants
const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 28;

// Tetrimino shapes and colors
const SHAPES = [
  // I
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  // J
  [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  // L
  [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  // O
  [
    [1, 1],
    [1, 1],
  ],
  // S
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  // T
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  // Z
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
];

const COLORS = [
  "bg-cyan-400",    // I
  "bg-blue-600",    // J
  "bg-orange-400",  // L
  "bg-yellow-300",  // O
  "bg-green-500",   // S
  "bg-purple-500",  // T
  "bg-red-500",     // Z
];

// Helper to get a random piece
function randomPiece() {
  const index = Math.floor(Math.random() * SHAPES.length);
  return {
    shape: SHAPES[index],
    color: COLORS[index],
    index,
  };
}

// Rotate a matrix 90 degrees clockwise
function rotateClockwise(shape: number[][]) {
  return shape[0].map((_, i) => shape.map(row => row[i]).reverse());
}

// Rotate a matrix 90 degrees counter-clockwise
function rotateCounterClockwise(shape: number[][]) {
  return shape[0].map((_, i) => shape.map(row => row[row.length - 1 - i]));
}

// Wall kick offsets for different pieces (simplified SRS)
function getWallKicks(pieceIndex: number, clockwise = true) {
  // I-piece has different kick data
  if (pieceIndex === 0) {
    return clockwise 
      ? [{ x: 0, y: 0 }, { x: -2, y: 0 }, { x: 1, y: 0 }, { x: -2, y: -1 }, { x: 1, y: 2 }]
      : [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: -1, y: 0 }, { x: 2, y: 1 }, { x: -1, y: -2 }];
  }
  // O-piece doesn't rotate
  if (pieceIndex === 3) {
    return [{ x: 0, y: 0 }];
  }
  // Standard pieces (J, L, S, T, Z)
  return clockwise
    ? [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: 1 }, { x: 0, y: -2 }, { x: -1, y: -2 }]
    : [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: -2 }, { x: 1, y: -2 }];
}

// Try rotation with wall kicks
function tryRotation(board: number[][], currentShape: number[][], currentPos: {x: number, y: number}, newShape: number[][], pieceIndex: number, clockwise = true) {
  const kicks = getWallKicks(pieceIndex, clockwise);
  
  for (const kick of kicks) {
    const testPos = { 
      x: currentPos.x + kick.x, 
      y: currentPos.y + kick.y 
    };
    
    if (!checkCollision(board, newShape, testPos)) {
      return { shape: newShape, pos: testPos, success: true };
    }
  }
  
  return { success: false };
}

// Check for collision
function checkCollision(board: number[][], shape: number[][], pos: {x: number, y: number}) {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (
        shape[y][x] &&
        (
          board[y + pos.y] === undefined ||
          board[y + pos.y][x + pos.x] === undefined ||
          board[y + pos.y][x + pos.x]
        )
      ) {
        return true;
      }
    }
  }
  return false;
}

// Merge piece into board
function merge(board: number[][], shape: number[][], pos: {x: number, y: number}, index: number) {
  const newBoard = board.map(row => [...row]);
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        newBoard[y + pos.y][x + pos.x] = index + 1;
      }
    }
  }
  return newBoard;
}

// Clear full lines
function clearLines(board: number[][]) {
  const newBoard = board.filter(row => row.some(cell => !cell));
  const cleared = ROWS - newBoard.length;
  while (newBoard.length < ROWS) {
    newBoard.unshift(Array(COLS).fill(0));
  }
  return { newBoard, cleared };
}

// Mini board for preview/hold
function MiniBoard({ shape, colorIndex }: { shape: number[][], colorIndex: number }) {
  const size = 4;
  const grid = Array.from({ length: size }, () => Array(size).fill(0));
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        grid[y][x] = colorIndex + 1;
      }
    }
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: `repeat(${size}, 20px)`,
        gridTemplateColumns: `repeat(${size}, 20px)`,
        gap: 1,
      }}
    >
      {grid.flat().map((cell, i) => (
        <div
          key={i}
          className={`w-5 h-5 border border-gray-700 ${cell ? COLORS[cell - 1] : "bg-gray-900"}`}
        />
      ))}
    </div>
  );
}

export default function Tetris() {
  const [board, setBoard] = useState(() =>
    Array.from({ length: ROWS }, () => Array(COLS).fill(0))
  );
  const [current, setCurrent] = useState(() => {
    const { shape, color, index } = randomPiece();
    return {
      shape,
      color,
      index,
      pos: { x: 3, y: 0 }
    };
  });
  const [next, setNext] = useState(() => randomPiece());
  const [hold, setHold] = useState(null);
  const [canHold, setCanHold] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const requestRef = useRef<number | null>(null);
  const [tickMs, setTickMs] = useState(400);
  const lastRotationTime = useRef<number>(0);
  const ROTATION_COOLDOWN = 150; // milliseconds

  // Draw board with current piece
  const displayBoard = board.map(row => [...row]);
  for (let y = 0; y < current.shape.length; y++) {
    for (let x = 0; x < current.shape[y].length; x++) {
      if (current.shape[y][x]) {
        const by = y + current.pos.y;
        const bx = x + current.pos.x;
        if (by >= 0 && by < ROWS && bx >= 0 && bx < COLS) {
          displayBoard[by][bx] = current.index + 1;
        }
      }
    }
  }

  // Handle keyboard controls
  useEffect(() => {
    function handle(e: KeyboardEvent) {
      if (gameOver) return;
      let moved = false;
      if (
        e.key === "ArrowLeft" || e.key.toLowerCase() === "a"
      ) {
        const newPos = { ...current.pos, x: current.pos.x - 1 };
        if (!checkCollision(board, current.shape, newPos)) {
          setCurrent(c => ({ ...c, pos: newPos }));
          moved = true;
        }
      }
      if (
        e.key === "ArrowRight" || e.key.toLowerCase() === "d"
      ) {
        const newPos = { ...current.pos, x: current.pos.x + 1 };
        if (!checkCollision(board, current.shape, newPos)) {
          setCurrent(c => ({ ...c, pos: newPos }));
          moved = true;
        }
      }
      if (
        e.key === "ArrowDown" || e.key.toLowerCase() === "s"
      ) {
        const newPos = { ...current.pos, y: current.pos.y + 1 };
        if (!checkCollision(board, current.shape, newPos)) {
          setCurrent(c => ({ ...c, pos: newPos }));
          moved = true;
        }
      }
      // Clockwise rotation (Up arrow, W, or X)
      if (
        e.key === "ArrowUp" || e.key.toLowerCase() === "w" || e.key.toLowerCase() === "x"
      ) {
        const now = Date.now();
        if (now - lastRotationTime.current >= ROTATION_COOLDOWN) {
          const rotated = rotateClockwise(current.shape);
          const result = tryRotation(board, current.shape, current.pos, rotated, current.index, true);
          if (result.success) {
            setCurrent(c => ({ ...c, shape: result.shape, pos: result.pos }));
            lastRotationTime.current = now;
            moved = true;
          }
        }
      }
      // Counter-clockwise rotation (Z key or Shift)
      if (
        e.key.toLowerCase() === "z" || (e.shiftKey && (e.key === "ArrowUp" || e.key.toLowerCase() === "w"))
      ) {
        const now = Date.now();
        if (now - lastRotationTime.current >= ROTATION_COOLDOWN) {
          const rotated = rotateCounterClockwise(current.shape);
          const result = tryRotation(board, current.shape, current.pos, rotated, current.index, false);
          if (result.success) {
            setCurrent(c => ({ ...c, shape: result.shape, pos: result.pos }));
            lastRotationTime.current = now;
            moved = true;
          }
        }
      }
      if (e.key.toLowerCase() === "c") {
        // Hold piece
        if (!canHold) return;
        setCanHold(false);
        if (!hold) {
          setHold({
            shape: current.shape,
            color: current.color,
            index: current.index,
          });
          // Spawn next piece
          const n = next;
          setNext(randomPiece());
          const startPos = { x: 3, y: 0 };
          if (checkCollision(board, n.shape, startPos)) {
            setGameOver(true);
          } else {
            setCurrent({
              shape: n.shape,
              color: n.color,
              index: n.index,
              pos: startPos,
            });
          }
        } else {
          // Swap hold and current
          const temp = hold;
          setHold({
            shape: current.shape,
            color: current.color,
            index: current.index,
          });
          const startPos = { x: 3, y: 0 };
          if (checkCollision(board, temp.shape, startPos)) {
            setGameOver(true);
          } else {
            setCurrent({
              shape: temp.shape,
              color: temp.color,
              index: temp.index,
              pos: startPos,
            });
          }
        }
      }
      if (
        (e.key === " " || e.key === "Spacebar")
      ) {
        // Hard drop
        let dropY = current.pos.y;
        while (!checkCollision(board, current.shape, { ...current.pos, y: dropY + 1 })) {
          dropY++;
        }
        setCurrent(c => ({ ...c, pos: { ...c.pos, y: dropY } }));
      }
    }
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
    // eslint-disable-next-line
  }, [current, board, next, hold, canHold, gameOver]);

  // Game loop
  useEffect(() => {
    if (gameOver) return;
    function tick() {
      let newPos = { ...current.pos, y: current.pos.y + 1 };
      if (!checkCollision(board, current.shape, newPos)) {
        setCurrent(c => ({ ...c, pos: newPos }));
      } else {
        // Merge shape into board
        const merged = merge(board, current.shape, current.pos, current.index);
        // Clear lines
        const { newBoard, cleared } = clearLines(merged);
        setBoard(newBoard);
        setScore(s => s + cleared * 100);
        setCanHold(true);
        // New shape: use next, and generate a new next
        const n = next;
        setNext(randomPiece());
        const startPos = { x: 3, y: 0 };
        if (checkCollision(newBoard, n.shape, startPos)) {
          setGameOver(true);
        } else {
          setCurrent({
            shape: n.shape,
            color: n.color,
            index: n.index,
            pos: startPos,
          });
        }
      }
      requestRef.current = window.setTimeout(tick, tickMs);
    }
    requestRef.current = window.setTimeout(tick, tickMs);
    return () => clearTimeout(requestRef.current);
    // eslint-disable-next-line
  }, [current, board, gameOver, next, tickMs]);

  function resetGame() {
    setBoard(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
    const { shape, color, index } = randomPiece();
    setCurrent({
      shape,
      color,
      index,
      pos: { x: 3, y: 0 }
    });
    setNext(randomPiece());
    setHold(null);
    setCanHold(true);
    setScore(0);
    setGameOver(false);
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold mb-2 text-rich">Tetris</h2>
      <div className="flex gap-8 mb-4">
        {/* Main board */}
        <div>
          <div
            className="inline-block border-4 border-rich bg-black"
            style={{
              width: COLS * BLOCK_SIZE,
              height: ROWS * BLOCK_SIZE,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateRows: `repeat(${ROWS}, ${BLOCK_SIZE}px)`,
                gridTemplateColumns: `repeat(${COLS}, ${BLOCK_SIZE}px)`,
              }}
            >
              {displayBoard.flat().map((cell, i) => (
                <div
                  key={i}
                  className={`w-7 h-7 border border-gray-800 ${
                    cell
                      ? COLORS[cell - 1]
                      : "bg-gray-900"
                  }`}
                  style={{
                    boxSizing: "border-box",
                    width: BLOCK_SIZE,
                    height: BLOCK_SIZE,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Next and Hold boxes */}
        <div className="flex flex-col gap-6 items-center">
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-400 mb-1">Next</span>
            <div className="border-2 border-rich bg-black rounded p-1">
              <MiniBoard shape={next.shape} colorIndex={next.index} />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-400 mb-1">Hold</span>
            <div className="border-2 border-rich bg-black rounded p-1">
              {hold ? (
                <MiniBoard shape={hold.shape} colorIndex={hold.index} />
              ) : (
                <div className="w-20 h-20 flex items-center justify-center text-gray-700">--</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-4 items-center">
        <span className="text-lg text-rich font-bold">Score: {score}</span>
        {gameOver && (
          <button
            className="ml-4 px-4 py-2 bg-rich text-light rounded hover:bg-accent"
            onClick={resetGame}
          >
            Restart
          </button>
        )}
      </div>
      <div className="mt-4 text-sm text-gray-400">
        Controls: <b>Arrow keys/WASD</b> to move, <b>Up/W/X</b> rotate clockwise, <b>Z</b> rotate counter-clockwise, <b>C</b> to hold, <b>Space</b> to hard drop
      </div>
    </div>
  );
}