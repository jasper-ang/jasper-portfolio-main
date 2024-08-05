'use client';

import React, { useState } from 'react';
import emailjs from 'emailjs-com';

// Define form structure locally
interface FormStructure {
  name: string;
  email: string;
  message: string;
}

const DEFAULT_FORM_STRUCTURE: FormStructure = {
  name: '',
  email: '',
  message: '',
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormStructure>(DEFAULT_FORM_STRUCTURE);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          reply_to: formData.email,
        },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      )
      .then(
        result => {
          console.log('Email sent successfully:', result.text);
          setSuccessMessage('Welcome to the club ;)');
        },
        error => {
          console.error('Error sending email:', error.text);
        }
      );

    setFormData(DEFAULT_FORM_STRUCTURE);
  };

  return (
    <section className="bg-[#0d1117] p-8 text-center flex flex-col items-center min-h-screen">
      <h2 className="text-4xl font-bold mb-6 text-[#c9d1d9]">Contact Me</h2>
      {successMessage && <p className="text-[#238636] mb-4">{successMessage}</p>}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mx-auto bg-[#161b22] p-8 rounded-lg shadow-xl space-y-6"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-[#30363d] rounded-lg bg-[#0d1117] text-[#c9d1d9] placeholder-gray-500 focus:outline-none focus:border-[#58a6ff] transition-colors"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-[#30363d] rounded-lg bg-[#0d1117] text-[#c9d1d9] placeholder-gray-500 focus:outline-none focus:border-[#58a6ff] transition-colors"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-[#30363d] rounded-lg bg-[#0d1117] text-[#c9d1d9] placeholder-gray-500 focus:outline-none focus:border-[#58a6ff] transition-colors h-32"
        />
        <button
          type="submit"
          className="w-full px-4 py-3 bg-[#58a6ff] text-white rounded-lg hover:bg-[#1f6feb] transition-colors"
        >
          Send
        </button>
      </form>
    </section>
  );
};

export default Contact;
