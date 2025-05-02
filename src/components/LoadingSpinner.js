const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-teal-900 border-r-cyan-900 animate-spin"></div>
      </div>
    </div>
  )
}

export default LoadingSpinner
