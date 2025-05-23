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
    <div className="max-w-md mx-auto mt-8 p-6 bg-black text-left">
      <h2 className="text-2xl font-bold mb-4 text-brand">Contact Me</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1 text-gray-300" htmlFor="name">Name</label>
          <input
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-brand"
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-300" htmlFor="email">Email</label>
          <input
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-brand"
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-300" htmlFor="message">Message</label>
          <textarea
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-brand"
            id="message"
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-brand text-white rounded hover:bg-brand-dark transition"
        >
          Send Email
        </button>
      </form>
      {sent && <div className="mt-4 text-green-400">Message sent!</div>}
      {error && <div className="mt-4 text-red-400">{error}</div>}
      <div className="mt-6 text-gray-400">
        Or email me directly at <a href="mailto:zachriley36@gmail.com" className="text-purple-400 hover:text-blue-700 underline">ZachRiley36@gmail.com</a>
        <br />
        Find me on{" "}
        <a
          href="https://www.linkedin.com/in/zdriley/"
          className="text-blue-500 hover:text-blue-700 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}
