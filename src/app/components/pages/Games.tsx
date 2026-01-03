"use client";

import { useState, useEffect } from "react";
import ChessBoard from "../Games Folder/Chess";
import Snake from "../Games Folder/Snake";
import Tetris from "@/app/components/Games Folder/Tetris";

interface Book {
  title: string;
  coverUrl: string;
  author: string;
  link: string;
}

const games = [
  { name: "Chess", component: <ChessBoard /> },
  { name: "Snake", component: <Snake /> },
  { name: "Tetris", component: <Tetris /> },
];

export function Games() {
  const [index, setIndex] = useState(0);
  const [books, setBooks] = useState<Book[]>([]);
  const [loadingBooks, setLoadingBooks] = useState(true);

  useEffect(() => {
    // Fetch books from Goodreads API
    fetch('/api/goodreads')
      .then(res => res.json())
      .then(data => {
        if (data.books) {
          setBooks(data.books);
        }
        setLoadingBooks(false);
      })
      .catch(err => {
        console.error('Error fetching books:', err);
        setLoadingBooks(false);
      });
  }, []);

  function prev() {
    setIndex((i) => (i - 1 + games.length) % games.length);
  }

  function next() {
    setIndex((i) => (i + 1) % games.length);
  }

  return (
    <div className="bg-neutral-900 text-neutral-100">
      {/* Header Section */}
      <div className="bg-neutral-800 border-b border-neutral-700">
        <div className="container-custom py-12">
          <div className="text-center mb-8">
            <h1 className="heading-xl text-[#00ff88] mb-4">Interests</h1>
            <p className="text-neutral-400 body-base">Games, reading, and ultimate frisbee</p>
          </div>
        </div>
      </div>

      <div className="container-custom py-16 space-y-16">
        {/* Goodreads Section */}
        <section className="animate-slide-up">
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-none p-8">
            <h2 className="heading-lg text-[#00ff88] mb-4">Reading</h2>
            <p className="text-neutral-300 body-base mb-6">
              I love reading across a variety of genres, from science fiction to philosophy. Check out my reading progress and reviews on Goodreads.
            </p>
            
            {loadingBooks ? (
              <p className="text-neutral-400 body-sm">Loading recent books...</p>
            ) : books.length > 0 ? (
              <div className="mb-6">
                <h3 className="text-white font-medium mb-4 body-base">Recently Read</h3>
                <div className="flex flex-wrap gap-4">
                  {books.map((book, idx) => (
                    <a
                      key={idx}
                      href={book.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <div className="w-24 h-36 bg-neutral-700/50 rounded-none border border-neutral-600 overflow-hidden hover:border-[#00ff88] transition-colors">
                        {book.coverUrl ? (
                          <img
                            src={book.coverUrl}
                            alt={book.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            onError={(e) => {
                              console.error('Failed to load image:', book.coverUrl, book.title);
                              // Show placeholder on error
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="150"%3E%3Crect width="100" height="150" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="10"%3E' + encodeURIComponent(book.title.substring(0, 15)) + '%3C/text%3E%3C/svg%3E';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs">
                            No Cover
                          </div>
                        )}
                      </div>
                      {book.title && (
                        <p className="text-neutral-400 text-xs mt-2 max-w-[6rem] truncate group-hover:text-[#00ff88] transition-colors">
                          {book.title}
                        </p>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
            
            <a 
              href="https://www.goodreads.com/user/show/113257878-zach-riley" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#00ff88] hover:text-[#00cc6a] underline transition-colors"
            >
              View my Goodreads profile →
            </a>
          </div>
        </section>

        {/* Ultimate Frisbee Section */}
        <section className="animate-slide-up">
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-none p-8">
            <h2 className="heading-lg text-[#00ff88] mb-4">Ultimate Frisbee</h2>
            <p className="text-neutral-300 body-base">
              I'm passionate about ultimate frisbee and have played competitively. The sport combines athleticism, strategy, and the spirit of the game in a unique way that I find incredibly engaging.
            </p>
          </div>
        </section>

        {/* Games Section */}
        <section className="animate-slide-up">
          <div>
            <h2 className="heading-lg text-[#00ff88] mb-6 text-center">Interactive Games</h2>
            <p className="text-neutral-400 body-base text-center mb-8">Play chess, snake, or tetris - built with React and TypeScript</p>
            {/* Navigation matching the main nav style */}
            <div className="flex justify-center mb-12 overflow-x-auto">
              <div className="flex space-x-1 bg-neutral-700/50 rounded-none p-1 min-w-max">
                {games.map((g, i) => (
                  <button
                    key={g.name}
                    onClick={() => setIndex(i)}
                    className={`px-3 sm:px-6 py-2 sm:py-3 rounded-none font-medium transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${
                      index === i
                        ? "bg-neutral-700 text-[#00ff88]"
                        : "text-neutral-300 hover:text-[#00ff88] hover:bg-neutral-600/50"
                    }`}
                  >
                    {g.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Game Display Area */}
            <div className="w-full min-h-[70vh] flex items-center justify-center bg-neutral-800/30 rounded-none border border-neutral-700 p-8">
              <div className="animate-fade-in">
                {games[index].component}
              </div>
            </div>

            {/* Game Info */}
            <div className="mt-8 text-center">
              <h3 className="heading-md text-white mb-2">{games[index].name}</h3>
              <p className="text-neutral-400 body-base">
                {index === 0 && "Play chess with drag-and-drop pieces. Click or drag to move."}
                {index === 1 && "Classic snake game. Use arrow keys to control the snake."}
                {index === 2 && "Tetris puzzle game. Arrange falling blocks to clear lines."}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
