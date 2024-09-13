import axios from "axios";
import Config from "../../config/config";

// تابع ارسال فرم فروشگاه به سرور
export const addShop = async (formData) => {
  const jwtToken = sessionStorage.getItem("accessToken");

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  const formDataWithFile = new FormData();
  Object.keys(formData).forEach((key) => {
    formDataWithFile.append(key, formData[key]);
  });

  try {
    const response = await axios.post(
      `${Config.baseUrl}/shop/add_shop`,
      formDataWithFile,
      config
    );
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || 'خطای نامشخص';
    throw new Error(errorMessage);
  }
};

export const checkUserShop = async () => {
  const jwtToken = sessionStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  try {
    const response = await axios.get(
      `${Config.baseUrl}/shop/check_shop`,
      config
    );
    return response.data; // داده مربوط به فروشگاه
  } catch (error) {
    const errorMessage = error.response?.data || 'خطای نامشخص';
    throw new Error(errorMessage);
  }
};

// تابع ارسال فرم محصول به سرور
export const addProduct = async (formData) => {
  const jwtToken = sessionStorage.getItem("accessToken");

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  const formDataWithFile = new FormData();
  Object.keys(formData).forEach((key) => {
    formDataWithFile.append(key, formData[key]);
  });

  try {
    const response = await axios.post(
      `${Config.baseUrl}/shop/add-product/`,
      formDataWithFile,
      config
    );
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || 'خطای نامشخص';
    throw new Error(errorMessage);
  }
};

// تابع دریافت دسته‌بندی‌ها
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${Config.baseUrl}/shop/categories/`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || 'خطای نامشخص';
    throw new Error(errorMessage);
  }
};

// تابع برای دریافت زیرمجموعه‌های دسته‌بندی
export const fetchChildCategories = async (parentId) => {
  try {
    const response = await axios.get(`${Config.baseUrl}/shop/categories/children/${parseInt(parentId, 10)}/`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || 'خطای نامشخص';
    throw new Error(errorMessage);
  }
};

// تابع دریافت بسته‌ها
export const fetchPackages = async () => {
  try {
    const response = await axios.get(`${Config.baseUrl}/shop/packages/`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || 'خطای نامشخص';
    throw new Error(errorMessage);
  }
};

// تابع دریافت محصولات غیر فعال
export const fetchInactiveProducts = async () => {
  const jwtToken = sessionStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  try {
    const response = await axios.get(`${Config.baseUrl}/shop/products/inactive/`, config);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || 'خطای نامشخص';
    throw new Error(errorMessage);
  }
};

// تابع دریافت محصولات فعال
export const fetchActiveProducts = async () => {
  const jwtToken = sessionStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  try {
    const response = await axios.get(`${Config.baseUrl}/shop/products/active/`, config);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || 'خطای نامشخص';
    throw new Error(errorMessage);
  }
};

// تابع دریافت محصولات ویژه
export const fetchFeaturedProducts = async () => {
  const jwtToken = sessionStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  try {
    const response = await axios.get(`${Config.baseUrl}/shop/products/featured/`, config);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || 'خطای نامشخص';
    throw new Error(errorMessage);
  }
};

// تابع ویرایش محصول
export const updateProduct = async (productId, formData) => {
  const jwtToken = sessionStorage.getItem("accessToken");

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  const formDataWithFile = new FormData();
  Object.keys(formData).forEach((key) => {
    formDataWithFile.append(key, formData[key]);
  });

  try {
    const response = await axios.put(
      `${Config.baseUrl}/shop/edit_product_shop/${productId}/`,
      formDataWithFile,
      config
    );
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || 'خطای نامشخص';
    throw new Error(errorMessage);
  }
};
