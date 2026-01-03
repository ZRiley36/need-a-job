export function About() {
  return (
    <div className="bg-neutral-900 text-neutral-100">
      {/* Header Section */}
      <div className="bg-neutral-800 border-b border-neutral-700">
        <div className="container-custom py-12">
          <div className="text-center mb-8">
            <h1 className="heading-xl text-[#00ff88] mb-4">Professional Resume</h1>
            <div className="flex flex-wrap justify-center gap-4 text-neutral-300 body-base">
              <span>Brooklyn, NY</span>
              <span>(413) 992-8202</span>
              <a href="mailto:zachriley36@gmail.com" className="text-[#00ff88] hover:text-[#00cc6a] transition-colors">
                ZachRiley36@gmail.com
              </a>
              <a href="https://linkedin.com/in/zdriley" className="text-[#00ff88] hover:text-[#00cc6a] transition-colors" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-16 space-y-16">
        {/* Professional Objective */}
        <section className="animate-slide-up">
          <h2 className="heading-lg text-[#00ff88] mb-6">
            Professional Objective
          </h2>
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-none p-8">
            <p className="body-lg text-neutral-300 leading-relaxed">
              Recent Computer Science graduate seeking a full-time Software Developer position. Brings practical experience through Amazon internship and Digital Democracy fellowship, with a strong foundation in full-stack development, API design, and database optimization. Combines technical expertise with analytical thinking developed through computer science and philosophy studies. Demonstrated ability to learn quickly and work effectively in collaborative team environments.
            </p>
          </div>
        </section>

        {/* Technical Skills */}
        <section className="animate-slide-up">
          <h2 className="heading-lg text-[#00ff88] mb-6">
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-none p-6">
              <h3 className="heading-sm text-white mb-4">Programming Languages</h3>
              <p className="text-neutral-300 body-base">Python, Java, JavaScript, C/C++, Kotlin, SQL, Cypher</p>
            </div>
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-none p-6">
              <h3 className="heading-sm text-white mb-4">Frameworks & Libraries</h3>
              <p className="text-neutral-300 body-base">React, Node.js, Flutter, Flask, Pandas, NumPy, Scikit-learn</p>
            </div>
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-none p-6">
              <h3 className="heading-sm text-white mb-4">Cloud & Tools</h3>
              <p className="text-neutral-300 body-base">AWS (S3, Elastic Search, Glue), Git, Microsoft Office</p>
            </div>
          </div>
        </section>

        {/* Work Experience */}
        <section className="animate-slide-up">
          <h2 className="heading-lg text-[#00ff88] mb-6">
            Work Experience
          </h2>
          <div className="space-y-8">
            {/* Digital Democracy */}
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-none p-8 hover:bg-neutral-800/70 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="heading-sm text-white mb-1">Software Engineering Student Fellow</h3>
                  <p className="text-[#00ff88] font-medium">Digital Democracy | CalMatters</p>
                </div>
                <span className="text-neutral-400 body-sm mt-2 md:mt-0">June 2023 – June 2024</span>
              </div>
              <ul className="space-y-3 text-neutral-300 body-base list-disc list-inside">
                <li>Contributed to Digital Democracy's web platform that empowers journalists to track and analyze California legislative decisions</li>
                <li>Built and maintained over 20 Python/Flask API endpoints to securely serve key legislative data to CalMatters journalists</li>
                <li>Engineered database performance improvements by refactoring complex SQL queries into Neo4j Cypher, reducing query latency by 45% for legislative data</li>
                <li>Executed data analysis projects utilizing Pandas and Scikit-learn ML models to identify legislative trends, contributing to 12+ data-driven tipsheets used by news outlets</li>
              </ul>
            </div>

            {/* Amazon */}
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-none p-8 hover:bg-neutral-800/70 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="heading-sm text-white mb-1">Software Development Intern</h3>
                  <p className="text-[#00ff88] font-medium">Amazon</p>
                </div>
                <span className="text-neutral-400 body-sm mt-2 md:mt-0">March 2021 – June 2022</span>
              </div>
              <ul className="space-y-3 text-neutral-300 body-base list-disc list-inside">
                <li>Work on the last-mile team to optimize package allocation to reduce delivery times and cost</li>
                <li>Developed a high-throughput stress-testing platform simulating 10,000+ package requests per minute, ensuring the reliability of new allocation algorithms</li>
                <li>Built a log querying tool to help SWE troubleshoot using AWS services (S3, Elastic Search, Glue)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="animate-slide-up">
          <h2 className="heading-lg text-[#00ff88] mb-6">
            Education
          </h2>
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-none p-8">
            <div className="mb-6">
              <h3 className="heading-sm text-white mb-2">California Polytechnic State University, San Luis Obispo</h3>
              <p className="text-[#00ff88] font-medium mb-1">B.S. in Computer Science, Minor in Philosophy</p>
              <p className="text-neutral-400 body-sm">June 2024</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-white font-semibold mb-3">Key Technical Projects</h4>
                <div className="space-y-4">
                  <div className="border-l-4 border-neutral-600 pl-6">
                    <h5 className="text-[#00ff88] font-medium mb-2">Representing Financial Transactions of the California Legislature</h5>
                    <p className="text-neutral-300 body-base">
                      Architected a relational database capturing complex financial relationships between political entities. Leveraged SQL queries to analyze intricate relationships between legislators, lobbyists, and organizations.
                    </p>
                  </div>
                  <div className="border-l-4 border-neutral-600 pl-6">
                    <h5 className="text-[#00ff88] font-medium mb-2">Is Ultimate Frisbee Coverage Biased?</h5>
                    <p className="text-neutral-300 body-base">
                      Designed a web scraping system using Selenium and Python to analyze 100+ articles from Ultiworld.com, applying pandas and scikit-learn to quantify reporting patterns and biases. Presented findings through a data-driven PowerPoint with statistical analyses.
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