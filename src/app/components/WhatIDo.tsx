import { PageKey } from "@/app/lib/nav";

const CARDS = [
  {
    title: "Geospatial Analysis",
    body: "Building-level spatial joins, raster sampling, and CRS-aware pipelines over hundreds of thousands of footprints, parcels, and hazard layers — reproducible with one command.",
    tags: ["GeoPandas", "Shapely 2", "rasterio", "GeoParquet"],
  },
  {
    title: "Web Mapping",
    body: "Static, backend-free MapLibre GL maps served from PMTiles and Cloud-Optimized GeoTIFFs, with address search and guide pages generated from the same data as the analysis.",
    tags: ["MapLibre GL", "PMTiles", "COG", "tippecanoe"],
  },
  {
    title: "Spatial Modeling & Validation",
    body: "Spatial cross-validation, leakage checks, and sensitivity analysis, ground-truthed against what actually happened — 311 flood complaints, post-fire damage inspections.",
    tags: ["scikit-learn", "Spatial CV", "Pandas"],
  },
  {
    title: "Cloud & Data Infrastructure",
    body: "Production backend work on AWS — ingestion pipelines, containerized services on EKS / Kubernetes, and queryable logging with CloudWatch, S3, and Athena.",
    tags: ["AWS", "Docker", "Kubernetes", "PostgreSQL"],
  },
];

export function WhatIDo({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  return (
    <section className="relative border-t border-neutral-800/80">
      <div className="container-custom py-16 md:py-20">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">What I do</p>
          <h2 className="heading-xl mb-4">Maps for the energy transition</h2>
          <p className="text-neutral-300 body-lg">
            The same toolkit that scores hazard exposure for buildings answers clean-energy questions:
            solar siting and rooftop potential, land and interconnection screening, and the climate
            risk facing grid assets.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="card p-6 bg-neutral-900/80 backdrop-blur-sm hover:border-neutral-500 transition-colors"
            >
              <h3 className="heading-sm text-white mb-3">{card.title}</h3>
              <p className="text-neutral-300 body-base leading-relaxed mb-4">{card.body}</p>
              <div className="flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="chip"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <button
            onClick={() => onNavigate("Projects")}
            className="btn-secondary"
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
