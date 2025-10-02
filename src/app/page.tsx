
"use client";

import { useState } from "react";
import { Home } from "@/app/components/pages/Home";
import { About } from "@/app/components/pages/About";
import { Projects } from "@/app/components/pages/Projects";
import { Contact } from "@/app/components/pages/Contact";
import { Games } from "@/app/components/pages/Games";

const pageComponents = {
  Home: <Home />,
  Resume: <About />,
  Projects: <Projects />,
  Games: <Games />,
  Contact: <Contact />,
};

export default function HomePage() {
  const [activePage, setActivePage] = useState<keyof typeof pageComponents>("Home");

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      {/* Header with improved typography */}
      <header className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 border-b border-neutral-700">
        <div className="container-custom py-8">
          <h1 className="heading-display text-center text-primary-400 animate-fade-in">
            Zach Riley
          </h1>
          <p className="text-center text-neutral-400 mt-2 body-lg animate-slide-up">
            Software Developer & Computer Science Graduate
          </p>
        </div>
      </header>

      {/* Enhanced Navigation */}
      <nav className="bg-neutral-800 border-b border-neutral-700 sticky top-0 z-50 backdrop-blur-sm bg-neutral-800/95">
        <div className="container-custom">
          <div className="flex justify-center">
            <div className="flex space-x-1 bg-neutral-700/50 rounded-lg p-1 my-4">
              {Object.keys(pageComponents).map((page) => (
                <button
                  key={page}
                  onClick={() => setActivePage(page as keyof typeof pageComponents)}
                  className={`px-6 py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-105 ${
                    activePage === page 
                      ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25" 
                      : "text-neutral-300 hover:text-white hover:bg-neutral-600/50"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content with better spacing */}
      <main className="animate-fade-in">
        <div className={activePage === "Home" ? "" : "container-custom section-spacing"}>
          {pageComponents[activePage]}
        </div>
      </main>
    </div>
  );
}