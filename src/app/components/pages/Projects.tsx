// components/pages/Projects.tsx
export function Projects() {
  return (
    <div className="bg-neutral-900 text-neutral-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-neutral-800 to-neutral-900 border-b border-neutral-700">
        <div className="container-custom py-12">
          <div className="text-center mb-8">
            <h1 className="heading-xl text-white mb-4">Featured Projects</h1>
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
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-8">
            <h2 className="heading-lg text-primary-400 mb-6 flex items-center">
              <span className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center mr-3">
                📊
              </span>
              Project Overview Presentation
            </h2>
            <div className="bg-neutral-700/30 rounded-lg p-4 border border-neutral-600">
              <div className="aspect-video w-full">
                <iframe
                  src="https://docs.google.com/presentation/d/e/2PACX-1vQTLAsYuHuBvYQuctSCct_ShzIoeCjIe2av8Z_zJRLqT1cuvG0rklYEXNplnYFR_qAEAS7VQnv4h8-i/pubembed?start=false&loop=false&delayms=3000"
                  frameBorder="0"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  title="Project Portfolio Presentation"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Ultimate Frisbee Data Analysis Project */}
        <section className="animate-slide-up">
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div>
                  <h2 className="heading-lg text-primary-400 mb-2">Ultimate Frisbee Data Analysis</h2>
                  <div className="flex flex-wrap items-center gap-4 text-neutral-400 body-sm">
                    <span>👥 Collaboration with Calahan Lackovic</span>
                    <a 
                      href="https://www.youtube.com/watch?v=xXuHFDnZVhA" 
                      className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      🎥 Project Video
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="mt-4 lg:mt-0">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">Python</span>
                    <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">Selenium</span>
                    <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">Pandas</span>
                    <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">Scikit-learn</span>
                  </div>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto pr-4 space-y-6 text-neutral-300 body-base leading-relaxed">
                <div>
                  <h3 className="heading-sm text-white mb-4 flex items-center">
                    <span className="w-6 h-6 bg-primary-500/20 rounded-lg flex items-center justify-center mr-2 text-sm">📊</span>
                    Data Collection
                  </h3>
                  
                  <div className="space-y-4 ml-8">
                    <div className="border-l-4 border-primary-500/50 pl-4">
                      <h4 className="font-semibold text-primary-300 mb-2">Articles Dataset (df_articles)</h4>
                      <p className="mb-3">
                        Gathered 169 articles about Men's DI ultimate frisbee from{' '}
                        <a href="https://ultiworld.com/division/usau-college-d-i-mens" className="text-primary-400 hover:text-primary-300 underline transition-colors" target="_blank" rel="noopener noreferrer">
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

                    <div className="border-l-4 border-primary-500/50 pl-4">
                      <h4 className="font-semibold text-primary-300 mb-2">Rankings & Rosters (df_rankings, df_rosters)</h4>
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
                    <span className="w-6 h-6 bg-primary-500/20 rounded-lg flex items-center justify-center mr-2 text-sm">🔍</span>
                    Key Findings
                  </h3>
                  <div className="ml-8 space-y-3">
                    <p>
                      <strong className="text-primary-300">Research Question:</strong> Is Cal Poly's Ultimate Frisbee team (SLOCORE) mentioned disproportionately relative to their ranking?
                    </p>
                    <p>
                      <strong className="text-primary-300">Result:</strong> Linear regression analysis revealed Cal Poly received 63 more mentions than predicted by their ranking, indicating positive coverage bias.
                    </p>
                    <p>
                      <strong className="text-primary-300">Attribution:</strong> Investigation revealed Jake Thorne (Cal Poly alumnus) contributed 154 mentions, explaining the coverage disparity.
                    </p>
                    <p>
                      <strong className="text-primary-300">Additional Insight:</strong> UNC received disproportionately high mentions due to being used as a comparative benchmark across articles.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="heading-sm text-white mb-4 flex items-center">
                    <span className="w-6 h-6 bg-primary-500/20 rounded-lg flex items-center justify-center mr-2 text-sm">🤖</span>
                    Machine Learning Implementation
                  </h3>
                  <div className="ml-8 space-y-3">
                    <p>
                      <strong className="text-primary-300">TF-IDF Analysis:</strong> Implemented K-Nearest Neighbors classifier using TF-IDF vectorization to predict article authorship based on writing patterns.
                    </p>
                    <p>
                      <strong className="text-primary-300">Model Performance:</strong> Achieved ~40% accuracy with k=4, revealing Keith Raynor as the dominant author (38.2% of articles).
                    </p>
                    <p>
                      <strong className="text-primary-300">Team Mention Modeling:</strong> Secondary KNN model using team mentions as features achieved 50% accuracy for author prediction, providing insights into writing biases.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Database Project */}
        <section className="animate-slide-up">
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h2 className="heading-lg text-primary-400 mb-2">Database Modeling & Implementation</h2>
                <p className="text-neutral-400 body-sm">California Political Finance Database</p>
              </div>
              <div className="mt-4 lg:mt-0">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">SQL</span>
                  <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">Database Design</span>
                  <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">Data Modeling</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-neutral-300 body-base leading-relaxed">
              <div className="border-l-4 border-primary-500/50 pl-6">
                <h3 className="heading-sm text-white mb-3">Project Overview</h3>
                <p className="mb-4">
                  Designed and implemented a comprehensive relational database to model the complex financial relationships between California lobbyists, organizations, and political entities using data from{' '}
                  <a href="https://cal-access.sos.ca.gov/" className="text-primary-400 hover:text-primary-300 underline transition-colors" target="_blank" rel="noopener noreferrer">
                    Cal-Access
                  </a>.
                </p>
                <p>
                  Developed sophisticated data architecture using filer IDs as primary keys to enable complex queries like <em className="text-primary-300">"How much money did it take to get Keith Olberg elected?"</em>
                </p>
              </div>

              <div className="bg-neutral-700/30 rounded-lg p-6 border border-neutral-600">
                <h3 className="heading-sm text-white mb-4 flex items-center">
                  <span className="w-6 h-6 bg-primary-500/20 rounded-lg flex items-center justify-center mr-2 text-sm">📁</span>
                  Project Resources
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <a 
                    href="/path/to/your/ER-model.pdf" 
                    className="flex items-center p-4 bg-neutral-600/30 hover:bg-neutral-600/50 rounded-lg border border-neutral-500 hover:border-primary-500/50 transition-all duration-300 group"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium group-hover:text-primary-400 transition-colors">ER Models</p>
                      <p className="text-neutral-400 text-sm">Logical & Entity-Relationship diagrams</p>
                    </div>
                    <svg className="w-4 h-4 text-neutral-400 group-hover:text-primary-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <a 
                    href="/path/to/your/database-scripts.zip" 
                    className="flex items-center p-4 bg-neutral-600/30 hover:bg-neutral-600/50 rounded-lg border border-neutral-500 hover:border-primary-500/50 transition-all duration-300 group"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium group-hover:text-primary-400 transition-colors">Database Scripts</p>
                      <p className="text-neutral-400 text-sm">SQL scripts & example queries</p>
                    </div>
                    <svg className="w-4 h-4 text-neutral-400 group-hover:text-primary-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="bg-success/10 border border-success/20 rounded-lg p-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center mr-3 mt-1">
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
      </div>
    </div>
  );
}