"use client"

import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

const CountryCard = ({ country }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Format population with commas
  const formatPopulation = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  // Get region icon
  const getRegionIcon = (region) => {
    switch (region) {
      case "Africa":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        )
      case "Americas":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
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
        )
      case "Asia":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        )
      case "Europe":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        )
      case "Oceania":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
        )
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
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
        )
    }
  }

  // Load flag image
  useEffect(() => {
    const img = new Image()
    img.src = country.flags.png
    img.onload = () => setIsLoaded(true)
  }, [country.flags.png])

  return (
    <Link
      to={`/country/${country.cca3}`}
      className="block h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`h-full rounded-2xl overflow-hidden transition-all duration-500 transform ${isHovered ? "scale-[1.03]" : "scale-100"}`}
      >
        {/* Card with glass effect */}
        <div className="relative h-full bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 overflow-hidden group">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/80 via-gray-800/90 to-gray-900/95 z-0"></div>

          {/* Accent corner */}
          <div
            className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full blur-xl transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-50"}`}
          ></div>

          {/* Content container */}
          <div className="relative z-10 p-5 h-full flex flex-col">

            {/* Flag container */}
            <div className="relative mb-4 overflow-hidden rounded-xl aspect-video">
              {/* Flag image with shimmer effect while loading */}
              <div
                className={`absolute inset-0 bg-gray-700 animate-pulse ${isLoaded ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}
              ></div>
              <img
                src={country.flags.png || "/placeholder.svg"}
                alt={`Flag of ${country.name.common}`}
                className={`w-full h-full object-cover transition-all duration-700 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"} ${isHovered ? "scale-110" : "scale-100"}`}
              />

              {/* Flag overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? "opacity-70" : "opacity-0"}`}
              ></div>

              {/* View details button - only visible on hover */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
              >
                <span className="px-4 py-2 bg-teal-600/90 backdrop-blur-sm text-white text-sm font-medium rounded-full transform transition-transform duration-500 hover:scale-105">
                  View Details
                </span>
              </div>
            </div>

            {/* Country name */}
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{country.name.common}</h3>

            {/* Official name - only visible on hover */}
            <div
              className={`overflow-hidden transition-all duration-500 ${isHovered ? "max-h-10 opacity-100 mb-3" : "max-h-0 opacity-0"}`}
            >
              <p className="text-sm text-teal-300 italic line-clamp-2">{country.name.official}</p>
            </div>

            {/* Country details */}
            <div className="mt-auto space-y-2.5">
              {/* Region */}
              <div className="flex items-center text-sm">
                <div className="flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-gray-700/50 text-teal-400">
                  {getRegionIcon(country.region)}
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Region</p>
                  <p className="text-white font-medium">{country.region}</p>
                </div>
              </div>

              {/* Population */}
              <div className="flex items-center text-sm">
                <div className="flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-gray-700/50 text-teal-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Population</p>
                  <p className="text-white font-medium">{formatPopulation(country.population)}</p>
                </div>
              </div>

              {/* Capital */}
              <div className="flex items-center text-sm">
                <div className="flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-gray-700/50 text-teal-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Capital</p>
                  <p className="text-white font-medium">{country.capital?.[0] || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Bottom accent line with animation */}
            <div
              className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-700 ease-in-out ${isHovered ? "w-full" : "w-0"}`}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CountryCard
