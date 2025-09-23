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
    <div className="flex flex-col items-center w-full">
      <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
        {games.map((g, i) => (
          <button
            key={g.name}
            onClick={() => setIndex(i)}
            className={`px-4 py-2 rounded border transition-colors duration-150 ${
              index === i
                ? "bg-light text-dark border-rich"
                : "bg-dark text-light border-accent hover:bg-light/10"
            }`}
          >
            {g.name}
          </button>
        ))}
      </div>

      <div className="w-full min-h-[70vh] flex items-center justify-center">
        {games[index].component}
      </div>
    </div>
  );
}
