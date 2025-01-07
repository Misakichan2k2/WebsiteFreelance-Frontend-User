import { defineStore } from "pinia";
import { API_AUTH } from "@/services/api";
import { RESPONSE } from "@/utils/response";

export const StoreAuth = defineStore("StoreAuth", () => {
  const { setup } = RESPONSE();
  const API = API_AUTH.API_AUTH;

  // Sign in
  const onActionSignIn = async (data) => {
    return await setup({
      apiFunction: API.signIn(data),
      toast: { isShow: true, type: "POPUP", msg: "Đăng nhập thành công!" },
    });
  };

  // Sign up
  const onActionSignUp = async (data) => {
    return await setup({
      apiFunction: API.signUp(data),
      toast: { isShow: true, msg: "Bạn đã tạo tài khoản thành công!" },
    });
  };

  return {
    onActionSignIn,
    onActionSignUp,
  };
});
