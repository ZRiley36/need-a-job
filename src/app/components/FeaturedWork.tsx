import { PageKey } from "@/app/lib/nav";
import { MAP_PROJECTS } from "@/app/lib/mapProjects";

type Featured = {
  title: string;
  blurb: string;
  tags: string[];
  links: { label: string; href: string; primary?: boolean }[];
};

const FEATURED: Featured[] = [
  {
    title: "NYC Apartment Hunt",
    blurb:
      "A LangGraph pipeline that pulls new rentals twice a day, filters and de-duplicates them in code, and has a Claude Haiku agent vet each listing for scams and amenities as structured output.",
    tags: ["LangGraph", "Claude", "Pydantic", "GitHub Actions"],
    links: [],
  },
  {
    title: "NYC Transit Analytics",
    blurb:
      "Real-time MTA GTFS-RT ingestion on a Prefect schedule, persisted to PostgreSQL with raw payloads archived to S3 / GCS, served through a Dockerized FastAPI stack.",
    tags: ["Python", "FastAPI", "Prefect", "PostgreSQL"],
    links: [{ label: "Code", href: "https://github.com/ZRiley36/NYCTransitAnalytics", primary: true }],
  },
  {
    title: "Building-level risk maps",
    blurb:
      "Three end-to-end pipelines that score flood, earthquake, and wildfire risk for every building in NYC, SF, and LA, validated against real outcomes and shipped as static web maps.",
    tags: ["GeoPandas", "scikit-learn", "PMTiles", "MapLibre GL"],
    links: MAP_PROJECTS.map((p) => ({ label: p.title.split(" ")[0] + " map", href: p.liveUrl })),
  },
];

export function FeaturedWork({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  return (
    <section>
      <div className="container-custom py-16 md:py-20">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">Selected work</p>
          <h2 className="heading-xl mb-4">Agents, pipelines, and the data behind them</h2>
          <p className="text-neutral-300 body-lg">
            Side projects that mirror the day job: LLM agents with structured output, real-time
            ingestion, and data pipelines that run end to end.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {FEATURED.map((p) => (
            <article
              key={p.title}
              className="card flex flex-col p-6 hover:border-neutral-500 transition-colors"
            >
              <h3 className="heading-sm text-white mb-2">{p.title}</h3>
              <p className="text-neutral-400 body-sm mb-5">{p.blurb}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {p.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap gap-3">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${l.primary ? "btn-primary" : "btn-secondary"} text-sm px-4 py-2`}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <button
            onClick={() => onNavigate("Projects")}
            className="inline-flex items-center gap-2 text-neutral-300 hover:text-accent font-medium transition-colors"
          >
            How each one was built
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
