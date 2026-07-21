"use client";

import dynamic from "next/dynamic";
import { SocialLinks } from "@/app/components/SocialLinks";
import { PageKey } from "@/app/lib/nav";

// WebGL globe is browser-only — keep it out of the server/initial bundle.
const GlobeCanvas = dynamic(
  () => import("@/app/components/GlobeCanvas").then((m) => m.GlobeCanvas),
  { ssr: false, loading: () => null },
);

export function Hero({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  return (
    <div className="relative w-full h-[calc(100vh-5rem)] bg-neutral-950 overflow-hidden">
      <GlobeCanvas />

      {/* Vignette + bottom fade so the hero text stays readable over the globe. */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-neutral-950 via-neutral-950/55 to-neutral-950/10" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(75%_65%_at_50%_42%,transparent,rgba(10,10,10,0.7))]" />

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-6 pointer-events-none">
        <div className="flex flex-col items-center text-center gap-5 max-w-2xl">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-[0_2px_20px_rgba(10,10,10,0.9)]">
            Zach Riley
          </h1>
          <span className="inline-flex items-center gap-2 px-3 py-1 border border-[var(--accent)]/40 text-[var(--accent)] text-xs tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            Open to software roles
          </span>
          <p className="text-neutral-300 body-base sm:text-lg leading-relaxed">
            Software developer and CS grad — formerly Amazon and Digital Democracy — building
            data pipelines, full-stack apps, and tools that turn messy data into answers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pointer-events-auto">
            <button
              onClick={() => onNavigate("Projects")}
              className="px-6 py-3 bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-hover)] transition-colors"
            >
              View Projects
            </button>
            <button
              onClick={() => onNavigate("Contact")}
              className="px-6 py-3 border border-neutral-600 text-neutral-200 font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              Get in touch
            </button>
          </div>
          <SocialLinks className="pointer-events-auto mt-1" />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 flex justify-center pointer-events-none">
        <svg className="w-5 h-5 text-neutral-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}
