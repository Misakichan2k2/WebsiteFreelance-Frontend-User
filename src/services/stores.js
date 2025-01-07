import { defineStore } from "pinia";
import { computed, ref } from "vue";

export * as STORE_AUTH from "@/views/auth/services/store";
export * as STORE_JOB from "@/views/Job/services/store";
export * as STORE_PROFILE from "@/views/Profile/services/store";
export * as STORE_FREELANCER from "@/views/Freelancer/services/store";

export const StoreApp = defineStore("StoreApp", () => {
  const routeSignIn = ref("");
  const isLoading = ref(false);

  const onGetterRouteSignIn = computed(() => routeSignIn);
  const onGetterIsLoading = computed(() => isLoading);

  // Loading
  const onActionIsLoading = (isActive = true) => {
    isLoading.value = isActive;
  };

  return {
    onGetterRouteSignIn,
    onGetterIsLoading,
    onActionIsLoading,
  };
});
