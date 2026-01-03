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
      <div className="bg-neutral-800 border-b border-neutral-700">
        <div className="container-custom py-12">
          <div className="text-center mb-8">
            <h1 className="heading-xl text-[#00ff88] mb-4">Get In Touch</h1>
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
              <div className="bg-neutral-800/50 border border-neutral-700 rounded-none p-8">
                <h2 className="heading-lg text-[#00ff88] mb-6">
                  Send a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
        <div>
                    <label className="block text-neutral-300 font-medium mb-2 body-base" htmlFor="name">
                      Name *
                    </label>
          <input
                      className="w-full px-4 py-3 rounded-none bg-neutral-700/50 text-white border border-neutral-600 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500/25 transition-all duration-300"
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
                      className="w-full px-4 py-3 rounded-none bg-neutral-700/50 text-white border border-neutral-600 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500/25 transition-all duration-300"
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
                      className="w-full px-4 py-3 rounded-none bg-neutral-700/50 text-white border border-neutral-600 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/25 transition-all duration-300 resize-vertical"
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
                    className="w-full py-4 px-6 bg-neutral-700 hover:bg-neutral-600 text-[#00ff88] font-medium rounded-none transition-all duration-300"
        >
                    Send Message
        </button>
      </form>
                
                {/* Status Messages */}
                {sent && (
                  <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-none animate-fade-in">
                    <p className="text-success">
                      Message sent successfully! I'll get back to you soon.
                    </p>
                  </div>
                )}
                
                {error && (
                  <div className="mt-6 p-4 bg-error/10 border border-error/20 rounded-none animate-fade-in">
                    <p className="text-error">
                      {error}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="animate-slide-up">
              <div className="space-y-8">
                {/* Direct Contact */}
                <div className="bg-neutral-800/50 border border-neutral-700 rounded-none p-8">
                  <h3 className="heading-md text-white mb-6">
                    Direct Contact
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-neutral-400 body-sm">Email</p>
                      <a 
                        href="mailto:zachriley36@gmail.com" 
                        className="text-[#00ff88] hover:text-[#00cc6a] transition-colors body-base font-medium"
                      >
                        ZachRiley36@gmail.com
                      </a>
                    </div>
                    
                    <div>
                      <p className="text-neutral-400 body-sm">Phone</p>
                      <p className="text-white body-base font-medium">(413) 992-8202</p>
                    </div>
                    
                    <div>
                      <p className="text-neutral-400 body-sm">Location</p>
                      <p className="text-white body-base font-medium">Brooklyn, NY</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-neutral-800/50 border border-neutral-700 rounded-none p-8">
                  <h3 className="heading-md text-white mb-6">
                    Connect Online
                  </h3>
                  
                  <div className="flex flex-col space-y-4">
        <a
          href="https://www.linkedin.com/in/zdriley/"
          target="_blank"
          rel="noopener noreferrer"
                      className="flex items-center p-4 bg-neutral-700/30 hover:bg-neutral-700/50 rounded-none border border-neutral-600 hover:border-neutral-500 transition-all duration-300 group"
                    >
                      <div className="flex-1">
                        <p className="text-[#00ff88] font-medium transition-colors">LinkedIn</p>
                        <p className="text-neutral-400 body-sm">Professional network & experience</p>
                      </div>
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
