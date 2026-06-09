// components/pages/Projects.tsx
export function Projects() {
  return (
    <div className="bg-neutral-900 text-neutral-100">
      {/* Header Section */}
      <div className="bg-neutral-800 border-b border-neutral-700">
        <div className="container-custom py-12">
          <div className="text-center mb-8">
            <h1 className="heading-xl text-[var(--accent)] mb-4">Featured Projects</h1>
            <p className="text-neutral-400 body-base max-w-2xl mx-auto">
              A showcase of my data and software work, spanning data engineering pipelines,
              machine learning, full-stack applications, database design, and collaborative research.
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom py-16 space-y-16">
        {/* NYC Transit Analytics Project */}
        <section className="animate-slide-up">
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-none p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h2 className="heading-lg text-[var(--accent)] mb-2">NYC Transit Analytics</h2>
                <p className="text-neutral-400 body-sm">Real-Time MTA Data Ingestion & Analytics Platform</p>
                <a
                  href="https://github.com/ZRiley36/NYCTransitAnalytics"
                  className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-[var(--accent)] body-sm transition-colors mt-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  View source
                </a>
              </div>
              <div className="mt-4 lg:mt-0">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-neutral-700/50 text-[var(--accent)] rounded-none text-sm">Python</span>
                  <span className="px-3 py-1 bg-neutral-700/50 text-[var(--accent)] rounded-none text-sm">FastAPI</span>
                  <span className="px-3 py-1 bg-neutral-700/50 text-[var(--accent)] rounded-none text-sm">GTFS-RT</span>
                  <span className="px-3 py-1 bg-neutral-700/50 text-[var(--accent)] rounded-none text-sm">PostgreSQL</span>
                  <span className="px-3 py-1 bg-neutral-700/50 text-[var(--accent)] rounded-none text-sm">Prefect</span>
                  <span className="px-3 py-1 bg-neutral-700/50 text-[var(--accent)] rounded-none text-sm">Docker</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-neutral-300 body-base leading-relaxed">
              <div className="border-l-4 border-neutral-600 pl-6">
                <p className="mb-4">
                  A data-engineering platform that ingests real-time NYC MTA transit data from{' '}
                  <a href="https://api.mta.info/" className="text-[var(--accent)] hover:text-[var(--accent-hover)] underline transition-colors" target="_blank" rel="noopener noreferrer">
                    GTFS-RT feeds
                  </a>{' '}— vehicle positions and trip updates — and persists it for analysis. Built around a Prefect-scheduled pipeline that polls the feeds on an interval, stores results in PostgreSQL, and archives raw payloads to cloud storage (AWS S3 / GCS).
                </p>
                <p>
                  A FastAPI backend exposes health checks, on-demand feed fetches, and monitoring endpoints, with the full stack — API, scheduler, PostgreSQL, and Redis — containerized via Docker Compose for one-command local deployment.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="bg-neutral-700/30 rounded-none p-4 border border-neutral-600">
                  <h4 className="text-[var(--accent)] text-sm font-medium mb-1">Ingestion</h4>
                  <p className="text-neutral-400 text-sm">Automatic polling of GTFS-RT vehicle positions and trip updates.</p>
                </div>
                <div className="bg-neutral-700/30 rounded-none p-4 border border-neutral-600">
                  <h4 className="text-[var(--accent)] text-sm font-medium mb-1">Scheduling</h4>
                  <p className="text-neutral-400 text-sm">Prefect orchestrates periodic data collection flows.</p>
                </div>
                <div className="bg-neutral-700/30 rounded-none p-4 border border-neutral-600">
                  <h4 className="text-[var(--accent)] text-sm font-medium mb-1">Storage</h4>
                  <p className="text-neutral-400 text-sm">PostgreSQL for structured data, S3/GCS for raw feed archives.</p>
                </div>
                <div className="bg-neutral-700/30 rounded-none p-4 border border-neutral-600">
                  <h4 className="text-[var(--accent)] text-sm font-medium mb-1">API</h4>
                  <p className="text-neutral-400 text-sm">FastAPI service with health checks and manual fetch endpoints.</p>
                </div>
                <div className="bg-neutral-700/30 rounded-none p-4 border border-neutral-600">
                  <h4 className="text-[var(--accent)] text-sm font-medium mb-1">Containerization</h4>
                  <p className="text-neutral-400 text-sm">Full stack runs via Docker Compose — API, scheduler, DB, Redis.</p>
                </div>
                <div className="bg-neutral-700/30 rounded-none p-4 border border-neutral-600">
                  <h4 className="text-[var(--accent)] text-sm font-medium mb-1">Caching</h4>
                  <p className="text-neutral-400 text-sm">Redis layer backing the API and scheduled processing.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ultimate Frisbee Media Bias Project */}
        <section className="animate-slide-up">
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-none overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div>
                  <h2 className="heading-lg text-[var(--accent)] mb-2">Ultimate Frisbee Media Bias</h2>
                  <a
                    href="https://github.com/ZRiley36/ultimate-frisbee-media-bias"
                    className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-[var(--accent)] body-sm transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    View source
                  </a>
                </div>
                <div className="mt-4 lg:mt-0">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-neutral-700/50 text-[var(--accent)] rounded-none text-sm">Python</span>
                    <span className="px-3 py-1 bg-neutral-700/50 text-[var(--accent)] rounded-none text-sm">Selenium</span>
                    <span className="px-3 py-1 bg-neutral-700/50 text-[var(--accent)] rounded-none text-sm">Pandas</span>
                    <span className="px-3 py-1 bg-neutral-700/50 text-[var(--accent)] rounded-none text-sm">Scikit-learn</span>
                  </div>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto pr-4 space-y-6 text-neutral-300 body-base leading-relaxed">
                <div>
                  <h3 className="heading-sm text-white mb-4">Data Collection</h3>

                  <div className="space-y-4 ml-8">
                    <div className="border-l-4 border-neutral-600 pl-4">
                      <h4 className="font-semibold text-[var(--accent)] mb-2">Articles Dataset (df_articles)</h4>
                      <p className="mb-3">
                        Gathered 169 articles about Men's DI ultimate frisbee from{' '}
                        <a href="https://ultiworld.com/division/usau-college-d-i-mens" className="text-[var(--accent)] hover:text-[var(--accent-hover)] underline transition-colors" target="_blank" rel="noopener noreferrer">
                          Ultiworld
                        </a>, requiring sophisticated web scraping with Selenium to handle authentication and dynamic content loading.
                      </p>
                      <p className="mb-3">
                        Developed automated scraping pipeline that navigated login requirements, processed article text, and populated structured datasets with metadata including author, title, and publication date.
                      </p>
                      <p>
                        Performed data cleaning to remove irrelevant articles and standardize team mentions, resulting in 163 high-quality articles for analysis.
                      </p>
                    </div>

                    <div className="border-l-4 border-neutral-600 pl-4">
                      <h4 className="font-semibold text-[var(--accent)] mb-2">Rankings & Rosters (df_rankings, df_rosters)</h4>
                      <p className="mb-3">
                        Extracted comprehensive team data from USAU's official database, including rankings, power ratings, regional classifications, and complete roster information for top-20 teams.
                      </p>
                      <p>
                        Created comprehensive team mention dictionary mapping all possible references (team names, acronyms, school names, player names) to ensure accurate mention counting across articles.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="heading-sm text-white mb-4">Key Findings</h3>
                  <div className="ml-8 space-y-3">
                    <p>
                      <strong className="text-[var(--accent)]">Research Question:</strong> Is Cal Poly's Ultimate Frisbee team (SLOCORE) mentioned disproportionately relative to their ranking?
                    </p>
                    <p>
                      <strong className="text-[var(--accent)]">Result:</strong> Linear regression analysis revealed Cal Poly received 63 more mentions than predicted by their ranking, indicating positive coverage bias.
                    </p>
                    <p>
                      <strong className="text-[var(--accent)]">Attribution:</strong> Investigation revealed Jake Thorne (Cal Poly alumnus) contributed 154 mentions, explaining the coverage disparity.
                    </p>
                    <p>
                      <strong className="text-[var(--accent)]">Additional Insight:</strong> UNC received disproportionately high mentions due to being used as a comparative benchmark across articles.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="heading-sm text-white mb-4">Machine Learning Implementation</h3>
                  <div className="ml-8 space-y-3">
                    <p>
                      <strong className="text-[var(--accent)]">TF-IDF Analysis:</strong> Implemented K-Nearest Neighbors classifier using TF-IDF vectorization to predict article authorship based on writing patterns.
                    </p>
                    <p>
                      <strong className="text-[var(--accent)]">Model Performance:</strong> Achieved ~40% accuracy with k=4, revealing Keith Raynor as the dominant author (38.2% of articles).
                    </p>
                    <p>
                      <strong className="text-[var(--accent)]">Team Mention Modeling:</strong> Secondary KNN model using team mentions as features achieved 50% accuracy for author prediction, providing insights into writing biases.
                    </p>
                  </div>
                </div>
              </div>

              {/* Project Presentation for the Ultimate Frisbee study */}
              <div className="mt-8 pt-8 border-t border-neutral-700">
                <h3 className="heading-sm text-white mb-1">Project Presentation</h3>
                <p className="text-neutral-400 body-sm mb-4">
                  Slide deck walking through the methodology, analysis, and findings of the study.
                </p>
                <div className="bg-neutral-700/30 rounded-none p-4 border border-neutral-600">
                  <div className="aspect-video w-full">
                    <iframe
                      src="https://docs.google.com/presentation/d/e/2PACX-1vQTLAsYuHuBvYQuctSCct_ShzIoeCjIe2av8Z_zJRLqT1cuvG0rklYEXNplnYFR_qAEAS7VQnv4h8-i/pubembed?start=false&loop=false&delayms=3000"
                      frameBorder="0"
                      width="100%"
                      height="100%"
                      allowFullScreen
                      title="Ultimate Frisbee Media Bias Presentation"
                      className="rounded-none"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Database Project */}
        <section className="animate-slide-up">
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-none p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h2 className="heading-lg text-[var(--accent)] mb-2">Database Modeling & Implementation</h2>
                <p className="text-neutral-400 body-sm">California Campaign Finance & Lobbying Schema</p>
                <a
                  href="https://github.com/ZRiley36/ca-campaign-finance-schema"
                  className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-[var(--accent)] body-sm transition-colors mt-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  View source
                </a>
              </div>
              <div className="mt-4 lg:mt-0">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-neutral-700/50 text-[var(--accent)] rounded-none text-sm">SQL</span>
                  <span className="px-3 py-1 bg-neutral-700/50 text-[var(--accent)] rounded-none text-sm">Database Design</span>
                  <span className="px-3 py-1 bg-neutral-700/50 text-[var(--accent)] rounded-none text-sm">Data Modeling</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-neutral-300 body-base leading-relaxed">
              <div className="border-l-4 border-neutral-600 pl-6">
                <h3 className="heading-sm text-white mb-3">Project Overview</h3>
                <p className="mb-4">
                  Designed and implemented a comprehensive relational database to model the complex financial relationships between California lobbyists, organizations, and political entities using data from{' '}
                  <a href="https://cal-access.sos.ca.gov/" className="text-[var(--accent)] hover:text-[var(--accent-hover)] underline transition-colors" target="_blank" rel="noopener noreferrer">
                    Cal-Access
                  </a>.
                </p>
                <p>
                  Developed sophisticated data architecture using filer IDs as primary keys to enable complex queries like <em className="text-[var(--accent)]">"How much money did it take to get Keith Olberg elected?"</em>
                </p>
              </div>

              <div className="bg-neutral-700/30 rounded-none p-6 border border-neutral-600">
                <h3 className="heading-sm text-white mb-4">Project Resources</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <a
                    href="https://drive.google.com/drive/folders/1CY65Ht9pEO9s1u2YuQOAyqN_bwEcpQ5S?usp=drive_link"
                    className="flex items-center p-4 bg-neutral-600/30 hover:bg-neutral-600/50 rounded-none border border-neutral-500 hover:border-neutral-400 transition-all duration-300 group min-w-0"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="w-10 h-10 bg-red-500/20 rounded-none flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[var(--accent)] font-medium transition-colors">ER Models & Database Files</p>
                      <p className="text-neutral-400 text-sm">Logical & Entity-Relationship diagrams, SQL scripts & example queries</p>
                    </div>
                    <svg className="w-4 h-4 text-neutral-400 transition-colors flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <div className="p-4 bg-neutral-600/30 rounded-none border border-neutral-500 min-w-0 overflow-hidden">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-none flex items-center justify-center mr-3 flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium">Example Queries</p>
                        <p className="text-neutral-400 text-sm">SQL scripts & database queries</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-neutral-900/50 rounded-none p-3 border border-neutral-600 overflow-x-auto">
                        <h4 className="text-[var(--accent)] text-sm font-medium mb-2">Complex Relationship Query</h4>
                        <code className="text-[var(--accent)] text-xs block whitespace-pre-wrap break-words">
                          SELECT f.name, SUM(t.amount) as total_contributions<br/>
                          FROM filers f JOIN transactions t ON f.filer_id = t.filer_id<br/>
                          WHERE f.name LIKE '%Keith Olberg%'<br/>
                          GROUP BY f.filer_id, f.name;
                        </code>
                      </div>

                      <div className="bg-neutral-900/50 rounded-none p-3 border border-neutral-600 overflow-x-auto">
                        <h4 className="text-[var(--accent)] text-sm font-medium mb-2">Lobbyist Activity Analysis</h4>
                        <code className="text-[var(--accent)] text-xs block whitespace-pre-wrap break-words">
                          SELECT l.name, COUNT(DISTINCT o.organization_id) as orgs_represented<br/>
                          FROM lobbyists l JOIN lobbyist_orgs lo ON l.lobbyist_id = lo.lobbyist_id<br/>
                          JOIN organizations o ON lo.organization_id = o.organization_id<br/>
                          GROUP BY l.lobbyist_id, l.name ORDER BY orgs_represented DESC;
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-success/10 border border-success/20 rounded-none p-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-success/20 rounded-none flex items-center justify-center mr-3 mt-1">
                    <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-success font-semibold mb-2">Professional Impact</p>
                    <p className="text-neutral-300">
                      The project's quality impressed our professor so much that he offered me a position with Digital Democracy (CalMatters), where I worked for the following year developing similar data analysis systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DrinksDB Project */}
        <section className="animate-slide-up">
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-none p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h2 className="heading-lg text-[var(--accent)] mb-2">
                  <a
                    href="https://drinks-db-rosy.vercel.app/"
                    className="hover:text-[var(--accent-hover)] transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    DrinksDB
                  </a>
                </h2>
                <p className="text-neutral-400 body-sm">Cocktail Recipe Database & Search Application</p>
                <a
                  href="https://github.com/ZRiley36/DrinksDB"
                  className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-[var(--accent)] body-sm transition-colors mt-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  View source
                </a>
              </div>
              <div className="mt-4 lg:mt-0">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-neutral-700/50 text-[var(--accent)] rounded-none text-sm">React</span>
                  <span className="px-3 py-1 bg-neutral-700/50 text-[var(--accent)] rounded-none text-sm">Express.js</span>
                  <span className="px-3 py-1 bg-neutral-700/50 text-[var(--accent)] rounded-none text-sm">PostgreSQL</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="bg-neutral-700/30 rounded-none p-4 border border-neutral-600">
                <img
                  src="/drinksdb-screenshot.png"
                  alt="DrinksDB home page search UI"
                  className="w-full h-auto rounded-none"
                />
              </div>
            </div>

            <div className="space-y-6 text-neutral-300 body-base leading-relaxed">
              <div className="border-l-4 border-neutral-600 pl-6">
                <p className="mb-4">
                  A full-stack cocktail recipe database and search application. Built with React on the frontend and Express.js on the backend, powered by a PostgreSQL database. Users can search cocktails by name, filter by glass type and preparation method, and find drinks by available ingredients. Features a custom icon system for glass types and a tiled background pattern. Currently in development, with ongoing improvements to the database and user experience.
                </p>
                <p>
                  <a
                    href="https://drinks-db-rosy.vercel.app/"
                    className="text-[var(--accent)] hover:text-[var(--accent-hover)] underline transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit DrinksDB →
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FinDashboard Project */}
        <section className="animate-slide-up">
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-none p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h2 className="heading-lg text-[var(--accent)] mb-2">FinDashboard</h2>
                <p className="text-neutral-400 body-sm">Real-Time Market Data Dashboard</p>
                <a
                  href="https://github.com/ZRiley36/FinDashboard"
                  className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-[var(--accent)] body-sm transition-colors mt-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  View source
                </a>
              </div>
              <div className="mt-4 lg:mt-0">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-neutral-700/50 text-[var(--accent)] rounded-none text-sm">Python</span>
                  <span className="px-3 py-1 bg-neutral-700/50 text-[var(--accent)] rounded-none text-sm">Finnhub API</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-neutral-300 body-base leading-relaxed">
              <div className="border-l-4 border-neutral-600 pl-6">
                <p>
                  A Python tool that pulls real-time market data from the Finnhub API — live quotes for a
                  watchlist of tickers, company-level financials, and news — and surfaces it in a single
                  dashboard view. Currently in active development, with a charted watchlist view over a
                  rolling window as the next milestone.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
