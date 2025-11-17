"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

// Elo rating options with corresponding Stockfish skill levels
const ELO_RATINGS = [
  { elo: 800, skillLevel: 2, depth: 6 },
  { elo: 1200, skillLevel: 4, depth: 8 },
  { elo: 1600, skillLevel: 7, depth: 10 },
  { elo: 2000, skillLevel: 12, depth: 12 },
  { elo: 2400, skillLevel: 18, depth: 15 },
];

export default function ChessBoard() {
  const [game, setGame] = useState(() => new Chess());
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [isThinking, setIsThinking] = useState(false);
  const [stockfishLevel, setStockfishLevel] = useState(0); // Index into ELO_RATINGS array
  const [gameStatus, setGameStatus] = useState<"playing" | "checkmate" | "stalemate">("playing");
  const stockfishRef = useRef<Worker | null>(null);

  // Initialize Stockfish engine
  useEffect(() => {
    // Check if WebAssembly is supported
    const wasmSupported = typeof WebAssembly === 'object' && WebAssembly.validate(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));
    
    // Create Stockfish worker from public folder
    const stockfishPath = wasmSupported 
      ? '/stockfish/stockfish.wasm.js'
      : '/stockfish/stockfish.js';
    
    const stockfish = new Worker(stockfishPath);
    stockfishRef.current = stockfish;

    // Initialize UCI
    stockfish.postMessage('uci');

    // Cleanup on unmount
    return () => {
      if (stockfishRef.current) {
        stockfishRef.current.terminate();
        stockfishRef.current = null;
      }
    };
  }, []);

  // Get Stockfish move using stockfish.js
  // Stockfish uses UCI protocol, returns best move in UCI format
  const getStockfishMove = async (fen: string, level: number): Promise<string | null> => {
    return new Promise((resolve) => {
      if (!stockfishRef.current) {
        console.error('Stockfish engine not initialized');
        resolve(null);
        return;
      }

      const stockfish = stockfishRef.current;
      let moveFound = false;
      const timeoutId = setTimeout(() => {
        if (!moveFound) {
          console.error('Stockfish move timeout');
          stockfish.postMessage('stop');
          resolve(null);
        }
      }, 10000); // 10 second timeout

      // Get Elo rating configuration for the selected level
      const eloConfig = ELO_RATINGS[level] || ELO_RATINGS[2]; // Default to 1600 if invalid
      const skillLevel = eloConfig.skillLevel;
      const depth = eloConfig.depth;

      // Set skill level (1-20, where 1 is weakest, 20 is strongest)
      stockfish.postMessage(`setoption name Skill Level value ${skillLevel}`);

      // Set up position
      stockfish.postMessage(`position fen ${fen}`);

      // Calculate best move with depth based on level
      stockfish.postMessage(`go depth ${depth}`);

      // Handle Stockfish messages
      const messageHandler = (e: MessageEvent) => {
        if (moveFound) return;

        const line = e.data.trim();
        
        // Best move response format: "bestmove e2e4"
        if (line.startsWith('bestmove')) {
          moveFound = true;
          clearTimeout(timeoutId);
          stockfish.removeEventListener('message', messageHandler);
          
          const parts = line.split(' ');
          if (parts.length >= 2 && parts[1] !== '(none)') {
            const move = parts[1].toLowerCase();
            console.log('Stockfish best move:', move);
            resolve(move);
          } else {
            console.error('No move found in bestmove response:', line);
            resolve(null);
          }
        }
      };

      stockfish.addEventListener('message', messageHandler);
    });
  };

  // Make Stockfish move
  const makeStockfishMove = useCallback(async (currentFen: string) => {
    setIsThinking(true);
    
    try {
      console.log('=== Stockfish making move ===');
      console.log('Current FEN:', currentFen);
      
      // Get move from Stockfish engine
      const stockfishMoveUci = await getStockfishMove(currentFen, stockfishLevel);
      
      if (!stockfishMoveUci || stockfishMoveUci.length < 4) {
        console.error('No valid move from Stockfish');
        console.error('Stockfish returned:', stockfishMoveUci);
        setIsPlayerTurn(true);
        setIsThinking(false);
        return;
      }
      
      console.log('Stockfish returned UCI move:', stockfishMoveUci);
      
      // Parse UCI move: format is "e2e4" or "e7e8q" (from + to + optional promotion)
      const from = stockfishMoveUci.substring(0, 2);
      const to = stockfishMoveUci.substring(2, 4);
      const promotion = stockfishMoveUci.length === 5 ? stockfishMoveUci[4].toLowerCase() : undefined;
      
      console.log('Parsed move - from:', from, 'to:', to, 'promotion:', promotion || 'none');
      
      // Create game instance and apply move
      const tempGame = new Chess(currentFen);
      
      try {
        // Apply the move directly - chess.js handles castling correctly if FEN is correct
        const move = tempGame.move({
          from,
          to,
          promotion: promotion || undefined
        });
        
        if (!move) {
          console.error('Move returned null - invalid move');
          setIsPlayerTurn(true);
          setIsThinking(false);
          return;
        }
        
        const newFen = tempGame.fen();
        console.log('Move applied successfully:', move.san);
        console.log('Move flags:', move.flags);
        console.log('New FEN:', newFen);
        console.log('Next turn:', newFen.split(' ')[1]);
        
        // Update game state
        setGame(new Chess(newFen));
        setIsPlayerTurn(true);
        setIsThinking(false);
        
        // Check game status
        if (tempGame.isCheckmate()) {
          setGameStatus("checkmate");
          console.log('Checkmate!');
        } else if (tempGame.isStalemate()) {
          setGameStatus("stalemate");
          console.log('Stalemate!');
        } else {
          setGameStatus("playing");
        }
        
        console.log('=== Move complete ===');
        
      } catch (moveError) {
        console.error('Failed to apply move:', moveError);
        console.error('UCI move:', stockfishMoveUci);
        console.error('From:', from, 'To:', to);
        console.error('FEN:', currentFen);
        
        // Show legal moves for debugging
        const legalMoves = tempGame.moves({ verbose: true });
        console.error('Legal moves available:', legalMoves.map((m: any) => `${m.from}${m.to}${m.promotion || ''}`));
        
        setIsPlayerTurn(true);
        setIsThinking(false);
        return;
      }
      
    } catch (error) {
      console.error('Error in makeStockfishMove:', error);
      setIsPlayerTurn(true);
      setIsThinking(false);
    }
  }, [stockfishLevel]);

  // Handle player move
  function onDrop({ sourceSquare, targetSquare, piece }: { sourceSquare: string; targetSquare: string | null; piece: { pieceType: string } }) {
    if (!isPlayerTurn || isThinking || gameStatus !== "playing") return false;
    
    // Only allow white pieces to move, and must have a target square
    if (!targetSquare || piece.pieceType[0] !== 'w') return false;
    
    try {
      const tempGame = new Chess(game.fen());
      const move = tempGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q"
      });
      
      if (move) {
        setGame(new Chess(tempGame.fen()));
        setIsPlayerTurn(false);
        
        // Check game status
        if (tempGame.isCheckmate()) {
          setGameStatus("checkmate");
        } else if (tempGame.isStalemate()) {
          setGameStatus("stalemate");
        } else {
          setGameStatus("playing");
          // Make Stockfish move after a delay - use the updated FEN
          const updatedFen = tempGame.fen();
          setTimeout(() => {
            console.log('Triggering Stockfish move after player move');
            makeStockfishMove(updatedFen);
          }, 500);
        }
        
        return true;
      }
    } catch {
      // Invalid move
      return false;
    }
    
    return false;
  }

  // Reset game
  const resetGame = () => {
    setGame(new Chess());
    setIsPlayerTurn(true);
    setIsThinking(false);
    setGameStatus("playing");
  };

  return (
    <div className="flex flex-col items-center mt-8 px-4 w-full max-w-full overflow-x-hidden">
      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-[#00ff88] text-center">Chess vs Stockfish</h2>
      
      {/* Game Controls */}
      <div className="mb-4 flex flex-col items-center space-y-3 w-full max-w-md">
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <label className="text-white text-sm font-medium whitespace-nowrap">
            Stockfish Elo Rating:
          </label>
          <select
            value={stockfishLevel}
            onChange={(e) => setStockfishLevel(Number(e.target.value))}
            className="bg-neutral-700 text-white px-3 py-1 rounded-none border border-neutral-600 focus:border-neutral-500 focus:outline-none w-full sm:w-auto min-w-[120px]"
            disabled={!isPlayerTurn || isThinking}
          >
            {ELO_RATINGS.map((rating, index) => (
              <option key={index} value={index}>
                {rating.elo} Elo
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-none transition-colors text-sm font-medium w-full sm:w-auto"
          >
            New Game
          </button>
          
          <div className="text-sm text-neutral-300 text-center sm:text-left">
            {isThinking ? (
              <span className="text-[#00ff88]">🤖 Stockfish is thinking...</span>
            ) : isPlayerTurn ? (
              <span className="text-green-400">♟️ Your turn</span>
            ) : (
              <span className="text-blue-400">🤖 Stockfish's turn</span>
            )}
          </div>
        </div>
        
        {gameStatus !== "playing" && (
          <div className="text-center w-full">
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
      
      {/* Chess Board */}
      <div className="mb-4 w-full flex justify-center overflow-x-auto">
        <div className="w-full max-w-[min(100vw-2rem,500px)]">
          <Chessboard
            options={{
              position: game.fen(),
              onPieceDrop: onDrop,
              boardOrientation: "white",
              allowDragging: isPlayerTurn && !isThinking && gameStatus === "playing",
              boardStyle: {
                borderRadius: "0px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
              },
            }}
          />
        </div>
      </div>
      
      <div className="mt-4 text-center px-4 w-full max-w-md">
        <div className="text-gray-400 text-xs sm:text-sm mb-4">  
          Play as white against Stockfish! Drag pieces to move. 
          Choose your difficulty level and try to beat the computer.
        </div>
        
        {/* Lichess Challenge Button */}
        <a
          href="https://lichess.org/@/ZachRiley36"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-neutral-700 hover:bg-neutral-600 text-[#00ff88] font-medium rounded-none transition-all duration-300 w-full sm:w-auto text-sm sm:text-base"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span className="truncate">Challenge Me on Lichess</span>
          <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        
        <div className="mt-2 text-xs text-gray-500">
          Username: <span className="text-[#00ff88] font-medium">ZachRiley36</span>
        </div>
      </div>
    </div>
  );
}
