// components/pages/Projects.tsx
export function Projects() {
  return (
    <div className="bg-neutral-900 text-neutral-100">
      {/* Header Section */}
      <div className="bg-neutral-800 border-b border-neutral-700">
        <div className="container-custom py-12">
          <div className="text-center mb-8">
            <h1 className="heading-xl text-[#00ff88] mb-4">Featured Projects</h1>
            <p className="text-neutral-400 body-base max-w-2xl mx-auto">
              A showcase of my data analysis and development work, including machine learning, 
              database design, and collaborative research projects.
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom py-16 space-y-16">
        {/* Project Presentation */}
        <section className="animate-slide-up">
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-none p-8">
            <h2 className="heading-lg text-[#00ff88] mb-6 flex items-center">
              <span className="w-8 h-8 bg-neutral-700/50 rounded-none flex items-center justify-center mr-3">
                📊
              </span>
              Project Overview Presentation
            </h2>
            <div className="bg-neutral-700/30 rounded-none p-4 border border-neutral-600">
              <div className="aspect-video w-full">
                <iframe
                  src="https://docs.google.com/presentation/d/e/2PACX-1vQTLAsYuHuBvYQuctSCct_ShzIoeCjIe2av8Z_zJRLqT1cuvG0rklYEXNplnYFR_qAEAS7VQnv4h8-i/pubembed?start=false&loop=false&delayms=3000"
                  frameBorder="0"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  title="Project Portfolio Presentation"
                  className="rounded-none"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Ultimate Frisbee Data Analysis Project */}
        <section className="animate-slide-up">
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-none overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div>
                  <h2 className="heading-lg text-[#00ff88] mb-2">Ultimate Frisbee Data Analysis</h2>
                  <div className="flex flex-wrap items-center gap-4 text-neutral-400 body-sm">
                    <span>👥 Collaboration with Calahan Lackovic</span>
                  </div>
                </div>
                <div className="mt-4 lg:mt-0">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-neutral-700/50 text-[#00ff88] rounded-none text-sm">Python</span>
                    <span className="px-3 py-1 bg-neutral-700/50 text-[#00ff88] rounded-none text-sm">Selenium</span>
                    <span className="px-3 py-1 bg-neutral-700/50 text-[#00ff88] rounded-none text-sm">Pandas</span>
                    <span className="px-3 py-1 bg-neutral-700/50 text-[#00ff88] rounded-none text-sm">Scikit-learn</span>
                  </div>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto pr-4 space-y-6 text-neutral-300 body-base leading-relaxed">
                <div>
                  <h3 className="heading-sm text-white mb-4 flex items-center">
                    <span className="w-6 h-6 bg-neutral-700/50 rounded-none flex items-center justify-center mr-2 text-sm">📊</span>
                    Data Collection
                  </h3>
                  
                  <div className="space-y-4 ml-8">
                    <div className="border-l-4 border-neutral-600 pl-4">
                      <h4 className="font-semibold text-[#00ff88] mb-2">Articles Dataset (df_articles)</h4>
                      <p className="mb-3">
                        Gathered 169 articles about Men's DI ultimate frisbee from{' '}
                        <a href="https://ultiworld.com/division/usau-college-d-i-mens" className="text-[#00ff88] hover:text-[#00cc6a] underline transition-colors" target="_blank" rel="noopener noreferrer">
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
                      <h4 className="font-semibold text-[#00ff88] mb-2">Rankings & Rosters (df_rankings, df_rosters)</h4>
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
                  <h3 className="heading-sm text-white mb-4 flex items-center">
                    <span className="w-6 h-6 bg-neutral-700/50 rounded-none flex items-center justify-center mr-2 text-sm">🔍</span>
                    Key Findings
                  </h3>
                  <div className="ml-8 space-y-3">
                    <p>
                      <strong className="text-[#00ff88]">Research Question:</strong> Is Cal Poly's Ultimate Frisbee team (SLOCORE) mentioned disproportionately relative to their ranking?
                    </p>
                    <p>
                      <strong className="text-[#00ff88]">Result:</strong> Linear regression analysis revealed Cal Poly received 63 more mentions than predicted by their ranking, indicating positive coverage bias.
                    </p>
                    <p>
                      <strong className="text-[#00ff88]">Attribution:</strong> Investigation revealed Jake Thorne (Cal Poly alumnus) contributed 154 mentions, explaining the coverage disparity.
                    </p>
                    <p>
                      <strong className="text-[#00ff88]">Additional Insight:</strong> UNC received disproportionately high mentions due to being used as a comparative benchmark across articles.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="heading-sm text-white mb-4 flex items-center">
                    <span className="w-6 h-6 bg-neutral-700/50 rounded-none flex items-center justify-center mr-2 text-sm">🤖</span>
                    Machine Learning Implementation
                  </h3>
                  <div className="ml-8 space-y-3">
                    <p>
                      <strong className="text-[#00ff88]">TF-IDF Analysis:</strong> Implemented K-Nearest Neighbors classifier using TF-IDF vectorization to predict article authorship based on writing patterns.
                    </p>
                    <p>
                      <strong className="text-[#00ff88]">Model Performance:</strong> Achieved ~40% accuracy with k=4, revealing Keith Raynor as the dominant author (38.2% of articles).
                    </p>
                    <p>
                      <strong className="text-[#00ff88]">Team Mention Modeling:</strong> Secondary KNN model using team mentions as features achieved 50% accuracy for author prediction, providing insights into writing biases.
                    </p>
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
                <h2 className="heading-lg text-[#00ff88] mb-2">Database Modeling & Implementation</h2>
                <p className="text-neutral-400 body-sm">California Political Finance Database</p>
              </div>
              <div className="mt-4 lg:mt-0">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-neutral-700/50 text-[#00ff88] rounded-none text-sm">SQL</span>
                  <span className="px-3 py-1 bg-neutral-700/50 text-[#00ff88] rounded-none text-sm">Database Design</span>
                  <span className="px-3 py-1 bg-neutral-700/50 text-[#00ff88] rounded-none text-sm">Data Modeling</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-neutral-300 body-base leading-relaxed">
              <div className="border-l-4 border-neutral-600 pl-6">
                <h3 className="heading-sm text-white mb-3">Project Overview</h3>
                <p className="mb-4">
                  Designed and implemented a comprehensive relational database to model the complex financial relationships between California lobbyists, organizations, and political entities using data from{' '}
                  <a href="https://cal-access.sos.ca.gov/" className="text-[#00ff88] hover:text-[#00cc6a] underline transition-colors" target="_blank" rel="noopener noreferrer">
                    Cal-Access
                  </a>.
                </p>
                <p>
                  Developed sophisticated data architecture using filer IDs as primary keys to enable complex queries like <em className="text-[#00ff88]">"How much money did it take to get Keith Olberg elected?"</em>
                </p>
              </div>

              <div className="bg-neutral-700/30 rounded-none p-6 border border-neutral-600">
                <h3 className="heading-sm text-white mb-4 flex items-center">
                  <span className="w-6 h-6 bg-neutral-700/50 rounded-none flex items-center justify-center mr-2 text-sm">📁</span>
                  Project Resources
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <a 
                    href="https://drive.google.com/drive/folders/1CY65Ht9pEO9s1u2YuQOAyqN_bwEcpQ5S?usp=drive_link" 
                    className="flex items-center p-4 bg-neutral-600/30 hover:bg-neutral-600/50 rounded-none border border-neutral-500 hover:border-neutral-400 transition-all duration-300 group"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <div className="w-10 h-10 bg-red-500/20 rounded-none flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-[#00ff88] font-medium transition-colors">ER Models & Database Files</p>
                      <p className="text-neutral-400 text-sm">Logical & Entity-Relationship diagrams, SQL scripts & example queries</p>
                    </div>
                    <svg className="w-4 h-4 text-neutral-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <div className="p-4 bg-neutral-600/30 rounded-none border border-neutral-500">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-none flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">Example Queries</p>
                        <p className="text-neutral-400 text-sm">SQL scripts & database queries</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-neutral-900/50 rounded-none p-3 border border-neutral-600">
                        <h4 className="text-[#00ff88] text-sm font-medium mb-2">Complex Relationship Query</h4>
                        <code className="text-[#00ff88] text-xs block">
                          SELECT f.name, SUM(t.amount) as total_contributions<br/>
                          FROM filers f JOIN transactions t ON f.filer_id = t.filer_id<br/>
                          WHERE f.name LIKE '%Keith Olberg%'<br/>
                          GROUP BY f.filer_id, f.name;
                        </code>
                      </div>
                      
                      <div className="bg-neutral-900/50 rounded-none p-3 border border-neutral-600">
                        <h4 className="text-[#00ff88] text-sm font-medium mb-2">Lobbyist Activity Analysis</h4>
                        <code className="text-[#00ff88] text-xs block">
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
                <h2 className="heading-lg text-[#00ff88] mb-2">
                  <a 
                    href="https://drinks-db-rosy.vercel.app/" 
                    className="hover:text-[#00cc6a] transition-colors"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    DrinksDB
                  </a>
                </h2>
                <p className="text-neutral-400 body-sm">Cocktail Recipe Database & Search Application</p>
              </div>
              <div className="mt-4 lg:mt-0">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-neutral-700/50 text-[#00ff88] rounded-none text-sm">React</span>
                  <span className="px-3 py-1 bg-neutral-700/50 text-[#00ff88] rounded-none text-sm">Express.js</span>
                  <span className="px-3 py-1 bg-neutral-700/50 text-[#00ff88] rounded-none text-sm">PostgreSQL</span>
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
                    className="text-[#00ff88] hover:text-[#00cc6a] underline transition-colors" 
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
      </div>
    </div>
  );
}