import { defineStore } from "pinia";
import { API_FREELANCER } from "@/services/api";
import { RESPONSE } from "@/utils/response";

export const StoreFreelancer = defineStore("StoreFreelancer", () => {
  const { setup } = RESPONSE();
  const API = API_FREELANCER.API_FREELANCER;

  // Freelancer Post
  const onActionFreelancerPost = async (data) => {
    return await setup({
      apiFunction: API.freelancerPost(data),
      toast: {
        isShow: false,
        type: "POPUP",
        msg: "There was an error creating the Freelancer post.",
      },
    });
  };

  // Freelancer Board
  const onActionAllFreelancerBoard = async () => {
    const response = await setup({
      apiFunction: API.allFreelancerBoard(),
      toast: {
        isShow: false,
        type: "SUCCESS",
        msg: "Your freelancer post has been created successfully.",
      },
    });

    console.log("Response from setup:", response);
    return response;
  };

  // Freelancer Board
  const onActionFreelancerBoard = async () => {
    const response = await setup({
      apiFunction: API.freelancerBoard(),
      toast: {
        isShow: false,
        type: "SUCCESS",
        msg: "Your freelancer post has been created successfully.",
      },
    });

    console.log("Response from setup:", response);
    return response;
  };

  const onActionRandomFreelancerBoard = async (excludeId) => {
    const response = await setup({
      apiFunction: API.randomFreelancerBoard(excludeId),
      toast: {
        isShow: false,
        type: "SUCCESS",
        msg: "Your freelancer post has been created successfully.",
      },
    });
    return response;
  };

  // Freelancer Board
  const onActionFreelancerImage = async (data) => {
    const response = await setup({
      apiFunction: API.freelancerImage(data),
      toast: {
        isShow: false,
        type: "SUCCESS",
        msg: "Your freelancer post has been created successfully.",
      },
    });
    return response;
  };

  // Freelancer Detail
  const onActionFreelancerDetail = async (data) => {
    return await setup({
      apiFunction: API.freelancerDetail(data),
      toast: { isShow: false },
    });
  };

  // Freelancer Update
  const onActionFreelancerUpdate = async (data) => {
    return await setup({
      apiFunction: API.freelancerUpdate(data),
      toast: {
        isShow: false,
        type: "POPUP",
        msg: "Post updated successfully!",
      },
    });
  };

  // Freelancer delete
  const onActionFreelancerDelete = async (data) => {
    return await setup({
      apiFunction: API.freelancerDelete(data),
      toast: {
        isShow: false,
        type: "POPUP",
        msg: "Post deleted successfully!",
      },
    });
  };

  return {
    onActionFreelancerPost,
    onActionAllFreelancerBoard,
    onActionFreelancerBoard,
    onActionFreelancerImage,
    onActionFreelancerDetail,
    onActionFreelancerUpdate,
    onActionFreelancerDelete,
    onActionRandomFreelancerBoard,
  };
});
