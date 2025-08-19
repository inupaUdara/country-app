import axios from 'axios';

const API_BASE_URL = 'https://restcountries.com/v3.1';

const handleApiError = (error) => {
  if (error.response) {
    if (error.response.status === 404) {
      throw new Error('No countries found matching your search');
    }
    throw new Error(`Request failed with status ${error.response.status}`);
  } else if (error.request) {
    throw new Error('Network error - please check your connection');
  } else {
    throw new Error('Error setting up the request');
  }
};

export const getCountries = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all?fields=name,capital`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getCountryByName = async (name) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/name/${name}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getCountryByCode = async (code) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/alpha/${code}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getCountriesByRegion = async (region) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/region/${region}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getCountriesByLanguage = async (language) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/lang/${language}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getCountriesByCurrency = async (currency) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/currency/${currency}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
