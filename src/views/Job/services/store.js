import { defineStore } from "pinia";
import { API_JOB } from "@/services/api";
import { RESPONSE } from "@/utils/response";

export const StoreJob = defineStore("StoreJob", () => {
  const { setup } = RESPONSE();
  const API = API_JOB.API_JOB;

  // Job Post
  const onActionJobPost = async (data) => {
    return await setup({
      apiFunction: API.jobPost(data),
      toast: {
        isShow: false,
        type: "POPUP",
        msg: "There was an error creating the job post.",
      },
    });
  };

  // Job Board
  const onActionJobBoard = async () => {
    const response = await setup({
      apiFunction: API.jobBoard(),
      toast: {
        isShow: true,
        type: "SUCCESS",
        msg: "Your job post has been created successfully.",
      },
    });

    console.log("Response from setup:", response);
    return response;
  };

  // Job Board
  const onActionAllJobBoard = async () => {
    const response = await setup({
      apiFunction: API.allJobBoard(),
      toast: {
        isShow: true,
        type: "SUCCESS",
        msg: "Your job post has been created successfully.",
      },
    });

    console.log("Response from setup:", response);
    return response;
  };

  // Job Detail
  const onActionJobDetail = async (data) => {
    return await setup({
      apiFunction: API.jobDetail(data),
      toast: { isShow: false },
    });
  };

  // Job Update
  const onActionJobUpdate = async (status, data) => {
    return await setup({
      apiFunction: API.jobUpdate(status, data),
      toast: {
        isShow: false,
        type: "POPUP",
        msg: "Post updated successfully!",
      },
    });
  };

  const onActionJobApply = async (freelancerId, jobId) => {
    return await setup({
      apiFunction: API.jobApply(freelancerId, jobId),
      toast: {
        isShow: true,
        type: "POPUP",
        msg: "Post updated successfully!",
      },
    });
  };

  const onActionJobAccept = async (data, id) => {
    return await setup({
      apiFunction: API.jobAccept(data, id),
      toast: {
        isShow: false,
        type: "POPUP",
        msg: "Post updated successfully!",
      },
    });
  };

  // Job Update
  const onActionJobDelete = async (data) => {
    return await setup({
      apiFunction: API.jobDelete(data),
      toast: {
        isShow: false,
        type: "POPUP",
        msg: "Post deleted successfully!",
      },
    });
  };

  return {
    onActionJobPost,
    onActionJobBoard,
    onActionAllJobBoard,
    onActionJobDetail,
    onActionJobUpdate,
    onActionJobDelete,
    onActionJobApply,
    onActionJobAccept,
  };
});
