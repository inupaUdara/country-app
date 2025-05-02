import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getCountryByCode } from "../services/country"
import CountryDetail from "../components/CountryDetail"
import LoadingSpinner from "../components/LoadingSpinner"

const CountryPage = () => {
  const { countryCode } = useParams()
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true)
        setError(null)
        setIsLoaded(false)
        const data = await getCountryByCode(countryCode)
        setCountry(data[0])

        // Add a small delay for animation purposes
        setTimeout(() => {
          setIsLoaded(true)
        }, 100)
      } catch (err) {
        setError(err.message)
        setIsLoaded(true)
      } finally {
        setLoading(false)
      }
    }

    fetchCountry()
    window.scrollTo(0, 0)
  }, [countryCode])

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

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
          <h3 className="text-3xl font-bold text-indigo-900 mb-3">Country Not Found</h3>
          <p className="text-indigo-600 mb-8 text-lg">{error}</p>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg font-medium transform hover:scale-105"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  if (!country) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center border border-indigo-100 transform hover:scale-105 transition-transform duration-500">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-indigo-400"
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
          <h3 className="text-3xl font-bold text-indigo-900 mb-3">No Country Data</h3>
          <p className="text-indigo-600 mb-8 text-lg">We couldn't find any information about this country.</p>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg font-medium transform hover:scale-105"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen pt-32 pb-16 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      <CountryDetail country={country} />
    </div>
  )
}

export default CountryPage
