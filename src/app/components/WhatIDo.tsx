import { PageKey } from "@/app/lib/nav";
import { VectorField } from "@/app/components/VectorField";

const CARDS = [
  {
    title: "Data Engineering",
    body: "Real-time ingestion pipelines — GTFS-RT transit feeds, Prefect-scheduled flows, FastAPI services, and Dockerized Postgres/Redis stacks.",
    tags: ["Python", "FastAPI", "Docker"],
  },
  {
    title: "Full-Stack Development",
    body: "End-to-end web apps with React front ends, Express / Node APIs, and PostgreSQL data layers — shipped and deployed.",
    tags: ["React", "Node", "PostgreSQL"],
  },
  {
    title: "ML & Data Analysis",
    body: "Web scraping, regression, and TF-IDF / KNN modeling to pull defensible findings out of messy real-world datasets.",
    tags: ["Pandas", "scikit-learn", "Selenium"],
  },
];

export function WhatIDo({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  return (
    <section className="relative bg-neutral-950 border-t border-neutral-800 overflow-hidden">
      <VectorField className="absolute inset-0 w-full h-full block opacity-60" />

      <div className="relative z-10 container-custom py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-[var(--accent)] mb-3">What I do</h2>
          <p className="text-neutral-400 body-base max-w-2xl mx-auto">
            A quick look at the kind of work I take on — each maps to a project you can explore.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 rounded-none p-6 hover:border-[var(--accent)]/50 transition-colors"
            >
              <h3 className="heading-sm text-white mb-3">{card.title}</h3>
              <p className="text-neutral-300 body-base leading-relaxed mb-4">{card.body}</p>
              <div className="flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-neutral-700/50 text-[var(--accent)] rounded-none text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate("Projects")}
            className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-600 text-neutral-200 font-medium rounded-none hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          >
            See all projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
