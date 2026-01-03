// components/pages/Home.tsx
type PageKey = "Home" | "Resume" | "Projects" | "Games" | "Contact";

interface HomeProps {
  setActivePage: (page: PageKey) => void;
}

export function Home({ setActivePage }: HomeProps) {
  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Hero Section */}
      <section className="container-custom py-12">
        <div className="text-center animate-slide-up">
          <h1 className="heading-display text-white mb-4 max-w-4xl mx-auto">
           <span className="text-[#00ff88]">Just a guy who likes to learn</span>
          </h1>
          
          <div className="flex flex-wrap justify-center items-center gap-4 text-neutral-300 body-base">
            <a 
              href="mailto:zachriley36@gmail.com"
              className="text-[#00ff88] hover:text-[#00cc6a] underline transition-colors"
            >
              Get In Touch
            </a>
            <span className="text-neutral-500">•</span>
            <a 
              href="https://linkedin.com/in/zdriley" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#00ff88] hover:text-[#00cc6a] underline transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="container-custom pb-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="heading-lg text-white mb-6">Skills & Expertise</h2>
          <ul className="space-y-4 text-neutral-300 body-base">
            <li className="flex items-start">
              <span className="text-[#00ff88] mr-3">•</span>
              <div>
                <strong className="text-white">Full-Stack Development:</strong> React, Node.js, Python, Java, and modern web technologies
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-[#00ff88] mr-3">•</span>
              <div>
                <strong className="text-white">Data Analysis:</strong> Pandas, NumPy, Scikit-learn, and statistical modeling
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-[#00ff88] mr-3">•</span>
              <div>
                <strong className="text-white">Cloud & DevOps:</strong> AWS services, API design, and scalable architectures
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="container-custom pb-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="heading-lg text-white mb-6">Explore My Work</h2>
          <ul className="space-y-4 text-neutral-300 body-base">
            <li className="flex items-start">
              <span className="text-[#00ff88] mr-3">•</span>
              <div>
                <button 
                  onClick={() => setActivePage("Resume")}
                  className="text-[#00ff88] hover:text-[#00cc6a] underline transition-colors text-left"
                >
                  <strong>Resume</strong>
                </button>
                <span className="text-neutral-400"> — Professional experience and technical skills</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-[#00ff88] mr-3">•</span>
              <div>
                <button 
                  onClick={() => setActivePage("Projects")}
                  className="text-[#00ff88] hover:text-[#00cc6a] underline transition-colors text-left"
                >
                  <strong>Projects</strong>
                </button>
                <span className="text-neutral-400"> — Data analysis and development work</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-[#00ff88] mr-3">•</span>
              <div>
                <button 
                  onClick={() => setActivePage("Games")}
                  className="text-[#00ff88] hover:text-[#00cc6a] underline transition-colors text-left"
                >
                  <strong>Interests</strong>
                </button>
                <span className="text-neutral-400"> — Games, reading, and ultimate frisbee</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-[#00ff88] mr-3">•</span>
              <div>
                <button 
                  onClick={() => setActivePage("Contact")}
                  className="text-[#00ff88] hover:text-[#00cc6a] underline transition-colors text-left"
                >
                  <strong>Contact</strong>
                </button>
                <span className="text-neutral-400"> — Get in touch for opportunities</span>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
