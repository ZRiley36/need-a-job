
"use client";

import { useState } from "react";
import { Home } from "@/app/components/pages/Home";
import { About } from "@/app/components/pages/About";
import { Projects } from "@/app/components/pages/Projects";
import { Contact } from "@/app/components/pages/Contact";
import { Games } from "@/app/components/pages/Games";

type PageKey = "Home" | "Resume" | "Projects" | "Games" | "Contact";

export default function HomePage() {
  const [activePage, setActivePage] = useState<PageKey>("Home");

  const renderPage = () => {
    switch (activePage) {
      case "Home":
        return <Home setActivePage={setActivePage} />;
      case "Resume":
        return <About />;
      case "Projects":
        return <Projects />;
      case "Games":
        return <Games />;
      case "Contact":
        return <Contact />;
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  const pageKeys: PageKey[] = ["Home", "Resume", "Projects", "Games", "Contact"];
  
  const pageDisplayNames: Record<PageKey, string> = {
    Home: "Home",
    Resume: "Resume",
    Projects: "Projects",
    Games: "Interests",
    Contact: "Contact",
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      {/* Header with improved typography */}
      <header className="bg-neutral-900 border-b border-neutral-700">
        <div className="container-custom py-8">
          <h1 className="heading-display text-center text-[#00ff88] animate-fade-in">
            Zach Riley
          </h1>
          <p className="text-center text-neutral-400 mt-2 body-lg animate-slide-up">
            Software Developer & Computer Science Graduate
          </p>
        </div>
      </header>

      {/* Enhanced Navigation */}
      <nav className="bg-neutral-800 border-b border-neutral-700 sticky top-0 z-50 backdrop-blur-sm bg-neutral-800/95">
        <div className="container-custom overflow-x-auto">
          <div className="flex justify-center min-w-max sm:min-w-0">
            <div className="flex space-x-1 bg-neutral-700/50 rounded-none p-1 my-4">
              {pageKeys.map((page) => (
                <button
                  key={page}
                  onClick={() => setActivePage(page)}
                  className={`px-3 sm:px-6 py-2 sm:py-3 rounded-none font-medium transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${
                    activePage === page 
                      ? "bg-neutral-700 text-[#00ff88]" 
                      : "text-neutral-300 hover:text-[#00ff88] hover:bg-neutral-600/50"
                  }`}
                >
                  {pageDisplayNames[page]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content with better spacing */}
      <main className="animate-fade-in">
        <div className={activePage === "Home" ? "" : "container-custom section-spacing"}>
          {renderPage()}
        </div>
      </main>
    </div>
  );
}