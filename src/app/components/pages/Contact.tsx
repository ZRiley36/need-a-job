// components/pages/Contact.tsx
import { useState } from "react";
import emailjs from "emailjs-com";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSent(false);

    emailjs.send(
      "service_8ra9tpd",    // Replace with your EmailJS service ID
      "template_a5leuj8",   // Replace with your EmailJS template ID
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      },
      "a3sat_nZoQzR3ZYo0"     // Replace with your EmailJS public key (user ID)
    )
    .then(() => {
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    })
    .catch(() => {
      setError("Failed to send. Please try again later.");
    });
  };

  return (
    <div className="bg-neutral-900 text-neutral-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-neutral-800 to-neutral-900 border-b border-neutral-700">
        <div className="container-custom py-12">
          <div className="text-center mb-8">
            <h1 className="heading-xl text-white mb-4">Get In Touch</h1>
            <p className="text-neutral-400 body-base max-w-2xl mx-auto">
              I'm always interested in new opportunities and collaborations. 
              Send me a message and I'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-slide-up">
              <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-8">
                <h2 className="heading-lg text-primary-400 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center mr-3">
                    ✉️
                  </span>
                  Send a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
        <div>
                    <label className="block text-neutral-300 font-medium mb-2 body-base" htmlFor="name">
                      Name *
                    </label>
          <input
                      className="w-full px-4 py-3 rounded-lg bg-neutral-700/50 text-white border border-neutral-600 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/25 transition-all duration-300"
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
                      placeholder="Your full name"
            required
          />
        </div>
                  
        <div>
                    <label className="block text-neutral-300 font-medium mb-2 body-base" htmlFor="email">
                      Email *
                    </label>
          <input
                      className="w-full px-4 py-3 rounded-lg bg-neutral-700/50 text-white border border-neutral-600 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/25 transition-all duration-300"
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
                      placeholder="your.email@example.com"
            required
          />
        </div>
                  
        <div>
                    <label className="block text-neutral-300 font-medium mb-2 body-base" htmlFor="message">
                      Message *
                    </label>
          <textarea
                      className="w-full px-4 py-3 rounded-lg bg-neutral-700/50 text-white border border-neutral-600 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/25 transition-all duration-300 resize-vertical"
            id="message"
            name="message"
                      rows={5}
            value={form.message}
            onChange={handleChange}
                      placeholder="Tell me about your project, opportunity, or just say hello..."
            required
          />
        </div>
                  
        <button
          type="submit"
                    className="w-full py-4 px-6 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-primary-500/25"
        >
                    Send Message
        </button>
      </form>
                
                {/* Status Messages */}
                {sent && (
                  <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg animate-fade-in">
                    <div className="flex items-center text-success">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Message sent successfully! I'll get back to you soon.
                    </div>
                  </div>
                )}
                
                {error && (
                  <div className="mt-6 p-4 bg-error/10 border border-error/20 rounded-lg animate-fade-in">
                    <div className="flex items-center text-error">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {error}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="animate-slide-up">
              <div className="space-y-8">
                {/* Direct Contact */}
                <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-8">
                  <h3 className="heading-md text-white mb-6 flex items-center">
                    <span className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center mr-3">
                      📱
                    </span>
                    Direct Contact
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center group">
                      <div className="w-10 h-10 bg-neutral-700/50 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary-500/20 transition-colors">
                        <svg className="w-5 h-5 text-neutral-400 group-hover:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-neutral-400 body-sm">Email</p>
                        <a 
                          href="mailto:zachriley36@gmail.com" 
                          className="text-primary-400 hover:text-primary-300 transition-colors body-base font-medium"
                        >
                          ZachRiley36@gmail.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center group">
                      <div className="w-10 h-10 bg-neutral-700/50 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary-500/20 transition-colors">
                        <svg className="w-5 h-5 text-neutral-400 group-hover:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-neutral-400 body-sm">Phone</p>
                        <p className="text-white body-base font-medium">(413) 992-8202</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center group">
                      <div className="w-10 h-10 bg-neutral-700/50 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary-500/20 transition-colors">
                        <svg className="w-5 h-5 text-neutral-400 group-hover:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-neutral-400 body-sm">Location</p>
                        <p className="text-white body-base font-medium">Brooklyn, NY</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-8">
                  <h3 className="heading-md text-white mb-6 flex items-center">
                    <span className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center mr-3">
                      🔗
                    </span>
                    Connect Online
                  </h3>
                  
                  <div className="flex flex-col space-y-4">
        <a
          href="https://www.linkedin.com/in/zdriley/"
          target="_blank"
          rel="noopener noreferrer"
                      className="flex items-center p-4 bg-neutral-700/30 hover:bg-neutral-700/50 rounded-lg border border-neutral-600 hover:border-primary-500/50 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4">
                        <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium group-hover:text-primary-400 transition-colors">LinkedIn</p>
                        <p className="text-neutral-400 body-sm">Professional network & experience</p>
                      </div>
                      <svg className="w-5 h-5 text-neutral-400 group-hover:text-primary-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
