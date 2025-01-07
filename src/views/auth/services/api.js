import { AxiosInstance } from "@/services/api";

class ApiAuth {
  signIn = async (data) => {
    return await AxiosInstance({
      method: "POST",
      url: "auth/signin",
      data: {
        email: data?.email || "",
        password: data?.password || "",
      },
    });
  };

  signUp = async (data) => {
    return await AxiosInstance({
      method: "POST",
      url: "auth/signup",
      data: {
        username: data?.username || "",
        email: data?.email || "",
        password: data?.password || "",
      },
    });
  };
}

export const API_AUTH = new ApiAuth();
