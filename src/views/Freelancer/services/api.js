import { AxiosInstance } from "@/services/api";

class ApiFreelancer {
  freelancerPost = async (data) => {
    return await AxiosInstance({
      method: "POST",
      url: `freelancer`,
      data: {
        title: data?.title || "",
        detail: data?.detail || "",
        budget: data?.budget || "",
        engAvailable: data?.engAvailable || false,
        category: data?.category || "",
        sampleWork: data?.sampleWork || "",
      },
    });
  };

  allFreelancerBoard = async () => {
    return await AxiosInstance({
      method: "GET",
      url: `freelancer`,
    });
  };

  freelancerBoard = async () => {
    return await AxiosInstance({
      method: "GET",
      url: `freelancer/approved`,
    });
  };

  // API function to fetch random freelancer posts
  randomFreelancerBoard = async (excludeId) => {
    return await AxiosInstance({
      method: "GET",
      url: `freelancer/random`,
      params: { excludeId },
    });
  };

  freelancerImage = async (data) => {
    return await AxiosInstance({
      method: "GET",
      url: `upload/${data.imagePath}`,
      params: data || {},
    });
  };

  freelancerDetail = async (id) => {
    return await AxiosInstance({
      method: "GET",
      url: `freelancer/${id}`,
    });
  };

  freelancerUpdate = async (data) => {
    return await AxiosInstance({
      method: "PUT",
      url: `freelancer/${data.postId}`,
      data: {
        title: data?.title || "",
        detail: data?.detail || "",
        budget: data?.budget || "",
        deadline: data?.deadline || "",
        engAvailable: data?.engAvailable || false,
        category: data?.category || "",
        sampleWork: data?.sampleWork || "",
        createdAt: data?.createdAt || "",
      },
    });
  };

  freelancerDelete = async (id) => {
    return await AxiosInstance({
      method: "PUT",
      url: `freelancer/${id}`,
    });
  };
}

export const API_FREELANCER = new ApiFreelancer();
