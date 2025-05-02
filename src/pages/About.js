import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-hard overflow-hidden max-w-6xl mx-auto my-8 mt-20">
      {/* Header Section */}
      <div className="p-6 md:p-8 bg-popover/80 backdrop-blur-sm border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-popover text-white rounded-full hover:bg-accent transition-all duration-300 shadow-sm font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
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
          <h1 className="text-2xl font-bold text-white">About This Project</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Project Description */}
          <div className="space-y-6">
            <div className="bg-popover p-6 rounded-xl shadow-sm border border-gray-700/50">
              <h2 className="text-xl font-bold text-white mb-4">Project Overview</h2>
              <p className="text-gray-300">
                This application provides comprehensive country information including 
                demographics, geography, currencies and more. Designed for travelers, 
                students, and geography enthusiasts to explore world data in an 
                intuitive interface.
              </p>
            </div>

            {/* Features */}
            <div className="bg-popover p-6 rounded-xl shadow-sm border border-gray-700/50">
              <h2 className="text-xl font-bold text-white mb-4">Key Features</h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-teal-400 mr-2">•</span>
                  Detailed country profiles with 50+ data points
                </li>
                <li className="flex items-start">
                  <span className="text-teal-400 mr-2">•</span>
                  Interactive maps and border country navigation
                </li>
                <li className="flex items-start">
                  <span className="text-teal-400 mr-2">•</span>
                  Responsive design works on all devices
                </li>
                <li className="flex items-start">
                  <span className="text-teal-400 mr-2">•</span>
                  Dark/light mode support
                </li>
                <li className="flex items-start">
                  <span className="text-teal-400 mr-2">•</span>
                  Fast, searchable interface
                </li>
              </ul>
            </div>
          </div>

          {/* Tech Stack & Team */}
          <div className="space-y-6">
            {/* Technology */}
            <div className="bg-popover p-6 rounded-xl shadow-sm border border-gray-700/50">
              <h2 className="text-xl font-bold text-white mb-4">Technology Stack</h2>
              <div className="grid grid-cols-2 gap-3 text-gray-300">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-teal-400 mr-2"></div>
                  React.js
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-teal-400 mr-2"></div>
                  TypeScript
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-teal-400 mr-2"></div>
                  Tailwind CSS
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-teal-400 mr-2"></div>
                  REST Countries API
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-teal-400 mr-2"></div>
                  Create React App
                </div>
              </div>
            </div>

            {/* Data Sources */}
            <div className="bg-popover p-6 rounded-xl shadow-sm border border-gray-700/50">
              <h2 className="text-xl font-bold text-white mb-4">Data Sources</h2>
              <p className="text-gray-300 mb-4">
                Country data is sourced from reliable, up-to-date APIs and databases:
              </p>
              <a
                href="https://restcountries.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-teal-400 hover:text-teal-300"
              >
                REST Countries API
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
            
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-popover/80 backdrop-blur-sm border-t border-gray-700/50 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Country Explorer. All rights reserved.
      </div>
    </div>
  );
};

export default AboutPage;