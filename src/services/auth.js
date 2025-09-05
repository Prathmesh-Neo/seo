import axiosInstance from "./axiosInstance";

export const login_api = (data) => axiosInstance.post('/login', data);
export const logout_api = () => axiosInstance.post('/logout')

export const signup = (data) => axiosInstance.post('/signup', data)