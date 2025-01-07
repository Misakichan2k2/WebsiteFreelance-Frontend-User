<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { userData, onDeleteAppLocalStorage, accessToken } from "@/utils";

const router = useRouter();

const keySearch = ref(null);

console.log("userData:", userData.value);

const menu = ref();
const items = ref([
  {
    label: "Profile",
    icon: "pi pi-user",
    command: () => router.push("/profile"),
  },

  ...(userData.value.role === "Freelancer"
    ? [
        {
          separator: true,
        },
        {
          label: "Freelancer profile",
          icon: "pi pi-shopping-bag",
          command: () => router.push("/freelancer-profile"),
        },
      ]
    : []),

  // {
  //   label: "Coins",
  //   icon: "pi pi-database",
  //   command: () => router.push("/profile"),
  // },
  // {
  //   label: "Message and order",
  //   icon: "pi pi-inbox",
  //   command: () => router.push("/profile"),
  // },
  // {
  //   label: "Favorite Job",
  //   icon: "pi pi-heart",
  //   command: () => router.push("/profile"),
  // },
  {
    separator: true,
  },
  {
    label: "Job Board",
    icon: "pi pi-megaphone",
    command: () => router.push("/jobs/board"),
  },
  ...(userData.value.role === "Customer"
    ? [
        {
          separator: true,
        },
        {
          label: "Sign up as a freelancer",
          icon: "pi pi-briefcase",
          command: () => router.push("/freelancer/sign-up"),
        },
      ]
    : []),
  {
    separator: true,
  },
  {
    label: "Log out",
    icon: "pi pi-sign-out",
    command: () => onDeleteAppLocalStorage(),
  },
]);

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>

<template>
  <div
    class="flex align-items-center px-3 py-2 justify-content-between background-header"
  >
    <div class="flex align-items-center gap-5">
      <RouterLink to="/" class="no-underline">
        <span class="text-4xl text-white cursor-pointer font-semibold"
          >Freelance</span
        ></RouterLink
      >
      <IconField class="w-25rem">
        <InputIcon class="pi pi-search" />
        <InputText
          v-model="keySearch"
          placeholder="Search for freelance work..."
          class="w-full"
        />
      </IconField>
    </div>
    <div class="flex align-items-center gap-5">
      <div class="flex gap-1 align-items-center">
        <RouterLink to="/jobs/board" class="no-underline">
          <Button
            label="Job Board"
            variant="text"
            class="text-white hover:text-cyan-700"
          />
        </RouterLink>
        <RouterLink to="/freelancer/board" class="no-underline">
          <Button
            label="Freelancer Board"
            variant="text"
            class="text-white hover:text-cyan-700"
          />
        </RouterLink>
        <Button
          v-if="accessToken && userData.role === 'Customer'"
          label="Sign up as a freelancer"
          variant="text"
          class="text-white hover:text-cyan-700"
        />
        <Button
          v-if="!accessToken"
          @click="router.push({ name: 'SignUp' })"
          label="Sign up"
          variant="text"
          class="text-white hover:text-cyan-700"
        />
        <div
          v-if="accessToken"
          @click="toggle"
          class="flex gap-2 align-items-center cursor-pointer"
        >
          <div class="w-3rem h-3rem">
            <img
              :src="
                userData?.avatar?.startsWith('http')
                  ? userData?.avatar
                  : `http://localhost:3000${userData.avatar}`
              "
              alt="Avatar"
              class="w-full h-full border-circle"
              style="object-fit: cover"
            />
            <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup />
          </div>
          <span class="text-base text-white font-semibold">{{
            userData.username
          }}</span>
          <i class="pi pi-angle-down text-white text-3xl"></i>
        </div>

        <div v-else>
          <Button
            label="Sign in"
            variant="text"
            class="text-white hover:text-cyan-700"
            @click="router.push({ name: 'SignIn' })"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
