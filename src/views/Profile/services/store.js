import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { API_PROFILE } from "@/services/api";
import { RESPONSE } from "@/utils/response";

export const StoreProfile = defineStore("StoreProfile", () => {
  const { setup } = RESPONSE();
  const API = API_PROFILE.API_PROFILE;

  const profile = ref({});

  const onGetterProfile = computed(() => profile);

  const onActionGetProfile = async (id) => {
    const res = await setup({
      apiFunction: API.getProfile(id),
    });
    profile.value = res.data;
    return res;
  };

  const onActionSaveProfile = async (data) => {
    try {
      const res = await API.saveProfile(data);
      if (!res || !res.data) {
        throw new Error("Không thể lưu hồ sơ. Dữ liệu trả về không hợp lệ.");
      }
      profile.value = res.data;
      return res;
    } catch (error) {
      console.error("Error saving profile:", error.message);
      throw error;
    }
  };

  // Freelancer
  const onActionFreelancerProfile = async () => {
    const response = await setup({
      apiFunction: API.getFreelancerProfile(),
      toast: {
        isShow: false,
        type: "SUCCESS",
        msg: "Your freelancer post has been created successfully.",
      },
    });
    return response;
  };

  // Lấy chi tiết hồ sơ freelancer
  const onActionFreelancerProfileDetail = async (id) => {
    try {
      const response = await setup({
        apiFunction: API.getFreelancerProfileDetail(id),
        toast: {
          isShow: false,
          type: "SUCCESS",
          msg: "Your freelancer post has been created successfully.",
        },
      });
      return response;
    } catch (error) {
      console.error(
        "Error fetching freelancer profile details:",
        error.message
      );
      throw error;
    }
  };

  return {
    onGetterProfile,
    onActionGetProfile,
    onActionSaveProfile,
    onActionFreelancerProfile,
    onActionFreelancerProfileDetail,
  };
});
