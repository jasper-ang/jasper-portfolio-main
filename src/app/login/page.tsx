'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';

// Define the shape of the input values
interface InputValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<InputValues>({
    email: '',
    password: '',
  });

  const { email, password } = inputValue;

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
      position: 'bottom-left',
    });

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'https://portfolio-backend-j7e4.onrender.com/auth/login',
        { ...inputValue },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        window.location.href = '/'; // Force a full page reload to reset context
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
      handleError('Login failed');
    }
    setInputValue({
      email: '',
      password: '',
    });
  };

  return (
    <div className="flex items-start justify-center bg-base-200 p-8 pt-4">
      <div className="card my-8 w-full max-w-sm bg-base-100 shadow-2xl">
        <div className="card-body">
          <h2 className="mb-4 text-center text-2xl font-bold">Login Account</h2>
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
            <div className="form-control my-6">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            {/*hidding the sign up button for later use*}
            {/* <span className="label-text-alt mt-2">
              Create an account{' '}
              <Link href="/signup" className="text-primary">
                Sign up
              </Link>
            </span> */}
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
