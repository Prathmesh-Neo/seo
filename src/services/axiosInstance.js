import axios from 'axios'
import { API_URL } from '../apis/API_URL';
import { logout_api } from "@/services/auth";

const axiosInstance = axios.create({
    baseURL: `${API_URL}`,
    withCredentials: true,
})

axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.response.use(
    (response) => response, async (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("Unauthorized! Logging out...");
            try {
                const res = await logout_api();
                if (res.status === 200) {
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                }
            } catch (error) {
                console.error("Logout failed:", error);
            }
        }
    }
)
export default axiosInstance;