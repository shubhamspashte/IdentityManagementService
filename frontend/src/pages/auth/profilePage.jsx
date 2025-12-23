// src/pages/ProfilePage.jsx
import { useState, useEffect } from 'react';
import { BACKEND_URL } from '../../config';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/signin');
    return;
  }
  fetchProfile(token);
}, []);

async function fetchProfile(token) {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setProfile(response.data.data);
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Failed to fetch profile';
    setError(message);

    if (error?.response?.status === 401) {
      localStorage.removeItem('token');
      navigate('/signin');
    }
  } finally {
    setLoading(false);
  }
}

// Aadhaar masking
const maskedAadhaar = profile?.aadhaar
  ? 'XXXX XXXX ' + profile.aadhaar.slice(-4)
  : 'XXXX XXXX XXXX';


  function handleLogout() {
    localStorage.removeItem('token');
    alert('Logged out successfully');
    navigate('/signin');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="text-center">
            <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Profile</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/signin')}
              className="w-full py-2 px-4 bg-teal-500 text-white rounded hover:bg-teal-600 transition"
            >
              Go to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header/Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">Identity Management Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl shadow-lg p-6 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome back, {profile?.fullname}!</h2>
          <p className="text-teal-100">Here's your profile information and account details.</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-6">
            <div className="flex items-center gap-4">
              <div className="bg-teal-500 p-4 rounded-full">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">{profile?.fullname}</h2>
                <p className="text-gray-300 text-lg">{profile?.email}</p>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-8 space-y-8">
            {/* Basic Information Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl border border-gray-200 shadow-sm">
                  <label className="text-sm font-semibold text-gray-600 block mb-2">Full Name</label>
                  <p className="text-gray-900 font-bold text-lg">{profile?.fullname}</p>
                </div>

                {/* Email */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl border border-gray-200 shadow-sm">
                  <label className="text-sm font-semibold text-gray-600 block mb-2">Email Address</label>
                  <p className="text-gray-900 font-bold text-lg break-all">{profile?.email}</p>
                </div>

                {/* User ID */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl border border-gray-200 shadow-sm">
                  <label className="text-sm font-semibold text-gray-600 block mb-2">User ID</label>
                  <p className="text-gray-900 font-mono text-sm">{profile?._id}</p>
                </div>

                {/* Account Created */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl border border-gray-200 shadow-sm">
                  <label className="text-sm font-semibold text-gray-600 block mb-2">Member Since</label>
                  <p className="text-gray-900 font-bold text-lg">
                    {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Aadhaar Section - Highlighted */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure Identification
              </h3>
              
              {/* Aadhaar Card */}
              <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-amber-300 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <label className="text-sm font-bold text-amber-800 block mb-1 flex items-center gap-2">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Aadhaar Number (Decrypted & Masked)
                    </label>
                    <p className="text-xs text-amber-700 mb-3">Last 4 digits visible for security</p>
                  </div>
                  <div className="bg-amber-200 px-3 py-1 rounded-full">
                    <span className="text-xs font-bold text-amber-800">PROTECTED</span>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border-2 border-amber-200 mb-4">
                  <p className="text-gray-900 font-mono font-bold text-2xl tracking-widest text-center">
                    {maskedAadhaar}

                  </p>
                </div>
                
                <div className="bg-amber-100 p-4 rounded-lg border border-amber-200">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm text-amber-900">
                      <p className="font-semibold mb-1">Security Notice:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Your full Aadhaar number is encrypted with AES-256 in the database</li>
                        <li>• Only the last 4 digits are displayed for verification purposes</li>
                        <li>• This data is decrypted securely on the server before masking</li>
                        <li>• Your sensitive information is protected at all times</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Status */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Security & Privacy
              </h3>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-300 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-500 p-2 rounded-full">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-green-800 text-lg">Your Account is Secure</p>
                    <p className="text-sm text-green-700">All security measures are active and functioning</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-green-800 bg-white p-3 rounded-lg border border-green-200">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-semibold">JWT Authentication</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-800 bg-white p-3 rounded-lg border border-green-200">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-semibold">AES-256 Encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-800 bg-white p-3 rounded-lg border border-green-200">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-semibold">Secure Data Masking</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-800 bg-white p-3 rounded-lg border border-green-200">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-semibold">HTTPOnly Cookies</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};