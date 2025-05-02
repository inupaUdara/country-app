import { useState, useEffect, useRef } from "react";
import { useCountries } from "../hooks/useCountries";
import Search from "../components/Search";
import Filter from "../components/Filter";
import CountryCard from "../components/CountryCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";

const Home = () => {
  const {
    countries,
    loading,
    error,
    searchCountries,
    filterByRegion,
    fetchAllCountries,
    filterByCurrency,
    filterByLanguage,
  } = useCountries();
  const [searchMode, setSearchMode] = useState(false);
  const [animatedItems, setAnimatedItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);
  const cardsSectionRef = useRef(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(8)

  // Get current countries
  const indexOfLastCountry = currentPage * itemsPerPage
  const indexOfFirstCountry = indexOfLastCountry - itemsPerPage
  const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry)
  const totalPages = Math.ceil(countries.length / itemsPerPage)

  const handleSearch = (term) => {
    if (!term.trim()) {
      fetchAllCountries();
      setSearchMode(false);
      return;
    }
    searchCountries(term);
    setSearchMode(true);
    setActiveFilter("search");
    setCurrentPage(1)

    // Scroll to cards section
  setTimeout(() => {
    cardsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }, 100);
  };

  const handleFilter = (type, value) => {
    if (value) {
      if (type === "region") filterByRegion(value);
      if (type === "language") filterByLanguage(value);
      if (type === "currency") filterByCurrency(value);
      setSearchMode(true);
      setActiveFilter(type);
    } else {
      fetchAllCountries();
      setSearchMode(false);
      setActiveFilter(null);
    }
    setCurrentPage(1)
  };

  const resetFilters = () => {
    fetchAllCountries();
    setSearchMode(false);
    setActiveFilter(null);
    setCurrentPage(1)
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    // Scroll to top when changing page
    // window.scrollTo({
    //   top: 10,
    //   behavior: "smooth",
    // })

     // Scroll to cards section
  setTimeout(() => {
    cardsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }, 100);
  }

  // Animate cards on load
  useEffect(() => {
    if (!loading && countries.length > 0) {
      const timer = setTimeout(() => {
        setAnimatedItems(countries.map((_, i) => i));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading, countries]);

  if (error) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center border border-indigo-100 transform hover:scale-105 transition-transform duration-500">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-indigo-900 mb-4">Oops!</h2>
          <p className="text-indigo-600 mb-8 text-lg">{error}</p>
          <button
            onClick={resetFilters}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg font-medium transform hover:scale-105"
          >
            Show All Countries
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-16 bg-gray-900">
      {/* Hero Section */}
      {/* <div className="relative mb-16">
        <div className="absolute inset-0 "></div>
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
              Explore Our Beautiful World
            </h1>
            <p className="text-indigo-100 text-xl max-w-2xl mx-auto">
              Discover countries, cultures, and fascinating facts from around
              the globe
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white p-4 rounded-2xl shadow-2xl">
            <div className="flex flex-col gap-4">
              <div className="flex-1">
                <Search onSearch={handleSearch} />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/3">
                <Filter
                  type="region"
                  onFilter={(value) => handleFilter("region", value)}
                  active={activeFilter === "region"}
                />
              </div>
              <div className="md:w-1/3">
                <Filter
                  type="language"
                  onFilter={(value) => handleFilter("language", value)}
                  active={activeFilter === "language"}
                />
              </div>
              <div className="md:w-1/3">
                <Filter
                  type="currency"
                  onFilter={(value) => handleFilter("currency", value)}
                  active={activeFilter === "currency"}
                />

              </div>
              </div>
            </div>

            {searchMode && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-2 px-5 py-2 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-all duration-300 font-medium"
                >
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
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div> */}

      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gray-900 z-0"></div>

        {/* Animated Globe Background */}
        <div className="absolute inset-0 opacity-10 z-0">
          <div className="absolute w-full h-full bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center animate-pulse"></div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/90 to-gray-900 z-0"></div>

        {/* Animated Particles */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute top-20 left-1/4 w-2 h-2 rounded-full bg-teal-400 opacity-70 animate-ping"
            style={{ animationDuration: "3s", animationDelay: "0.2s" }}
          ></div>
          <div
            className="absolute top-40 left-1/3 w-3 h-3 rounded-full bg-cyan-400 opacity-50 animate-ping"
            style={{ animationDuration: "4s", animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-60 left-2/3 w-2 h-2 rounded-full bg-teal-400 opacity-60 animate-ping"
            style={{ animationDuration: "5s", animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute top-80 left-1/5 w-2 h-2 rounded-full bg-cyan-400 opacity-70 animate-ping"
            style={{ animationDuration: "3.5s", animationDelay: "1.5s" }}
          ></div>
          <div
            className="absolute top-30 left-3/4 w-3 h-3 rounded-full bg-teal-400 opacity-50 animate-ping"
            style={{ animationDuration: "4.5s", animationDelay: "0.7s" }}
          ></div>
        </div>

        {/* Glowing Orbs */}
        <div className="absolute -left-20 top-20 w-80 h-80 bg-teal-600/20 rounded-full filter blur-3xl opacity-50 z-0"></div>
        <div className="absolute -right-20 top-40 w-80 h-80 bg-cyan-600/20 rounded-full filter blur-3xl opacity-50 z-0"></div>

        {/* Content Container */}
        <div className="relative z-10 pt-20 pb-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="text-center lg:text-left">
                <div className="inline-block mb-6 px-6 py-2 bg-teal-900/30 backdrop-blur-sm rounded-full border border-teal-800/50">
                  <span className="text-teal-400 text-sm font-medium">Discover the world at your fingertips</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Explore Our{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                    Beautiful World
                  </span>
                </h1>

                <p className="text-gray-300 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-8">
                  Discover countries, cultures, and fascinating facts from around the globe. Your journey to global
                  knowledge starts here.
                </p>

                {/* Search and Filter */}
                <div className="bg-gray-800/80 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-gray-700/50 max-w-xl mx-auto lg:mx-0">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Search onSearch={handleSearch} />
                    </div>
                    <div>
                    <Filter
                  type="region"
                  onFilter={(value) => handleFilter("region", value)}
                  active={activeFilter === "region"}
                />
                    </div>
                  </div>

                  {searchMode && (
                    <div className="mt-4 flex justify-center lg:justify-start">
                      <button
                        onClick={resetFilters}
                        className="flex items-center gap-2 px-5 py-2 bg-gray-700 text-teal-300 rounded-full hover:bg-gray-600 transition-all duration-300 font-medium"
                      >
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
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        Reset Filters
                      </button>
                    </div>
                  )}
                </div>

                {/* Stats */}
                {/* <div className="mt-10 grid grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0">
                  <div className="text-center p-3 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/30">
                    <div className="text-2xl md:text-3xl font-bold text-teal-400 mb-1">190+</div>
                    <div className="text-xs text-gray-400">Countries</div>
                  </div>
                  <div className="text-center p-3 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/30">
                    <div className="text-2xl md:text-3xl font-bold text-teal-400 mb-1">7.8B</div>
                    <div className="text-xs text-gray-400">Population</div>
                  </div>
                  <div className="text-center p-3 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/30">
                    <div className="text-2xl md:text-3xl font-bold text-teal-400 mb-1">5</div>
                    <div className="text-xs text-gray-400">Continents</div>
                  </div>
                </div> */}
              </div>

              {/* Right Column - 3D Globe Illustration */}
              <div className="hidden lg:flex justify-center items-center">
                <div className="relative w-[500px] h-[500px]">
                  {/* Main Globe */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-80 h-80 rounded-full bg-gray-800 border-4 border-gray-700/50 shadow-2xl overflow-hidden relative">
                      {/* World Map on Globe */}
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589519160732-576f165b9aad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-30"></div>

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/70 to-transparent"></div>

                      {/* Animated Orbit Line */}
                      <div
                        className="absolute inset-0 border-2 border-dashed border-teal-500/20 rounded-full animate-spin"
                        style={{ animationDuration: "30s" }}
                      ></div>
                    </div>
                  </div>

                  {/* Orbiting Elements */}
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: "20s" }}>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-10 h-10 rounded-full bg-teal-500/20 backdrop-blur-sm flex items-center justify-center border border-teal-500/40">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-teal-400"
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
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute inset-0 animate-spin"
                    style={{ animationDuration: "15s", animationDirection: "reverse" }}
                  >
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                      <div className="w-10 h-10 rounded-full bg-cyan-500/20 backdrop-blur-sm flex items-center justify-center border border-cyan-500/40">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-cyan-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: "25s" }}>
                    <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                      <div className="w-10 h-10 rounded-full bg-teal-500/20 backdrop-blur-sm flex items-center justify-center border border-teal-500/40">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-teal-400"
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
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute inset-0 animate-spin"
                    style={{ animationDuration: "18s", animationDirection: "reverse" }}
                  >
                    <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-10 h-10 rounded-full bg-cyan-500/20 backdrop-blur-sm flex items-center justify-center border border-cyan-500/40">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-cyan-400"
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
            <path
              fill="#111827"
              fillOpacity="1"
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4" ref={cardsSectionRef}>
        {loading ? (
          <div className="min-h-[50vh] flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {currentCountries.length > 0
                ? currentCountries.map((country, index) => (
                    <div
                      key={country.cca3}
                      className={`transform transition-all duration-700 ${
                        animatedItems.includes(index) ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                      }`}
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <CountryCard country={country} />
                    </div>
                  ))
              : !loading && (
                  <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
                    <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center mb-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-indigo-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-indigo-900 mb-3">
                      No countries found
                    </h3>
                    <p className="text-indigo-600 max-w-md text-lg mb-8">
                      Try adjusting your search or filter to find what you're
                      looking for.
                    </p>
                    <button
                      onClick={resetFilters}
                      className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg font-medium transform hover:scale-105"
                    >
                      Show All Countries
                    </button>
                  </div>
                )}
          </div>
           {/* Pagination */}
           {countries.length > itemsPerPage && !loading && (
              <div className="mt-12">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              </div>
            )}
          </>
          
        )}
      </div>
    </div>
  );
};

export default Home;
