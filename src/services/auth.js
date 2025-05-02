import axiosInstance from "./authAxiosInstance";
import axiosInstanceNoToken from "./authAxiosInstanceNoToken";

export const login = async (credentials) => {
  try {
    const response = await axiosInstanceNoToken.post("/api/v1/auth/sign-in", credentials);
    localStorage.setItem("token", response.data.token); 
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await axiosInstanceNoToken.post("/api/v1/auth/sign-up", userData);
    localStorage.setItem("token", response.data.token); 
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/auth/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
