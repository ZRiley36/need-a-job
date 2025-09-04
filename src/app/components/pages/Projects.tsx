// components/pages/Projects.tsx
export function Projects() {
  return (
    <div className="flex flex-col items-center">
      <p className="mb-4">Here are some of my recent projects.</p>
      <div className="w-full max-w-3xl aspect-video">
        <iframe
          src="https://docs.google.com/presentation/d/e/2PACX-1vQTLAsYuHuBvYQuctSCct_ShzIoeCjIe2av8Z_zJRLqT1cuvG0rklYEXNplnYFR_qAEAS7VQnv4h8-i/pubembed?start=false&loop=false&delayms=3000"
          frameBorder="0"
          width="100%"
          height="480"
          allowFullScreen
          title="My Google Slides Presentation"
        ></iframe>
      </div>
      {/* Database Project Description */}
      <div className="mt-8 w-full max-w-3xl bg-gray-50 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Database Modeling and Implementation</h2>
        <p className="mb-4">
          In Database Modeling and Implementation, I worked with a lab partner to design, document, and populate a relational database with the purpose of accurately representing the financial influence of Californian lobbyists and organizations on elections and legislation.
          Upon scraping countless tax documents off the government website <a href="https://cal-access.sos.ca.gov/" className="underline text-blue-600" target="_blank" rel="noopener noreferrer">calAccess</a>, we matched each entity with its respective filer ID, which became a primary key for our entire dataset.
          Please review our Logical and ER models here to get a sense of our Database. With our design, we are able to answer questions like <span className="italic">"How much money did it take to get Keith Olberg elected?"</span>
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <a href="/path/to/your/ER-model.pdf" className="underline text-blue-600" target="_blank" rel="noopener noreferrer">
              Logical and ER Models (PDF)
            </a>
          </li>
          <li>
            <a href="/path/to/your/database-scripts.zip" className="underline text-blue-600" target="_blank" rel="noopener noreferrer">
              Database Scripts & Example Queries (ZIP)
            </a>
          </li>
        </ul>
        <p>
          Our professor enjoyed our project so much he offered me a job – and I ended up working for Digital Democracy (a branch of CalMatters) for the following year.
        </p>
      </div>
    </div>
  );
}