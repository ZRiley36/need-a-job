// components/pages/Home.tsx
type PageKey = "Home" | "Resume" | "Projects" | "Games" | "Contact";

interface HomeProps {
  setActivePage: (page: PageKey) => void;
}

export function Home({ setActivePage }: HomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      {/* Hero Section */}
      <section className="container-custom py-20 md:py-32">
        <div className="text-center animate-slide-up">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-primary-400 rounded-full mr-2 animate-pulse"></span>
              Available for new opportunities
            </div>
          </div>
          
          <h1 className="heading-display text-white mb-6 max-w-4xl mx-auto">
            Building <span className="purple-text-gradient">innovative solutions</span> through
            <span className="purple-text-gradient"> clean code</span> and
            <span className="purple-text-gradient"> thoughtful design</span>
          </h1>
          
          <p className="body-lg text-neutral-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            Computer Science graduate with hands-on experience at Amazon and Digital Democracy. 
            I specialize in full-stack development, API design, and data analysis, bringing both 
            technical expertise and analytical thinking to every project.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:zachriley36@gmail.com"
              className="inline-flex items-center px-8 py-4 purple-gradient hover:shadow-lg purple-glow text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Get In Touch
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a 
              href="https://linkedin.com/in/zdriley" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 border border-neutral-600 text-neutral-300 hover:text-white hover:border-neutral-500 font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              View LinkedIn
              <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="container-custom pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-xl p-8 text-center hover:bg-neutral-800/70 transition-all duration-300 transform hover:scale-105">
            <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="heading-sm text-white mb-3">Full-Stack Development</h3>
            <p className="text-neutral-400 body-base">React, Node.js, Python, Java, and modern web technologies</p>
          </div>
          
          <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-xl p-8 text-center hover:bg-neutral-800/70 transition-all duration-300 transform hover:scale-105">
            <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="heading-sm text-white mb-3">Data Analysis</h3>
            <p className="text-neutral-400 body-base">Pandas, NumPy, Scikit-learn, and statistical modeling</p>
          </div>
          
          <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-xl p-8 text-center hover:bg-neutral-800/70 transition-all duration-300 transform hover:scale-105">
            <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </div>
            <h3 className="heading-sm text-white mb-3">Cloud & DevOps</h3>
            <p className="text-neutral-400 body-base">AWS services, API design, and scalable architectures</p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="container-custom pb-20">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-white mb-4">Explore My Work</h2>
          <p className="text-neutral-400 body-base">Learn more about my experience, projects, and interests</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            onClick={() => setActivePage("Resume")}
            className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 rounded-lg p-6 hover:border-primary-500/50 transition-all duration-300 cursor-pointer group hover:purple-glow transform hover:scale-105"
          >
            <h3 className="heading-sm text-white mb-2 group-hover:purple-text-gradient transition-colors">Resume</h3>
            <p className="text-neutral-400 body-sm">Professional experience and technical skills</p>
          </div>
          
          <div 
            onClick={() => setActivePage("Projects")}
            className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 rounded-lg p-6 hover:border-primary-500/50 transition-all duration-300 cursor-pointer group hover:purple-glow transform hover:scale-105"
          >
            <h3 className="heading-sm text-white mb-2 group-hover:purple-text-gradient transition-colors">Projects</h3>
            <p className="text-neutral-400 body-sm">Data analysis and development work</p>
          </div>
          
          <div 
            onClick={() => setActivePage("Games")}
            className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 rounded-lg p-6 hover:border-primary-500/50 transition-all duration-300 cursor-pointer group hover:purple-glow transform hover:scale-105"
          >
            <h3 className="heading-sm text-white mb-2 group-hover:purple-text-gradient transition-colors">Games</h3>
            <p className="text-neutral-400 body-sm">Interactive chess, snake, and tetris games</p>
          </div>
          
          <div 
            onClick={() => setActivePage("Contact")}
            className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 rounded-lg p-6 hover:border-primary-500/50 transition-all duration-300 cursor-pointer group hover:purple-glow transform hover:scale-105"
          >
            <h3 className="heading-sm text-white mb-2 group-hover:purple-text-gradient transition-colors">Contact</h3>
            <p className="text-neutral-400 body-sm">Get in touch for opportunities</p>
          </div>
        </div>
      </section>
    </div>
  );
}
