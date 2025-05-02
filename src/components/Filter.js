const Filter = ({ type, active, onFilter }) => {

  const options = {
    region: ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'],
    language: ['English', 'Spanish', 'French', 'Arabic', 'Portuguese', 'Russian', 'German'],
    currency: ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD']
  };

  const labels = {
    region: 'Filter by Region',
    language: 'Filter by Language',
    currency: 'Filter by Currency'
  };

  const handleChange = (e) => {
    onFilter(e.target.value);
  };

  return (
    <div className="w-full relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
        </div>
      <select
        onChange={handleChange}
        className="block w-full pl-12 pr-10 py-3 rounded-full border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white text-slate-800 placeholder-slate-400 shadow-sm transition-all"
        defaultValue=""
      >
        <option value="">{labels[type]}</option>
        {options[type].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;