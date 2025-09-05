import axiosInstance from "../services/axiosInstance";

export const get_products = () => axiosInstance.get('/product');