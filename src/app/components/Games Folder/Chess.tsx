"use client";

import { useState, useCallback } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function ChessBoard() {
  const [game, setGame] = useState(() => new Chess());
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [isThinking, setIsThinking] = useState(false);
  const [stockfishLevel, setStockfishLevel] = useState(1);
  const [gameStatus, setGameStatus] = useState<"playing" | "checkmate" | "stalemate">("playing");

  // Get Stockfish move from Lichess API
  // API returns: {fen: '...', knodes: number, depth: number, pvs: Array(1)}
  // pvs[0].moves contains the move sequence in UCI format
  const getStockfishMove = async (fen: string, level: number): Promise<string | null> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    try {
      console.log('Calling Lichess cloud eval API with FEN:', fen);
      const response = await fetch(`https://lichess.org/api/cloud-eval?fen=${encodeURIComponent(fen)}&multiPv=1&depth=15`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        console.error('Lichess cloud eval API returned error:', response.status, response.statusText);
        return null;
      }
      
      const data = await response.json();
      console.log('API response:', data);
      
      // API format: {fen: '...', knodes: number, depth: number, pvs: Array(1)}
      if (data && data.pvs && Array.isArray(data.pvs) && data.pvs.length > 0) {
        const pv = data.pvs[0];
        
        // pvs[0] should have a 'moves' array with UCI format moves
        if (pv.moves && Array.isArray(pv.moves) && pv.moves.length > 0) {
          const move = pv.moves[0];
          
          // Move should be a string in UCI format (e.g., "e2e4" or "e7e8q")
          if (typeof move === 'string' && (move.length === 4 || move.length === 5)) {
            console.log('Got move from API:', move, 'depth:', data.depth, 'knodes:', data.knodes);
            return move.toLowerCase();
          } else {
            console.error('Invalid move format from API:', move, typeof move);
          }
        } else {
          console.error('No moves in pvs[0]:', pv);
        }
      } else {
        console.error('Invalid API response structure:', data);
      }
      
      return null;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        console.error('API request timed out after 30 seconds');
      } else {
        console.error('Error calling Lichess API:', error);
      }
      return null;
    }
  };

  // Make Stockfish move
  const makeStockfishMove = useCallback(async (currentFen: string) => {
    setIsThinking(true);
    
    try {
      console.log('=== Stockfish making move ===');
      console.log('Current FEN:', currentFen);
      
      // Get move from API
      const stockfishMoveUci = await getStockfishMove(currentFen, stockfishLevel);
      
      if (!stockfishMoveUci || stockfishMoveUci.length < 4) {
        console.error('No valid move from API');
        console.error('API returned:', stockfishMoveUci);
        setIsPlayerTurn(true);
        setIsThinking(false);
        return;
      }
      
      console.log('API returned UCI move:', stockfishMoveUci);
      
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
      
      {/* Chess Board */}
      <div className="mb-4">
        <Chessboard
          options={{
            position: game.fen(),
            onPieceDrop: onDrop,
            boardOrientation: "white",
            allowDragging: isPlayerTurn && !isThinking && gameStatus === "playing",
            boardStyle: {
              borderRadius: "4px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
            },
          }}
        />
      </div>
      
      <div className="mt-4 text-center">
        <div className="text-gray-400 text-sm mb-4">
          Play as white against Stockfish! Drag pieces to move. 
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
