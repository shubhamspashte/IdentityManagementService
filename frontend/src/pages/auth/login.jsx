// src/pages/SignInPage.jsx
import { useRef } from 'react';
import { BACKEND_URL } from '../../config';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

export const SignInPage = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const location = useLocation();
  const redirectTo = location.state?.from || "/profile";
  const navigate = useNavigate();

  async function signin(event) {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const response = await axios.post(`${BACKEND_URL}/api/users/login`, {
        email,
        password
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true // Important: This allows cookies to be set
      });

      const accessToken = response.data.data.accessToken;
      if (accessToken) {
        // Store token in localStorage as backup (cookies are primary)
        localStorage.setItem("token", accessToken);
      }

      alert(response.data.message || "Signed In Successfully");
      navigate(redirectTo);

    } catch (error) {
      const message = error?.response?.data?.message || "Invalid credentials";
      alert(message);
    }
  }

  return (
    <div className="min-h-screen flex bg-[#f5f5f5] text-black font-sans">
      {/* Left section with image and heading */}
      <div className="w-1/3 relative hidden lg:flex flex-col justify-center items-center">
        <img
          src="https://www.shutterstock.com/shutterstock/photos/2126331983/display_1500/stock-photo-digital-transformation-technology-strategy-digitization-and-digitalization-of-business-processes-2126331983.jpg"
          alt="Background"
          className="absolute inset-0 object-cover w-full h-full z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#191919] via-black/50 to-transparent z-10" />
        <div className="relative z-20 p-8 text-center text-white">
          <h1 className="text-4xl font-bold leading-snug">
            Your Identity, Manage better <br />
            <span className="text-teal-500">Identity Management</span>
          </h1>
        </div>
      </div>

      {/* Right side form */}
      <div className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm space-y-4">
          <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
          <h6 className="font-semibold text-gray-800 text-center">
            Sign in to manage your identity account.
          </h6>
          <form onSubmit={signin} className="space-y-1">
            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm text-gray-900">Email Address</label>
              <input
                ref={emailRef}
                id="email"
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-2 bg-white rounded border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label htmlFor="password" className="text-sm text-gray-900">Password</label>
              <input
                ref={passwordRef}
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-white rounded border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 mt-4 rounded bg-teal-500 text-white font-semibold hover:bg-teal-400 transition"
            >
              Sign In
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center">
            By signing in, you agree to the{' '}
            <span className="underline cursor-pointer">Terms of Service</span> and{' '}
            <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>
          <p className="mt-2 text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <span onClick={() => navigate('/signup')} className="text-teal-600 hover:underline cursor-pointer">
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};