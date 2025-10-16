"use client";

export default function DatabasePage() {
  return (
    <div className="bg-neutral-900 text-neutral-100 min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-neutral-800 to-neutral-900 border-b border-neutral-700">
        <div className="container-custom py-12">
          <div className="text-center mb-8">
            <h1 className="heading-xl purple-text-gradient mb-4">Database Project Resources</h1>
            <p className="text-neutral-400 body-base max-w-2xl mx-auto">
              SQL scripts, example queries, and documentation for the California Political Finance Database project.
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom py-16 space-y-12">
        {/* Project Overview */}
        <section className="animate-slide-up">
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-8">
            <h2 className="heading-lg purple-text-gradient mb-6 flex items-center">
              <span className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center mr-3 purple-glow">
                📊
              </span>
              Project Overview
            </h2>
            <div className="space-y-4 text-neutral-300 body-base leading-relaxed">
              <p>
                This database was designed to model the complex financial relationships between California lobbyists, 
                organizations, and political entities using data from{' '}
                <a href="https://cal-access.sos.ca.gov/" className="text-primary-400 hover:text-primary-300 underline transition-colors" target="_blank" rel="noopener noreferrer">
                  Cal-Access
                </a>.
              </p>
              <p>
                The database uses filer IDs as primary keys to enable complex queries like{' '}
                <em className="text-primary-300">"How much money did it take to get Keith Olberg elected?"</em>
              </p>
            </div>
          </div>
        </section>

        {/* Folder Structure */}
        <section className="animate-slide-up">
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-8">
            <h2 className="heading-lg purple-text-gradient mb-6 flex items-center">
              <span className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center mr-3 purple-glow">
                📁
              </span>
              Project Structure
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* ER Models */}
              <div className="bg-neutral-700/30 rounded-lg p-6 border border-neutral-600">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="heading-sm text-white">ER Models</h3>
                </div>
                <p className="text-neutral-400 body-sm">
                  Entity-Relationship diagrams and logical database design files
                </p>
              </div>

              {/* Scripts */}
              <div className="bg-neutral-700/30 rounded-lg p-6 border border-neutral-600">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="heading-sm text-white">Scripts</h3>
                </div>
                <p className="text-neutral-400 body-sm">
                  SQL scripts, example queries, and database implementation files
                </p>
              </div>

              {/* Documentation */}
              <div className="bg-neutral-700/30 rounded-lg p-6 border border-neutral-600">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="heading-sm text-white">Documentation</h3>
                </div>
                <p className="text-neutral-400 body-sm">
                  Project documentation, analysis, and design rationale
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Example Queries */}
        <section className="animate-slide-up">
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-8">
            <h2 className="heading-lg purple-text-gradient mb-6 flex items-center">
              <span className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center mr-3 purple-glow">
                💻
              </span>
              Example Queries
            </h2>
            
            <div className="space-y-6">
              <div className="bg-neutral-700/30 rounded-lg p-6 border border-neutral-600">
                <h3 className="heading-sm text-white mb-3">Complex Relationship Query</h3>
                <div className="bg-neutral-900/50 rounded-lg p-4 border border-neutral-600">
                  <code className="text-primary-300 text-sm">
                    SELECT f.name, SUM(t.amount) as total_contributions<br/>
                    FROM filers f<br/>
                    JOIN transactions t ON f.filer_id = t.filer_id<br/>
                    WHERE f.name LIKE '%Keith Olberg%'<br/>
                    GROUP BY f.filer_id, f.name;
                  </code>
                </div>
                <p className="text-neutral-400 body-sm mt-3">
                  This query demonstrates how to find the total amount of money contributed to a specific candidate.
                </p>
              </div>

              <div className="bg-neutral-700/30 rounded-lg p-6 border border-neutral-600">
                <h3 className="heading-sm text-white mb-3">Lobbyist Activity Analysis</h3>
                <div className="bg-neutral-900/50 rounded-lg p-4 border border-neutral-600">
                  <code className="text-primary-300 text-sm">
                    SELECT l.name, COUNT(DISTINCT o.organization_id) as orgs_represented<br/>
                    FROM lobbyists l<br/>
                    JOIN lobbyist_orgs lo ON l.lobbyist_id = lo.lobbyist_id<br/>
                    JOIN organizations o ON lo.organization_id = o.organization_id<br/>
                    GROUP BY l.lobbyist_id, l.name<br/>
                    ORDER BY orgs_represented DESC<br/>
                    LIMIT 10;
                  </code>
                </div>
                <p className="text-neutral-400 body-sm mt-3">
                  Analyzes which lobbyists represent the most organizations.
                </p>
              </div>

              <div className="bg-neutral-700/30 rounded-lg p-6 border border-neutral-600">
                <h3 className="heading-sm text-white mb-3">Financial Flow Analysis</h3>
                <div className="bg-neutral-900/50 rounded-lg p-4 border border-neutral-600">
                  <code className="text-primary-300 text-sm">
                    SELECT o.name, SUM(t.amount) as total_spent<br/>
                    FROM organizations o<br/>
                    JOIN transactions t ON o.organization_id = t.organization_id<br/>
                    WHERE t.transaction_type = 'contribution'<br/>
                    AND t.date >= '2020-01-01'<br/>
                    GROUP BY o.organization_id, o.name<br/>
                    ORDER BY total_spent DESC<br/>
                    LIMIT 20;
                  </code>
                </div>
                <p className="text-neutral-400 body-sm mt-3">
                  Shows the top spending organizations in recent years.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* External Resources */}
        <section className="animate-slide-up">
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-8">
            <h2 className="heading-lg purple-text-gradient mb-6 flex items-center">
              <span className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center mr-3 purple-glow">
                🔗
              </span>
              External Resources
            </h2>
            
            <div className="flex justify-center">
              <a
                href="https://drive.google.com/drive/folders/1CY65Ht9pEO9s1u2YuQOAyqN_bwEcpQ5S?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 purple-gradient hover:shadow-lg purple-glow text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                View Complete Project Files on Google Drive
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Back to Projects */}
        <section className="animate-slide-up">
          <div className="text-center">
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 border border-neutral-600 text-neutral-300 hover:text-white hover:border-neutral-500 font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Projects
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
