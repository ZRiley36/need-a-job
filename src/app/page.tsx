
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
    <div className="min-h-screen bg-dark">
      <header className="shadow p-6 text-7xl text-center text-default">
        Zach Riley 
      </header>

      <nav className="flex w-full bg-dark">
        {Object.keys(pageComponents).map((page) => (
          <button
            key={page}
            onClick={() => setActivePage(page as keyof typeof pageComponents)}
            className={`flex-1 px-6 py-3 font-medium transition-colors duration-200 ${
              activePage === page 
                ? "bg-light text-dark border-rich" 
                : "bg-dark border-transparent hover:bg-dark hover:text-white"
            }`}
          >
            {page}
          </button>
        ))}
      </nav>

      <main className="p-8 text-lg text-center">{pageComponents[activePage]}</main>
    </div>
  );
}