"use client";

import { useState } from "react";
import { Home } from "@/app/components/pages/Home";
import { About } from "@/app/components/pages/About";
import { Projects } from "@/app/components/pages/Projects";
import { Contact } from "@/app/components/pages/Contact";
import { Footer } from "@/app/components/Footer";
import { PageKey } from "@/app/lib/nav";

/** Set to true to put the site into maintenance mode. */
const SITE_DOWN = false;

function MaintenancePage() {
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col items-center justify-center px-6">
      <h1 className="text-3xl font-semibold text-[var(--accent)]">Zach Riley</h1>
      <p className="mt-4 text-neutral-400 text-center max-w-md">
        This site is temporarily offline. Check back later.
      </p>
    </div>
  );
}

function SiteContent() {
  const [activePage, setActivePage] = useState<PageKey>("Home");

  const renderPage = () => {
    switch (activePage) {
      case "Home":
        return <Home onNavigate={setActivePage} />;
      case "Resume":
        return <About />;
      case "Projects":
        return <Projects />;
      case "Contact":
        return <Contact />;
      default:
        return <Home onNavigate={setActivePage} />;
    }
  };

  const pageKeys: PageKey[] = ["Home", "Resume", "Projects", "Contact"];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      <nav className="relative bg-neutral-900/80 border-b border-neutral-800 sticky top-0 z-50 backdrop-blur">
        <button
          onClick={() => setActivePage("Home")}
          aria-label="Home"
          className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 hidden sm:block text-[var(--accent)] text-lg font-bold tracking-wider hover:text-[var(--accent-hover)] transition-colors"
        >
          ZR
        </button>
        <div className="container-custom overflow-x-auto">
          <div className="flex justify-center min-w-max sm:min-w-0">
            <div className="flex space-x-1 bg-neutral-700/50 rounded-none p-1 my-4">
              {pageKeys.map((page) => (
                <button
                  key={page}
                  onClick={() => setActivePage(page)}
                  className={`px-3 sm:px-6 py-2 sm:py-3 rounded-none font-medium transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${
                    activePage === page
                      ? "bg-neutral-700 text-[var(--accent)]"
                      : "text-neutral-300 hover:text-[var(--accent)] hover:bg-neutral-600/50"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="animate-fade-in flex-1">
        <div className={activePage === "Home" ? "" : "container-custom section-spacing"}>
          {renderPage()}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function HomePage() {
  return SITE_DOWN ? <MaintenancePage /> : <SiteContent />;
}
