import { MAP_PROJECTS } from "@/app/lib/mapProjects";

const linkClass =
  "text-accent hover:text-accent-hover transition-colors";

const bulletClass = "flex items-start gap-3 text-neutral-300 body-base";

const bulletDot = (
  <span className="w-1.5 h-1.5 bg-accent rounded-none mt-2.5 flex-shrink-0" />
);

const Role = ({
  title,
  org,
  dates,
  children,
}: {
  title: string;
  org: string;
  dates: string;
  children: React.ReactNode;
}) => (
  <div className="card p-8">
    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4 gap-1">
      <div>
        <h3 className="heading-sm text-white">{title}</h3>
        <p className="text-accent font-medium">{org}</p>
      </div>
      <span className="text-neutral-400 body-sm">{dates}</span>
    </div>
    <ul className="space-y-3">{children}</ul>
  </div>
);

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li className={bulletClass}>
    {bulletDot}
    <span>{children}</span>
  </li>
);

export function About() {
  return (
    <div className="text-neutral-100">
      <div className="border-b border-neutral-800">
        <div className="container-custom py-12">
          <div className="text-center mb-2">
            <h1 className="heading-xl mb-4">Zach Riley</h1>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-neutral-300 body-base">
              <span>Brooklyn, NY</span>
              <span>(413) 992-8202</span>
              <a href="mailto:zachriley36@gmail.com" className={linkClass}>
                ZachRiley36@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/zdriley"
                className={linkClass}
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/zdriley
              </a>
              <a
                href="https://github.com/ZRiley36"
                className={linkClass}
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/ZRiley36
              </a>
              <a
                href="https://zachriley.dev"
                className={linkClass}
                target="_blank"
                rel="noopener noreferrer"
              >
                zachriley.dev
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-16 space-y-16">
        <section className="animate-slide-up">
          <h2 className="heading-lg text-white mb-6">Summary</h2>
          <p className="text-neutral-300 body-base leading-relaxed card p-8">
            Software engineer focused on geospatial data. I&apos;ve built end-to-end pipelines and
            static web maps that score flood, earthquake, and wildfire risk for every building in New
            York, San Francisco, and Los Angeles, validated against real outcomes. Backed by
            production backend and cloud experience at Dragin Technologies, CalMatters, and Amazon.
            Looking for GIS, mapping, solar, and clean-energy engineering roles.
          </p>
        </section>

        <section className="animate-slide-up">
          <h2 className="heading-lg text-white mb-6">Geospatial Projects</h2>
          <div className="space-y-6">
            {MAP_PROJECTS.map((p) => (
              <div key={p.slug} className="card p-8">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2 gap-1">
                  <h3 className="heading-sm text-white">{p.title}</h3>
                  <a href={p.liveUrl} className={`${linkClass} body-sm`} target="_blank" rel="noopener noreferrer">
                    Live map →
                  </a>
                </div>
                <p className="text-neutral-300 body-base leading-relaxed">{p.resumeBullet}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="animate-slide-up">
          <h2 className="heading-lg text-white mb-6">Experience</h2>
          <div className="space-y-8">
            <Role
              title="Backend Software Engineer"
              org="Dragin Technologies"
              dates="Jan 2026 – Present"
            >
              <Bullet>
                Containerized the AI underwriting agent and shipped local + production
                deployment; benchmarked against real payloads across 8 industries and
                drove the migration design review with leadership.
              </Bullet>
              <Bullet>
                Built a Transactions Integrity Report: ingests underwriting reports,
                cross-references merchant financial history and transaction patterns,
                and flags profile/spending discrepancies for the risk team's manual
                review queue.
              </Bullet>
              <Bullet>
                Shipped the SSN-free credit check feature end-to-end: Experian
                integration via CRS, full test coverage, results piped to S3 +
                Salesforce; live in production across 4 underwriting flows.
              </Bullet>
              <Bullet>
                Designed and shipped a CloudWatch → S3 → Athena logging pipeline
                replacing ad-hoc Docker logs; gave engineers queryable production
                logs without SSH and cut MTTR from ~45 min to &lt;10 min.
              </Bullet>
              <Bullet>
                Migrating our email reader service from ECS to Kubernetes on AWS
                EKS; owning deployment manifests, service topology, ingress
                rules, and cutover strategy.
              </Bullet>
            </Role>

            <Role
              title="Software Engineering Fellow"
              org="Digital Democracy, CalMatters"
              dates="Jun 2023 – Jun 2024"
            >
              <Bullet>
                Designed and shipped 20+ Flask API endpoints powering daily
                CalMatters legislative tracking; backed by Postgres + Neo4j and
                relied on by journalists across the newsroom.
              </Bullet>
              <Bullet>
                Migrated highest-traffic legislative-data lookups from SQL to
                Neo4j Cypher, cutting p95 latency 45%.
              </Bullet>
              <Bullet>
                Built a voting-pattern analysis pipeline in Pandas + scikit-learn;
                output fed 12+ tipsheets published in CalMatters and partner
                newsrooms statewide.
              </Bullet>
            </Role>

            <Role
              title="Software Development Intern"
              org="Amazon"
              dates="Mar 2021 – Jun 2022"
            >
              <Bullet>
                Built a distributed stress-testing platform sustaining 10K+
                simulated package requests per minute; used by the last-mile
                routing team to validate new allocation algorithms before launch.
              </Bullet>
              <Bullet>
                Shipped an S3 + ElasticSearch + Glue log-querying tool adopted by
                10+ engineers across the delivery org; replaced ad-hoc SSH + grep
                workflows on production incidents.
              </Bullet>
            </Role>
          </div>
        </section>

        <section className="animate-slide-up">
          <h2 className="heading-lg text-white mb-6">Other Projects</h2>
          <div className="space-y-6">
            <div className="card p-8">
              <h3 className="heading-sm text-white mb-2">
                NYC Transit Analytics
              </h3>
              <p className="text-neutral-300 body-base leading-relaxed">
                Built a data-engineering platform that ingests real-time MTA
                GTFS-RT feeds on a Prefect schedule, persists them to PostgreSQL
                with raw payloads archived to S3 / GCS, and serves them through a
                Dockerized FastAPI stack.
              </p>
            </div>
            <div className="card p-8">
              <h3 className="heading-sm text-white mb-2">
                Ultimate Frisbee Media Bias
              </h3>
              <p className="text-neutral-300 body-base leading-relaxed">
                Scraped 100+ articles via Selenium and ran them through a
                scikit-learn classification pipeline measuring systematic
                coverage skew by team and region.
              </p>
            </div>
          </div>
        </section>

        <section className="animate-slide-up">
          <h2 className="heading-lg text-white mb-6">
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="card p-6">
              <h3 className="eyebrow mb-2">Geospatial</h3>
              <p className="text-neutral-300 body-base">
                GeoPandas, Shapely 2 (STRtree), rasterio, rasterstats, pyproj, GeoParquet,
                Cloud-Optimized GeoTIFF, MapLibre GL, PMTiles, tippecanoe, spatial
                cross-validation, ArcGIS FeatureServer / DataSF APIs
              </p>
            </div>
            <div className="card p-6">
              <h3 className="eyebrow mb-2">Spatial data</h3>
              <p className="text-neutral-300 body-base">
                USGS 3DEP DEM and ShakeMap, LANDFIRE fuels, FEMA flood zones, CGS seismic
                hazard zones, Census / ACS, building footprints and assessor parcels
              </p>
            </div>
            <div className="card p-6">
              <h3 className="eyebrow mb-2">Languages</h3>
              <p className="text-neutral-300 body-base">
                Python, TypeScript / JavaScript, SQL, Java
              </p>
            </div>
            <div className="card p-6">
              <h3 className="eyebrow mb-2">AI / ML</h3>
              <p className="text-neutral-300 body-base">
                LLM orchestration, agent design, RAG, evals, AWS Bedrock +
                AgentCore, Pandas, scikit-learn
              </p>
            </div>
            <div className="card p-6">
              <h3 className="eyebrow mb-2">
                Infrastructure
              </h3>
              <p className="text-neutral-300 body-base">
                AWS (Lambda, ECS, EKS, S3, CloudWatch, Athena, Glue, Secrets
                Manager, Bedrock, ElasticSearch), Docker, Kubernetes, Postgres,
                Neo4j
              </p>
            </div>
          </div>
        </section>

        <section className="animate-slide-up">
          <h2 className="heading-lg text-white mb-6">Education</h2>
          <div className="card p-8">
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
              <div>
                <h3 className="heading-sm text-white">
                  California Polytechnic State University, San Luis Obispo
                </h3>
                <p className="text-accent font-medium">
                  B.S. Computer Science, Minor in Philosophy
                </p>
              </div>
              <span className="text-neutral-400 body-sm">Jun 2024</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
