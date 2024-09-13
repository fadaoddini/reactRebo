import axios from "axios";
import Config from "./config";
import { refreshToken } from "./auth"; // مسیر تابع refreshToken را وارد کنید

const axiosInstance = axios.create({
  baseURL: Config.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    window.location.href = "/login"; // مسیر صفحه ورود یا صفحه اصلی
  };

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    if (response.status === 401 && !config.__isRetryRequest) {
      // توکن منقضی شده است
      config.__isRetryRequest = true; // جلوگیری از درخواست‌های نامحدود
      try {
        await refreshToken();
        // دوباره درخواست را با توکن جدید تکرار کنید
        return axiosInstance(config);
      } catch (refreshError) {
        // خطای بروزرسانی توکن، کاربر باید لاگ‌اوت شود
        logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
