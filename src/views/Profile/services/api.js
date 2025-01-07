import { AxiosInstance } from "@/services/api";

class ApiProfile {
  getProfile = async (id) => {
    return await AxiosInstance({
      method: "GET",
      url: `users/${id}`,
    });
  };

  saveProfile = async (data) => {
    console.log(data);

    return await AxiosInstance({
      method: "PUT",
      url: `users/${data.id}`,
      data: {
        avatar: data?.avatar || null,
        username: data?.username || "",
        email: data?.email || "",
        dateOfBirth: data?.dateOfBirth || null,
        gender: data?.gender || null,
        phoneNumber: data?.phoneNumber || null,
        address: data?.address || null,
      },
    });
  };

  // Freelancer
  getFreelancerProfile = async () => {
    return await AxiosInstance({
      method: "GET",
      url: `freelancerprofile`,
    });
  };

  getFreelancerProfileDetail = async (id) => {
    return await AxiosInstance({
      method: "GET",
      url: `freelancerprofile/${id}`,
    });
  };
}

export const API_PROFILE = new ApiProfile();
