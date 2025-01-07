import { defineStore } from "pinia";
import { STORE_AUTH } from "@/services/stores";
import { updateAuthorizationHeader } from "@/services/api";

const { onActionSignIn } = STORE_AUTH.StoreAuth();
const { onActionSignUp } = STORE_AUTH.StoreAuth();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    currentUser: null,
    isLoading: false,
    error: null,
  }),
  actions: {
    async onActionSignIn(credentials) {
      this.isLoading = true;
      try {
        const result = await signIn(credentials);
        this.currentUser = result.user;
        updateAuthorizationHeader(result.token); // Cập nhật token vào header
        return { success: true };
      } catch (error) {
        this.error = error;
        return { success: false, error };
      } finally {
        this.isLoading = false;
      }
    },
    async onActionSignUp(data) {
      this.isLoading = true;
      try {
        const result = await signUp(data);
        this.currentUser = result.user;
        updateAuthorizationHeader(result.token);
        return { success: true };
      } catch (error) {
        this.error = error;
        return { success: false, error };
      } finally {
        this.isLoading = false;
      }
    },
    onActionSignOut() {
      this.currentUser = null;
      updateAuthorizationHeader(null); // Xóa token khỏi header
    },
  },
});
