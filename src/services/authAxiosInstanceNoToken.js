import axios from 'axios';

const axiosInstanceNoToken = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// axiosInstanceNoToken.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.response?.status === 401) {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//       }
//       return Promise.reject(error.response?.data?.message || error.message);
//     }
//   );

export default axiosInstanceNoToken;