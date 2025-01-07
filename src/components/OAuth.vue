<script>
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const toast = useToast();

    const handleGoogleOnClick = async () => {
      try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);

        const result = await signInWithPopup(auth, provider);

        const response = await fetch("/api/auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to authenticate with backend");
        }

        const data = await response.json();

        // Lưu thông tin người dùng (localStorage hoặc Vuex)
        localStorage.setItem("user", JSON.stringify(data));

        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Signed in with Google successfully",
          life: 3000,
        });
        router.push("/");
      } catch (error) {
        console.error("Could not sign in with Google", error);
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Could not sign in with Google",
          life: 3000,
        });
      }
    };

    return { handleGoogleOnClick };
  },
};
</script>

<template>
  <Button
    label="Continue with Google"
    icon="pi pi-google"
    class="bg-red-600 text-white p-3 rounded-lg uppercase hover:opacity-90"
    @click="handleGoogleOnClick"
  />
</template>

<style scoped></style>
