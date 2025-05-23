export function About() {
  return (
    <div className="text-left max-w-3xl mx-auto space-y-6">
      <p className="text-sm text-light">Brooklyn, NY | (413) 992-8202 | ZachRiley36@gmail.com | <a href="https://linkedin.com/in/zdriley" className="text-light underline">linkedin.com/in/zdriley</a></p>

      <section className="ml-4">
        <h2 className="text-xl font-semibold text-default">Professional Objective</h2>
        <p className="indent-8">
          Recent Computer Science graduate seeking a full-time Software Developer position. Brings practical experience through Amazon internship and Digital Democracy fellowship, with a strong foundation in full-stack development, API design, and database optimization. Combines technical expertise with analytical thinking developed through computer science and philosophy studies. Demonstrated ability to learn quickly and work effectively in collaborative team environments.
        </p>
      </section>

      <section className="ml-4">
        <h2 className="text-xl font-semibold text-default">Technical Skills</h2>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Programming Languages:</strong> Python, Java, JavaScript, C/C++, Kotlin, SQL, Cypher</li>
          <li><strong>Frameworks & Libraries:</strong> React, Node.js, Flutter, Flask, Pandas, NumPy, Scikit-learn</li>
          <li><strong>Cloud & Tools:</strong> AWS (S3, Elastic Search, Glue), Git, Microsoft Office</li>
        </ul>
      </section>

      <section className="ml-4">
        <h2 className="text-xl font-semibold text-default">Work Experience</h2>
        <div className="ml-4">
          <h3 className="font-bold">Digital Democracy | CalMatters | Software Engineering Student Fellow</h3>
          <p className="text-sm text-gray-400">June 2023 – June 2024</p>
          <ul className="list-disc list-inside ml-4">
            <li>Contributed to Digital Democracy's web platform that empowers journalists to track and analyze California legislative decisions</li>
            <li>Built Python/Flask API for CalMatters to access California legislative data</li>
            <li>Wrote API endpoints using SQL queries to serve hearing, bill, legislator, and committee data</li>
            <li>Refactored SQL queries into Neo4j's Cypher to optimize performance</li>
            <li>Used Pandas, NumPy, and Scikit-learn ML models to analyze legislative trends for tipsheets</li>
          </ul>
        </div>
        <div className="ml-4">
          <h3 className="font-bold">Amazon | Junior Software Developing Engineer</h3>
          <p className="text-sm text-gray-400">March 2021 – June 2022</p>
          <ul className="list-disc list-inside ml-4">
            <li>Part of the last-mile team: optimized package allocation to reduce delivery times and costs</li>
            <li>Created a testing system simulating thousands of package requests</li>
            <li>Built log querying tool to help SWE troubleshoot using AWS services (S3, Elastic Search, Glue)</li>
            <li>Participated in agile development with daily stand-ups and sprints</li>
          </ul>
        </div>
      </section>

      <section className="ml-4">
        <h2 className="text-xl font-semibold text-default">Education</h2>
        <p className="ml-4"><strong>California Polytechnic State University, San Luis Obispo</strong></p>
        <p className="text-sm text-gray-400 ml-4">B.S. in Computer Science, Minor in Philosophy | June 2024</p>
        <ul className="list-disc list-inside ml-4">
          <li>
            <strong>Technical Project:</strong> Representing Financial Transactions of the California Legislature —
            Architected a relational database capturing complex financial relationships between political entities. Leveraged SQL queries to analyze intricate relationships between legislators, lobbyists, and organizations.
          </li>
          <li>
            <strong>Technical Project:</strong> Is Ultimate Frisbee Coverage Biased? —
            Designed a web scraping system using Selenium and Python to analyze 100+ articles from Ultiworld.com, applying pandas and scikit-learn to quantify reporting patterns and biases. Presented findings through a data-driven PowerPoint with statistical analyses.
          </li>
        </ul>
      </section>
    </div>
  );
}