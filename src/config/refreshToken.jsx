import axios from "axios";
import Config from "../../config/config";

// تابع برای دریافت توکن جدید
const refreshToken = async () => {
  const refreshToken = sessionStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  try {
    const response = await axios.post(
      `${Config.baseUrl}/api/token/refresh/`,
      { refresh: refreshToken }
    );
    const { access } = response.data;

    // ذخیره توکن جدید در sessionStorage
    sessionStorage.setItem("accessToken", access);
    return access;
  } catch (error) {
    console.error("Failed to refresh token", error);
    throw error;
  }
};
