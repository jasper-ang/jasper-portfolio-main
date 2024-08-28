'use client';

import React, { useState } from 'react';
import emailjs from 'emailjs-com';

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
    <div className="hero flex min-h-fit justify-center bg-base-200">
      <div className="flex-col">
        <div className="text-left">
          <h2 className="text-3xl font-bold">Contact Me</h2>
          <p className="my-6 flex py-6 text-left">
            Feel free to reach out for any inquiries or questions. I’m here to help and look forward
            to connecting with you!
          </p>
          {successMessage && <p className="mb-4 text-success">{successMessage}</p>}
        </div>
        <div className="shadow-1xl card mx-auto w-full max-w-full bg-base-100 lg:max-w-lg">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="textarea textarea-bordered"
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
