import { Link } from "react-router-dom";

const CountryDetail = ({ country }) => {
  // Helper functions to format data (unchanged)
  const getNativeName = () => {
    if (!country.name.nativeName) return "N/A";
    const nativeNames = Object.values(country.name.nativeName);
    return nativeNames[0]?.common || nativeNames[0]?.official || "N/A";
  };

  const getCurrencies = () => {
    if (!country.currencies) return "N/A";
    return Object.values(country.currencies)
      .map((currency) => `${currency.name} (${currency.symbol || "—"})`)
      .join(", ");
  };

  const getLanguages = () => {
    if (!country.languages) return "N/A";
    return Object.values(country.languages).join(", ");
  };

  const formatNumber = (num) => {
    return num?.toLocaleString() || "N/A";
  };

  const getFlagUrl = () => {
    return country.flags?.svg || country.flags?.png || "";
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-hard overflow-hidden max-w-6xl mx-auto">
      {/* Back Button - Moved inside main content */}
      <div className="p-6 md:p-8 pb-0">
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
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Flag Section - Made full width on mobile */}
        <div className="w-full md:w-2/5 p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-700/50">
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl shadow-lg bg-accent/10">
            <img
              src={getFlagUrl() || "/placeholder.svg"}
              alt={`Flag of ${country.name.common}`}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 shadow-inner border border-white/10 rounded-xl"></div>
          </div>
        </div>

        {/* Details Section - Reorganized layout */}
        <div className="w-full md:w-3/5 p-6 md:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-1">
              {country.name.common}
              {country.flag && (
                <span className="ml-3 text-2xl" aria-hidden="true">
                  {country.flag}
                </span>
              )}
            </h1>
            <p className="text-teal-300 italic">{country.name.official}</p>
          </div>

          {/* Combined details into a single grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <DetailCard label="Native Name" value={getNativeName()} />
            <DetailCard label="Population" value={formatNumber(country.population)} />
            <DetailCard label="Region" value={country.region} />
            <DetailCard label="Subregion" value={country.subregion || "N/A"} />
            <DetailCard label="Capital" value={country.capital?.join(", ") || "N/A"} />
            <DetailCard label="Currencies" value={getCurrencies()} />
            <DetailCard label="Languages" value={getLanguages()} />
            <DetailCard label="Top Level Domain" value={country.tld?.join(", ") || "N/A"} />
          </div>

          {/* Google Maps Link - Centered */}
          {country.maps?.googleMaps && (
            <div className="text-center md:text-left">
              <a
                href={country.maps.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 shadow-lg transform hover:scale-[1.02] text-white rounded-full font-medium"
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                View on Google Maps
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Border Countries - Full width section */}
      {country.borders && country.borders.length > 0 && (
        <div className="p-6 md:p-8 bg-popover border-t border-gray-700/50">
          <h3 className="text-lg font-semibold text-gray-400 mb-4">
            Neighboring Countries
          </h3>
          <div className="flex flex-wrap gap-3">
            {country.borders.map((borderCode) => (
              <Link
                key={borderCode}
                to={`/country/${borderCode}`}
                className="px-4 py-2 bg-accent hover:bg-primary/10 text-teal-400 hover:text-white rounded-full transition-all duration-300 shadow-sm border border-gray-700/50 hover:border-primary"
              >
                {borderCode}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Detail Card component (maintaining original styling)
const DetailCard = ({ label, value }) => (
  <div className="bg-popover p-4 rounded-xl shadow-sm border border-gray-700/50">
    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
      {label}
    </h3>
    <p className="text-white font-medium">{value}</p>
  </div>
);

export default CountryDetail;