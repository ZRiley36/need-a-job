import { PageKey } from "@/app/lib/nav";

const CARDS = [
  {
    title: "AI Agent Infrastructure",
    body: "Containerizing and shipping production LLM agents on AWS Bedrock and AgentCore — multi-step reasoning over real business data, deployed on EKS / Kubernetes with observability from day one.",
    tags: ["Bedrock", "AgentCore", "Kubernetes"],
  },
  {
    title: "Data Engineering",
    body: "Real-time ingestion pipelines — GTFS-RT transit feeds, Prefect-scheduled flows, FastAPI services, and Dockerized Postgres/Redis stacks, moving to Kubernetes for production workloads.",
    tags: ["Python", "FastAPI", "Docker", "Kubernetes"],
  },
  {
    title: "Cloud & Observability",
    body: "Production backend work on AWS — containerized services on EKS / Kubernetes, and queryable logging with CloudWatch, S3, and Athena.",
    tags: ["AWS", "CloudWatch", "Athena", "PostgreSQL"],
  },
  {
    title: "Geospatial & ML Analysis",
    body: "Building-level spatial pipelines and models validated against what actually happened — flood complaints and post-fire damage inspections — shipped as static web maps.",
    tags: ["GeoPandas", "scikit-learn", "MapLibre GL"],
  },
];

export function WhatIDo({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  return (
    <section className="relative border-t border-neutral-800/80">
      <div className="container-custom py-16 md:py-20">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">What I do</p>
          <h2 className="heading-xl mb-4">Backend &amp; AI infrastructure</h2>
          <p className="text-neutral-300 body-lg">
            A quick look at the kind of work I take on — each maps to a project you can explore.
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
