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
    <div className="relative w-full h-[calc(100svh-4rem)] overflow-hidden">
      <GlobeCanvas />

      {/* Vignette + bottom fade so the hero text stays readable over the globe. */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-neutral-950/90 via-neutral-950/50 to-transparent" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(75%_65%_at_50%_42%,transparent,rgba(8,10,13,0.5))]" />

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-6 pointer-events-none">
        <div className="flex flex-col items-center text-center gap-5 max-w-2xl">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tighter text-white drop-shadow-[0_2px_24px_rgba(8,10,13,0.95)]">
            Zach Riley
          </h1>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-none border border-accent/30 bg-accent/10 text-accent font-mono text-xs tracking-wider uppercase backdrop-blur">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Open to GIS, mapping &amp; clean-energy roles
          </span>
          <p className="text-neutral-200 body-base sm:text-lg leading-relaxed">
            Geospatial software engineer. I build pipelines and web maps that score flood, earthquake,
            and wildfire risk for every building in a city — and I want to point that at solar, grid,
            and clean-energy problems. Backend engineer at Dragin Technologies; previously Amazon.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pointer-events-auto">
            <button
              onClick={() => onNavigate("Projects")}
              className="btn-primary"
            >
              See the maps
            </button>
            <button
              onClick={() => onNavigate("Contact")}
              className="btn-secondary bg-neutral-950/40 backdrop-blur"
            >
              Get in touch
            </button>
          </div>
          <SocialLinks className="pointer-events-auto mt-1" />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 flex justify-center pointer-events-none">
        <svg className="w-5 h-5 text-neutral-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}
