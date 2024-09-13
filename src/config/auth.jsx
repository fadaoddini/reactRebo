import axios from "axios";
import Config from "./config"; // مسیر صحیح فایل config

// تابع برای درخواست توکن جدید
export const refreshToken = async () => {
  const refreshToken = sessionStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("No refresh token available.");
  }

  try {
    const response = await axios.post(
      `${Config.baseUrl}/api/token/refresh/`,
      { refresh: refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
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
