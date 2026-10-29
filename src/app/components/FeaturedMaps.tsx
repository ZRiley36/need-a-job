import { PageKey } from "@/app/lib/nav";
import { MAP_PROJECTS } from "@/app/lib/mapProjects";

export function FeaturedMaps({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  return (
    <section>
      <div className="container-custom py-16 md:py-20">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">Selected work</p>
          <h2 className="heading-xl mb-4">Building-level risk maps</h2>
          <p className="text-neutral-300 body-lg">
            Three end-to-end geospatial projects — public data in, validated analysis and a live web
            map out. Flood, earthquake, and wildfire, scored for every building.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {MAP_PROJECTS.map((p) => (
            <article
              key={p.slug}
              className="card flex flex-col p-6 hover:border-neutral-500 transition-colors"
            >
              <h3 className="heading-sm text-white mb-2">{p.title}</h3>
              <p className="text-neutral-400 body-sm mb-5">{p.question}</p>

              <dl className="grid grid-cols-3 gap-2 mb-5">
                {p.stats.map((s) => (
                  <div key={s.label} className="bg-neutral-950/60 border border-neutral-700/70 rounded-none p-2.5">
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="font-mono text-accent font-semibold text-lg leading-tight">{s.value}</dd>
                    <dd className="text-neutral-400 text-xs leading-snug mt-1">{s.label}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-wrap gap-2 mb-6">
                {p.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap gap-3">
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm px-4 py-2"
                >
                  Open live map
                </a>
                <a
                  href={p.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm px-4 py-2"
                >
                  Code
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <button
            onClick={() => onNavigate("Projects")}
            className="inline-flex items-center gap-2 text-neutral-300 hover:text-accent font-medium transition-colors"
          >
            Methods, findings &amp; what went wrong
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
