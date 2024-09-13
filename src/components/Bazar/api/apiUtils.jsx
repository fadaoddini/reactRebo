import axios from "axios";
import Config from "../../../config/config";

// تابع برای گرفتن گزارش محصول
export const fetchProductData = async (id) => {
  try {
    const response = await axios.get(`${Config.baseUrl}/catalogue/statistic/api/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for product ID ${id}:`, error);
    throw error;
  }
};

// تابع برای چک کردن دسترسی پیشنهاد
export const fetchBidPermission = async (jwtToken) => {
  try {
    const response = await axios.get(`${Config.baseUrl}/bid/check_bid/`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return response.data.num_bid;
  } catch (error) {
    console.error("Error fetching bid permission:", error);
    throw error;
  }
};

// تابع برای گرفتن انواع محصولات
export const fetchProductTypes = async () => {
  try {
    const response = await axios.get(`${Config.baseUrl}/catalogue/all_types`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product types:", error);
    throw error;
  }
};
