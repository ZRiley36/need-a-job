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
      <h1 className="text-3xl font-semibold text-white">Zach Riley</h1>
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
    <div className="relative isolate min-h-screen text-neutral-100 flex flex-col">
      {/* NASA Black Marble (Earth at night) behind everything, darkened so text keeps its contrast. */}
      <div aria-hidden="true" className="fixed inset-0 -z-10 bg-neutral-950">
        <div className="absolute inset-0 bg-[url('/earth-at-night.jpg')] bg-cover bg-center opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/40 to-neutral-950/80" />
      </div>
      <nav className="sticky top-0 z-50 bg-neutral-950/75 border-b border-neutral-800/80 backdrop-blur-xl">
        <div className="container-custom h-16 flex items-center justify-between gap-4">
          <button
            onClick={() => setActivePage("Home")}
            aria-label="Home"
            className="flex items-center gap-2.5 shrink-0 text-white font-semibold tracking-tight"
          >
            <span className="grid place-items-center w-7 h-7 rounded-none bg-accent text-on-accent text-xs font-bold">
              ZR
            </span>
            <span className="hidden sm:inline">Zach Riley</span>
          </button>
          <div className="flex items-center gap-1 overflow-x-auto">
            {pageKeys.map((page) => (
              <button
                key={page}
                onClick={() => setActivePage(page)}
                aria-current={activePage === page ? "page" : undefined}
                className={`px-3 py-1.5 rounded-none text-sm font-medium whitespace-nowrap transition-colors ${
                  activePage === page
                    ? "bg-white text-neutral-950"
                    : "text-neutral-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {page}
              </button>
            ))}
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
