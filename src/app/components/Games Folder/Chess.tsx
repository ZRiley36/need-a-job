import { useState, useEffect } from "react";
import { Chess } from "chess.js";

export default function ChessBoard() {
  const [game, setGame] = useState(() => new Chess());
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [dragged, setDragged] = useState<[number, number] | null>(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [isThinking, setIsThinking] = useState(false);
  const [stockfishLevel, setStockfishLevel] = useState(1);
  const [gameStatus, setGameStatus] = useState("playing"); // playing, checkmate, stalemate
  const board = game.board();

  // Convert board coordinates to algebraic notation (e.g., [6,4] -> "e2")
  function toAlgebraic(row: number, col: number) {
    return "abcdefgh"[col] + (8 - row);
  }

  // Get Stockfish move from Lichess API
  const getStockfishMove = async (fen: string, level: number) => {
    try {
      const response = await fetch(`https://lichess.org/api/cloud-eval?fen=${encodeURIComponent(fen)}&multiPv=1&depth=15`);
      const data = await response.json();
      
      if (data.bestmove) {
        return data.bestmove;
      }
      
      // Fallback to simpler API call
      const fallbackResponse = await fetch(`https://explorer.lichess.ovh/masters?fen=${encodeURIComponent(fen)}&topGames=0&recentGames=0`);
      const fallbackData = await fallbackResponse.json();
      
      if (fallbackData.moves && fallbackData.moves.length > 0) {
        // Return a random move from the top moves (simulating different difficulty levels)
        const moveIndex = Math.min(level - 1, fallbackData.moves.length - 1);
        return fallbackData.moves[moveIndex].uci;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting Stockfish move:', error);
      return null;
    }
  };

  // Make Stockfish move
  const makeStockfishMove = async () => {
    if (!isPlayerTurn || isThinking) return;
    
    setIsThinking(true);
    const currentFen = game.fen();
    const stockfishMove = await getStockfishMove(currentFen, stockfishLevel);
    
    if (stockfishMove) {
      try {
        const move = game.move(stockfishMove);
        if (move) {
          setGame(new Chess(game.fen()));
          setIsPlayerTurn(true);
          checkGameStatus();
        }
      } catch (error) {
        console.error('Error making Stockfish move:', error);
      }
    }
    
    setIsThinking(false);
  };

  // Check game status
  const checkGameStatus = () => {
    if (game.isCheckmate()) {
      setGameStatus("checkmate");
    } else if (game.isStalemate()) {
      setGameStatus("stalemate");
    } else {
      setGameStatus("playing");
    }
  };

  function handleSquareClick(row: number, col: number) {
    if (!isPlayerTurn || isThinking || gameStatus !== "playing") return;
    
    if (selected) {
      const from = toAlgebraic(selected[0], selected[1]);
      const to = toAlgebraic(row, col);
      try {
        const move = game.move({ from, to, promotion: "q" });
        if (move) {
          setGame(new Chess(game.fen()));
          setIsPlayerTurn(false);
          checkGameStatus();
          
          // Make Stockfish move after a short delay
          setTimeout(() => {
            makeStockfishMove();
          }, 500);
        }
      } catch {
        // Ignore illegal move attempts
      } finally {
        setSelected(null);
      }
    } else if (board[row][col] && board[row][col]?.color === 'w') {
      setSelected([row, col]);
    }
  }

  const getPieceImage = (piece: { type: string; color: string } | null) => {
    if (!piece) return "";
    // Example: "wK.svg" or "bQ.svg"
    return `/cburnett-pieces/${piece.color}${piece.type.toUpperCase()}.svg`;
  };

  // Drag handlers
  function handleDragStart(row: number, col: number) {
    if (!isPlayerTurn || isThinking || gameStatus !== "playing") return;
    if (board[row][col]?.color === 'w') {
      setDragged([row, col]);
    }
  }

  function handleDrop(row: number, col: number) {
    if (!isPlayerTurn || isThinking || gameStatus !== "playing" || !dragged) return;
    
    const from = toAlgebraic(dragged[0], dragged[1]);
    const to = toAlgebraic(row, col);
    try {
      const move = game.move({ from, to, promotion: "q" });
      if (move) {
        setGame(new Chess(game.fen()));
        setIsPlayerTurn(false);
        checkGameStatus();
        
        // Make Stockfish move after a short delay
        setTimeout(() => {
          makeStockfishMove();
        }, 500);
      }
    } catch {
      // Ignore illegal move attempts
    } finally {
      setDragged(null);
      setSelected(null);
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  // Reset game
  const resetGame = () => {
    setGame(new Chess());
    setIsPlayerTurn(true);
    setIsThinking(false);
    setGameStatus("playing");
    setSelected(null);
    setDragged(null);
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold mb-2 purple-text-gradient">Chess vs Stockfish</h2>
      
      {/* Game Controls */}
      <div className="mb-4 flex flex-col items-center space-y-3">
        <div className="flex items-center space-x-4">
          <label className="text-white text-sm font-medium">
            Difficulty Level:
          </label>
          <select
            value={stockfishLevel}
            onChange={(e) => setStockfishLevel(Number(e.target.value))}
            className="bg-neutral-700 text-white px-3 py-1 rounded border border-neutral-600 focus:border-primary-500 focus:outline-none"
            disabled={!isPlayerTurn || isThinking}
          >
            <option value={1}>Level 1 (Easy)</option>
            <option value={2}>Level 2 (Medium)</option>
            <option value={3}>Level 3 (Hard)</option>
            <option value={4}>Level 4 (Expert)</option>
            <option value={5}>Level 5 (Master)</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors text-sm font-medium"
          >
            New Game
          </button>
          
          <div className="text-sm text-neutral-300">
            {isThinking ? (
              <span className="text-primary-400">🤖 Stockfish is thinking...</span>
            ) : isPlayerTurn ? (
              <span className="text-green-400">♟️ Your turn</span>
            ) : (
              <span className="text-blue-400">🤖 Stockfish's turn</span>
            )}
          </div>
        </div>
        
        {gameStatus !== "playing" && (
          <div className="text-center">
            {gameStatus === "checkmate" && (
              <div className="text-red-400 font-semibold">
                {isPlayerTurn ? "🤖 Stockfish wins!" : "🎉 You win!"}
              </div>
            )}
            {gameStatus === "stalemate" && (
              <div className="text-yellow-400 font-semibold">
                🤝 Stalemate - Draw!
              </div>
            )}
          </div>
        )}
      </div>
      
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
                  {piece && getPieceImage(piece) && (
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
      <div className="mt-4 text-center">
        <div className="text-gray-400 text-sm mb-4">
          Play as white against Stockfish! Click or drag pieces to move. 
          Choose your difficulty level and try to beat the computer.
        </div>
        
        {/* Lichess Challenge Button */}
        <a
          href="https://lichess.org/@/ZachRiley36"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 purple-gradient hover:shadow-lg purple-glow text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          Challenge Me on Lichess
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        
        <div className="mt-2 text-xs text-gray-500">
          Username: <span className="text-primary-400 font-medium">ZachRiley36</span>
        </div>
      </div>
    </div>
  );
}