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
    <div className="hero flex min-h-fit justify-center">
      <div className="flex-col">
        <div className="text-left">
          <h2 className="flex items-center text-3xl font-bold text-base-content">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={32}
              height={32}
              fill="currentColor"
              className="ml-4 mr-8 h-8 w-8 bg-base-300 text-base-300 shadow-glowPrimary"
            >
              <path d="M19.732 7.203V4.537h-7.464v2.666H3.205v20.259h25.59V7.203zm-6.398-1.599h5.331v1.599h-5.331zM12.268 8.27h15.461v8.53h-7.997v-2.133h-7.464V16.8H4.271V8.27zm6.398 7.463v3.199h-5.331v-3.199zM4.271 26.396v-8.53h7.997v2.133h7.464v-2.133h7.997v8.53z" />
            </svg>
            Contact Me
          </h2>
          <p className="my-6 flex px-4 py-6 text-left">
            Feel free to reach out for any inquiries or questions. I’m here to help and look forward
            to connecting with you!
          </p>
          {successMessage && <p className="mb-4 text-success">{successMessage}</p>}
        </div>
        <div className="shadow-1xl card mx-auto w-full max-w-lg bg-base-100 shadow-lg sm:max-w-full">
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
                className="input input-bordered text-xs"
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
                className="input input-bordered text-xs"
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
                className="textarea textarea-bordered h-32 text-xs"
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full font-semibold">
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
