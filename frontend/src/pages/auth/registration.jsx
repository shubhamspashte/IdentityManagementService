// src/pages/SignUpPage.jsx
import { useRef, useState } from 'react';
import { BACKEND_URL } from '../../config';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const SignUpPage = () => {
  const fullnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const aadhaarRef = useRef(null);
  const navigate = useNavigate();
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    const fullname = fullnameRef.current?.value.trim();
    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value;
    const aadhaar = aadhaarRef.current?.value.trim();

    if (!fullname) {
      newErrors.fullname = 'Full name is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!aadhaar) {
      newErrors.aadhaar = 'Aadhaar number is required';
    } else if (aadhaar.length !== 12) {
      newErrors.aadhaar = 'Aadhaar must be exactly 12 digits';
    } else if (!/^\d+$/.test(aadhaar)) {
      newErrors.aadhaar = 'Aadhaar must contain only numbers';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function signup(event) {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const fullname = fullnameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const aadhaar = aadhaarRef.current?.value;

    setLoading(true);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/users/register`,
        {
          fullname,
          email,
          password,
          aadhaar
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data.success) {
        alert(response.data.message || "User registered successfully");
        navigate('/signin');
      }

    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const handleAadhaarInput = (e) => {
    // Only allow numbers and limit to 12 digits
    const value = e.target.value.replace(/\D/g, '');
    if (aadhaarRef.current) {
      aadhaarRef.current.value = value.slice(0, 12);
    }
  };

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
            Join us today <br />
            <span className="text-teal-500">Identity Management</span>
          </h1>
        </div>
      </div>

      {/* Right side form */}
      <div className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm space-y-4">
          <h2 className="text-2xl font-bold text-center">Create Account</h2>
          <h6 className="font-semibold text-gray-800 text-center">
            Sign up to start managing your identity account.
          </h6>
          
          <form onSubmit={signup} className="space-y-3">
            {/* Full Name */}
            <div className="space-y-1">
              <label htmlFor="fullname" className="text-sm text-gray-900">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                ref={fullnameRef}
                id="fullname"
                type="text"
                placeholder="John Doe"
                className={`w-full px-4 py-2 bg-white rounded border ${
                  errors.fullname ? 'border-red-500' : 'border-gray-300'
                } text-black focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
              {errors.fullname && (
                <p className="text-xs text-red-500">{errors.fullname}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm text-gray-900">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                ref={emailRef}
                id="email"
                type="email"
                placeholder="your@email.com"
                className={`w-full px-4 py-2 bg-white rounded border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } text-black focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Aadhaar Number */}
            <div className="space-y-1">
              <label htmlFor="aadhaar" className="text-sm text-gray-900">
                Aadhaar Number <span className="text-red-500">*</span>
                <span className="text-xs text-gray-500 ml-2">(Will be encrypted)</span>
              </label>
              <input
                ref={aadhaarRef}
                id="aadhaar"
                type="text"
                placeholder="123456789012"
                maxLength="12"
                onInput={handleAadhaarInput}
                className={`w-full px-4 py-2 bg-white rounded border ${
                  errors.aadhaar ? 'border-red-500' : 'border-gray-300'
                } text-black focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono`}
              />
              {errors.aadhaar && (
                <p className="text-xs text-red-500">{errors.aadhaar}</p>
              )}
              <p className="text-xs text-gray-500">
                {aadhaarRef.current?.value?.length || 0}/12 digits
              </p>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label htmlFor="password" className="text-sm text-gray-900">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                ref={passwordRef}
                id="password"
                type="password"
                placeholder="••••••••"
                className={`w-full px-4 py-2 bg-white rounded border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } text-black focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password}</p>
              )}
              <p className="text-xs text-gray-500">Minimum 6 characters</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-4 rounded bg-teal-500 text-white font-semibold hover:bg-teal-400 transition disabled:bg-teal-300 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center">
            By signing up, you agree to the{' '}
            <span className="underline cursor-pointer">Terms of Service</span> and{' '}
            <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>
          <p className="mt-2 text-sm text-center text-gray-600">
            Already have an account?{' '}
            <span onClick={() => navigate('/signin')} className="text-teal-600 hover:underline cursor-pointer">
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};