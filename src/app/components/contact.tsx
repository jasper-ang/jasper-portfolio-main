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
    <section className="bg-[#1a1a1a] p-8 text-[#e5e7eb]">
      <h2 className="mb-6 text-4xl font-bold text-[#c9d1d9]">Contact Me</h2>
      {successMessage && <p className="mb-4 text-[#238636]">{successMessage}</p>}
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-lg space-y-6 rounded-lg bg-[#1a1a1a] p-8 font-bold shadow-xl"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-[#30363d] bg-[#0d1117] px-4 py-3 text-[#c9d1d9] placeholder-gray-500 transition-colors focus:border-[#6d44c1] focus:outline-none"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-[#30363d] bg-[#0d1117] px-4 py-3 text-[#c9d1d9] placeholder-gray-500 transition-colors focus:border-[#6d44c1] focus:outline-none"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          className="h-32 w-full rounded-lg border border-[#30363d] bg-[#0d1117] px-4 py-3 text-[#c9d1d9] placeholder-gray-500 transition-colors focus:border-[#6d44c1] focus:outline-none"
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-[#6d44c1] px-4 py-3 text-white transition-colors hover:bg-[#6d44c1]"
        >
          Send
        </button>
      </form>
    </section>
  );
};

export default Contact;
