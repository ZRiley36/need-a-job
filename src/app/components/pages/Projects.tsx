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
      <div className="mt-8 w-full max-w-3xl rounded-lg shadow p-6 bg-light text-dark border border-accent text-left space-y-4 leading-relaxed">
        <h2 className="text-2xl font-semibold mb-1 text-rich">Database Modeling and Implementation</h2>
        <p>
          In Database Modeling and Implementation, I worked with a lab partner to design, document, and populate a relational database to accurately represent the financial influence of Californian lobbyists and organizations on elections and legislation.
        </p>
        <p>
          After scraping countless tax documents from <a href="https://cal-access.sos.ca.gov/" className="underline text-rich hover:text-default" target="_blank" rel="noopener noreferrer">calAccess</a>, we matched each entity with its corresponding filer ID, which became the primary key across our dataset. With this design, we can answer questions like <span className="italic">"How much money did it take to get Keith Olberg elected?"</span>
        </p>
        <div>
          <h3 className="text-lg font-medium mb-2">Resources</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <a href="/path/to/your/ER-model.pdf" className="underline text-rich hover:text-default" target="_blank" rel="noopener noreferrer">
                Logical and ER Models (PDF)
              </a>
            </li>
            <li>
              <a href="/path/to/your/database-scripts.zip" className="underline text-rich hover:text-default" target="_blank" rel="noopener noreferrer">
                Database Scripts & Example Queries (ZIP)
              </a>
            </li>
          </ul>
        </div>
        <p>
          Our professor enjoyed our project so much he offered me a job — and I worked with Digital Democracy (a branch of CalMatters) for the following year.
        </p>
      </div>
    </div>
  );
}