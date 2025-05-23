import { useState } from "react";
import { Chess } from "chess.js";

export default function ChessBoard() {
  const [game, setGame] = useState(() => new Chess());
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [dragged, setDragged] = useState<[number, number] | null>(null);
  const board = game.board();

  // Convert board coordinates to algebraic notation (e.g., [6,4] -> "e2")
  function toAlgebraic(row: number, col: number) {
    return "abcdefgh"[col] + (8 - row);
  }

  function handleSquareClick(row: number, col: number) {
    if (selected) {
      const from = toAlgebraic(selected[0], selected[1]);
      const to = toAlgebraic(row, col);
      const move = game.move({ from, to, promotion: "q" });
      if (move) {
        setGame(new Chess(game.fen())); // update board
      }
      setSelected(null);
    } else if (board[row][col]) {
      setSelected([row, col]);
    }
  }

  const getPieceImage = (piece: { type: string; color: string } | null) => {
    if (!piece) return null;
    // Example: "wK.svg" or "bQ.svg"
    return `/cburnett-pieces/${piece.color}${piece.type.toUpperCase()}.svg`;
  };

  // Drag handlers
  function handleDragStart(row: number, col: number) {
    setDragged([row, col]);
  }

  function handleDrop(row: number, col: number) {
    if (dragged) {
      const from = toAlgebraic(dragged[0], dragged[1]);
      const to = toAlgebraic(row, col);
      const move = game.move({ from, to, promotion: "q" });
      if (move) {
        setGame(new Chess(game.fen()));
      }
      setDragged(null);
      setSelected(null);
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold mb-2 text-brand">Chess</h2>
      <div className="relative" style={{ width: 320, height: 320 }}>
        {/* Board background */}
        <img
          src="green-board.png" // adjust path as needed
          alt="Chess board"
          className="absolute top-0 left-0 w-full h-full pointer-events-none select-none"
          draggable={false}
        />
        {/* Chess grid */}
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            display: "grid",
            gridTemplateRows: "repeat(8, 1fr)",
            gridTemplateColumns: "repeat(8, 1fr)",
          }}
        >
          {board.map((row, rIdx) =>
            row.map((piece, cIdx) => {
              const isSelected = selected && selected[0] === rIdx && selected[1] === cIdx;
              return (
                <button
                  key={rIdx + "-" + cIdx}
                  onClick={() => handleSquareClick(rIdx, cIdx)}
                  onDrop={() => handleDrop(rIdx, cIdx)}
                  onDragOver={handleDragOver}
                  className={`flex items-center justify-center border border-transparent
                    ${isSelected ? "ring-4 ring-brand" : ""}
                  `}
                  style={{ width: "100%", height: "100%", background: "none", padding: 0 }}
                >
                  {piece && (
                    <img
                      src={getPieceImage(piece)}
                      alt=""
                      className="w-8 h-8 select-none"
                      draggable={true}
                      onDragStart={e => {
                        handleDragStart(rIdx, cIdx);
                        // e.dataTransfer.setDragImage(e.target, 20, 20); // optional
                      }}
                    />
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
      <div className="mt-2 text-gray-400 text-sm">
        Click or drag a piece to move. No rules for turns or checkmate yet.
      </div>
    </div>
  );
}