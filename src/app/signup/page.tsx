'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; // useRouter from next/navigation for navigation
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';

// Define the shape of the input values
interface InputValues {
  email: string;
  password: string;
  username: string;
}

const Signup: React.FC = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<InputValues>({
    email: '',
    password: '',
    username: '',
  });

  const { email, password, username } = inputValue;

  // Handle change event for form inputs
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  // Handle errors with toast notifications
  const handleError = (err: string) =>
    toast.error(err, {
      position: 'bottom-left',
    });

  // Handle success with toast notifications
  const handleSuccess = (msg: string) =>
    toast.success(msg, {
      position: 'bottom-right',
    });

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:5050/auth/signup',
        { ...inputValue },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          router.push('/'); // Using router.push to navigate
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
      handleError('Signup failed');
    }
    setInputValue({
      email: '',
      password: '',
      username: '',
    });
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-base-200 p-8 pt-4">
      <div className="card w-full max-w-sm bg-base-100 shadow-2xl">
        <div className="card-body">
          <h2 className="mb-4 text-center text-2xl font-bold">Signup Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={handleOnChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control mb-4">
              <label htmlFor="username" className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                value={username}
                placeholder="Enter your username"
                onChange={handleOnChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control mb-4">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={handleOnChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <span className="label-text-alt mt-2">
              Already have an account?{' '}
              <Link href="/login" className="text-primary">
                Login
              </Link>
            </span>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Signup;
