import { useState, useEffect, useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import LoadingSpinner from "../components/LoadingSpinner"

const Profile = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Add a small delay for animation purposes
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div
      className={`h-screen pt-16 flex items-center justify-center transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Background */}
      <div className="fixed inset-0  opacity-90 bg-gradient-to-br from-gray-900 to-slate-900 z-0"></div>
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center mix-blend-overlay opacity-20 z-0"></div>

      <div className="w-full max-w-md relative z-10 p-4">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20">
          <div className="text-center mb-8">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg transform hover:rotate-12 transition-transform duration-500">
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
            <h1 className="text-3xl font-bold text-indigo-900 mb-2">My Profile</h1>
            <p className="text-indigo-600">Welcome back, {user.name}</p>
          </div>

          <div className="space-y-6">
            <div className="bg-indigo-50 p-5 rounded-xl">
              <h4 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-2">
                Name
              </h4>
              <p className="text-indigo-900 font-medium">{user.name}</p>
            </div>

            <div className="bg-indigo-50 p-5 rounded-xl">
              <h4 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-2">
                Email
              </h4>
              <p className="text-indigo-900 font-medium">{user.email}</p>
            </div>

            <button
              onClick={() => logout()}
              className="w-full py-3.5 px-4 rounded-xl text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg transform hover:scale-[1.02] flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
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
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
