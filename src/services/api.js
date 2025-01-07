// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:3000/api", // Đặt URL backend của bạn
//   withCredentials: true, // Để gửi cookie (như access_token)
// });

// export default api;

import axios from "axios";

export * as API_AUTH from "@/views/auth/services/api";
export * as API_JOB from "@/views/Job/services/api";
export * as API_PROFILE from "@/views/Profile/services/api";
export * as API_FREELANCER from "@/views/Freelancer/services/api";

class ApiApp {}

export const API_APP = new ApiApp();

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
});

const updateAuthorizationHeader = (token) => {
  if (token) {
    AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete AxiosInstance.defaults.headers.common["Authorization"];
  }
};

AxiosInstance.interceptors.request.use((config) => {
  if (config) return config;
});

AxiosInstance.interceptors.response.use(
  (response) => {
    if (response) return response;
  },
  (error) => {
    // if (["TOKEN_EXPIRED"].includes(error?.response?.data?.statusCode)) {
    //   onDeleteAppLocalStorage();
    // }

    return Promise.reject(error);
  }
);

export { AxiosInstance, updateAuthorizationHeader };
