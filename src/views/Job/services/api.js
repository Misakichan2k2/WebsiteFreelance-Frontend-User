import { AxiosInstance } from "@/services/api";

class ApiJob {
  jobPost = async (data) => {
    return await AxiosInstance({
      method: "POST",
      url: `jobposts`,
      data: {
        postBy: data?.postBy || "",
        title: data?.title || "",
        detail: data?.detail || "",
        budget: data?.budget || "",
        deadline: data?.deadline || "",
        engRequired: data?.engRequired || false,
        category: data?.category || "",
        sampleWork: data?.sampleWork || "",
      },
    });
  };

  jobBoard = async () => {
    return await AxiosInstance({
      method: "GET",
      url: `jobposts/approved`,
    });
  };

  allJobBoard = async () => {
    return await AxiosInstance({
      method: "GET",
      url: `jobposts`,
    });
  };

  jobDetail = async (id) => {
    return await AxiosInstance({
      method: "GET",
      url: `jobposts/${id}`,
    });
  };

  jobUpdate = async (newStatus, data) => {
    return await AxiosInstance({
      method: "PUT",
      url: `jobposts/${data}`,
      data: {
        recruitmentStatus: newStatus,
      },
    });
  };

  jobApply = async (freelancerId, jobId) => {
    return await AxiosInstance({
      method: "POST",
      url: `jobposts/${jobId}/apply`,
      data: {
        freelancerId: freelancerId,
      },
    });
  };

  jobAccept = async (data, id) => {
    return await AxiosInstance({
      method: "POST",
      url: `jobposts/${id}/accept`,
      data: {
        freelancerId: data,
      },
    });
  };

  jobDelete = async (data) => {
    return await AxiosInstance({
      method: "PUT",
      url: `jobposts/${data._id}`,
      data: {
        title: data?.title || "",
        detail: data?.detail || "",
        budget: data?.budget || "",
        deadline: data?.deadline || "",
        engRequired: data?.engRequired || false,
        category: data?.category || "",
        sampleWork: data?.sampleWork || "",
        createdAt: data?.createdAt || "",
      },
    });
  };
}

export const API_JOB = new ApiJob();
