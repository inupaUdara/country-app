"use client"

import { Link } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"

const Header = () => {
  const { user, logout } = useContext(AuthContext)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/90 backdrop-blur-md shadow-lg py-3 border-b border-gray-800"
          : "bg-gradient-to-r from-teal-900 to-cyan-900 py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 group">
          {/* <div
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 group-hover:rotate-12 ${
              scrolled ? "bg-gradient-to-br from-teal-600 to-cyan-600 shadow-teal-900/30" : "bg-gray-800"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-7 w-7 transition-colors duration-300 ${scrolled ? "text-white" : "text-teal-400"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div> */}
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span
              className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
                scrolled ? "text-teal-400" : "text-white"
              }`}
            >
              Global Explorer
            </span>
            <p
              className={`text-xs font-medium transition-colors duration-300 ${
                scrolled ? "text-gray-400" : "text-teal-200"
              }`}
            >
              by Rest Countries
            </p>
          </div>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link
            to="/about"
            className={`hidden md:inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              scrolled
                ? "text-teal-400 hover:text-white"
                : "text-teal-200 hover:text-white"
            }`}
          >
            About
          </Link>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <span
                className={`hidden sm:inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  scrolled
                    ? "bg-gray-800 text-teal-400 border border-gray-700"
                    : "bg-gray-800/30 text-white backdrop-blur-sm"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                {user.name}
              </span>
              <button
                onClick={logout}
                className={`flex items-center px-5 py-2.5 rounded-full transition-all duration-300 shadow-md font-medium ${
                  scrolled
                    ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:from-teal-700 hover:to-cyan-700 shadow-teal-900/30"
                    : "bg-gray-800 text-teal-400 hover:bg-gray-700"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
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
                <span className="font-medium">Logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className={`flex items-center px-5 py-2.5 rounded-full transition-all duration-300 shadow-md font-medium ${
                scrolled
                  ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:from-teal-700 hover:to-cyan-700 shadow-teal-900/30"
                  : "bg-gray-800 text-teal-400 hover:bg-gray-700"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header