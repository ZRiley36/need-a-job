const linkClass =
  "text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors";

const dotClass = "text-neutral-600";

const bulletClass = "flex items-start gap-3 text-neutral-300 body-base";

const bulletDot = (
  <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-none mt-2.5 flex-shrink-0" />
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
  <div className="bg-neutral-800/50 border border-neutral-700 p-8">
    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4 gap-1">
      <div>
        <h3 className="heading-sm text-white">{title}</h3>
        <p className="text-[var(--accent)] font-medium">{org}</p>
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
    <div className="bg-neutral-900 text-neutral-100">
      <div className="bg-neutral-800 border-b border-neutral-700">
        <div className="container-custom py-12">
          <div className="text-center mb-2">
            <h1 className="heading-xl text-[var(--accent)] mb-4">Zach Riley</h1>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-neutral-300 body-base">
              <span>Brooklyn, NY</span>
              <span className={dotClass}>·</span>
              <span>(413) 992-8202</span>
              <span className={dotClass}>·</span>
              <a href="mailto:zachriley36@gmail.com" className={linkClass}>
                ZachRiley36@gmail.com
              </a>
              <span className={dotClass}>·</span>
              <a
                href="https://linkedin.com/in/zdriley"
                className={linkClass}
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/zdriley
              </a>
              <span className={dotClass}>·</span>
              <a
                href="https://github.com/ZRiley36"
                className={linkClass}
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/ZRiley36
              </a>
              <span className={dotClass}>·</span>
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
          <h2 className="heading-lg text-[var(--accent)] mb-6">Experience</h2>
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
                Migrated 10+ secret categories from .env files into AWS Secrets
                Manager across dev / beta / prod; wrote rotation Lambdas and
                eliminated plaintext credentials from version control.
              </Bullet>
            </Role>

            <Role
              title="Software Engineering Fellow"
              org="Digital Democracy · CalMatters"
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
          <h2 className="heading-lg text-[var(--accent)] mb-6">Projects</h2>
          <div className="space-y-6">
            <div className="bg-neutral-800/50 border border-neutral-700 p-8">
              <h3 className="heading-sm text-white mb-2">
                California Legislature Financial Transactions
              </h3>
              <p className="text-neutral-300 body-base leading-relaxed">
                Designed a relational database mapping money flows between
                legislators, lobbyists, and organizations; surfaced patterns
                linking political relationships to funding using SQL analytics on
                top of CalAccess data.
              </p>
            </div>
            <div className="bg-neutral-800/50 border border-neutral-700 p-8">
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
          <h2 className="heading-lg text-[var(--accent)] mb-6">
            Technical Skills
          </h2>
          <div className="space-y-4">
            <div className="bg-neutral-800/50 border border-neutral-700 p-6">
              <h3 className="text-[var(--accent)] font-medium mb-2">Languages</h3>
              <p className="text-neutral-300 body-base">
                Python, TypeScript / JavaScript, SQL, Java
              </p>
            </div>
            <div className="bg-neutral-800/50 border border-neutral-700 p-6">
              <h3 className="text-[var(--accent)] font-medium mb-2">AI / ML</h3>
              <p className="text-neutral-300 body-base">
                LLM orchestration, agent design, RAG, evals, AWS Bedrock +
                AgentCore, Pandas, scikit-learn
              </p>
            </div>
            <div className="bg-neutral-800/50 border border-neutral-700 p-6">
              <h3 className="text-[var(--accent)] font-medium mb-2">
                Infrastructure
              </h3>
              <p className="text-neutral-300 body-base">
                AWS (Lambda, ECS, S3, CloudWatch, Athena, Glue, Secrets Manager,
                Bedrock, ElasticSearch), Docker, Postgres, Neo4j
              </p>
            </div>
          </div>
        </section>

        <section className="animate-slide-up">
          <h2 className="heading-lg text-[var(--accent)] mb-6">Education</h2>
          <div className="bg-neutral-800/50 border border-neutral-700 p-8">
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
              <div>
                <h3 className="heading-sm text-white">
                  California Polytechnic State University, San Luis Obispo
                </h3>
                <p className="text-[var(--accent)] font-medium">
                  B.S. Computer Science · Minor in Philosophy
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
