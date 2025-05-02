import { useState, useEffect } from 'react';
import { getCountries, getCountryByName, getCountriesByRegion, getCountriesByLanguage, getCountriesByCurrency } from '../services/country';

export const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllCountries = async () => {
    try {
      setLoading(true);
      const data = await getCountries();
      setCountries(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const searchCountries = async (name) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCountryByName(name);
      if (data && data.length > 0) {
        setCountries(data);
      } else {
        setCountries([]);
        // setError('No countries found matching your search');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching countries:', err.message);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const filterByRegion = async (region) => {
    try {
      setLoading(true);
      const data = await getCountriesByRegion(region);
      setCountries(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterByLanguage = async (language) => {
    try {
      setLoading(true);
      const data = await getCountriesByLanguage(language);
      setCountries(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterByCurrency = async (currency) => {
    try {
      setLoading(true);
      const data = await getCountriesByCurrency(currency);
      setCountries(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchAllCountries();
  }, []);

  return { countries, loading, error, searchCountries, filterByRegion, fetchAllCountries, filterByLanguage, filterByCurrency };
};