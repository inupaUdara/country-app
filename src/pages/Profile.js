import { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const Profile = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-900 transition-opacity duration-300 mt-32 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
      {/* Header */}
      <header className="backdrop-blur-sm border-b border-gray-700/50 p-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </Link>
          <h1 className="text-xl font-bold text-white">Your Profile</h1>
          <div className="w-5"></div> {/* Spacer for balance */}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto p-4 md:p-8">
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-hard p-6 border border-gray-700/50">
          {/* Profile Avatar */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white text-center">{user.name}</h2>
          </div>

          {/* User Details */}
          <div className="space-y-4 mb-8">
            <div className="bg-popover p-4 rounded-xl shadow-sm border border-gray-700/50">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Name
              </h3>
              <p className="text-white font-medium">{user.name}</p>
            </div>

            <div className="bg-popover p-4 rounded-xl shadow-sm border border-gray-700/50">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Email
              </h3>
              <p className="text-white font-medium">{user.email}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">        
            <button
              onClick={logout}
              className="w-full py-3 px-4 rounded-full text-base font-medium text-white bg-gray-700 hover:bg-gray-600 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <path d="M16 17l5-5-5-5" />
                <path d="M21 12h-9" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;