import { useState } from "react";
import ChessBoard from "../Games Folder/Chess";
import Snake from "../Games Folder/Snake";
import Tetris from "@/app/components/Games Folder/Tetris";

const games = [
  { name: "Chess", component: <ChessBoard /> },
  { name: "Snake", component: <Snake /> },
  { name: "Tetris", component: <Tetris /> },
];

export function Games() {
  const [index, setIndex] = useState(0);

  function prev() {
    setIndex((i) => (i - 1 + games.length) % games.length);
  }

  function next() {
    setIndex((i) => (i + 1) % games.length);
  }

  return (
    <div className="bg-neutral-900 text-neutral-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-neutral-800 to-neutral-900 border-b border-neutral-700">
        <div className="container-custom py-12">
          <div className="text-center mb-8">
            <h1 className="heading-xl purple-text-gradient mb-4">Interactive Games</h1>
            <p className="text-neutral-400 body-base">Play chess, snake, or tetris - built with React and TypeScript</p>
          </div>
        </div>
      </div>

      <div className="container-custom py-16">
        {/* Navigation matching the main nav style */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-1 bg-neutral-700/50 rounded-lg p-1">
            {games.map((g, i) => (
              <button
                key={g.name}
                onClick={() => setIndex(i)}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-105 ${
                  index === i
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25 purple-glow"
                    : "text-neutral-300 hover:text-white hover:bg-neutral-600/50 hover:shadow-primary-500/10"
                }`}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>

        {/* Game Display Area */}
        <div className="w-full min-h-[70vh] flex items-center justify-center bg-neutral-800/30 rounded-xl border border-neutral-700 p-8">
          <div className="animate-fade-in">
            {games[index].component}
          </div>
        </div>

        {/* Game Info */}
        <div className="mt-8 text-center">
          <h2 className="heading-md text-white mb-2">{games[index].name}</h2>
          <p className="text-neutral-400 body-base">
            {index === 0 && "Play chess with drag-and-drop pieces. Click or drag to move."}
            {index === 1 && "Classic snake game. Use arrow keys to control the snake."}
            {index === 2 && "Tetris puzzle game. Arrange falling blocks to clear lines."}
          </p>
        </div>
      </div>
    </div>
  );
}
