<script setup>
import { onMounted, ref } from "vue";
import { useToast } from "primevue/usetoast";
import { userData } from "@/utils";
import { STORE_PROFILE } from "@/services/stores";

const {
  onActionGetProfile,
  onGetterProfile: profile,
  onActionSaveProfile,
} = STORE_PROFILE.StoreProfile();

const toast = useToast();
const passwordVisible = ref(false);
const password = ref(null);
const newPassword = ref(null);
const confirmPassword = ref(null);

const genderType = ref([
  {
    code: "male",
    name: "Nam",
  },
  {
    code: "female",
    name: "Nữ",
  },
]);

const onClickChangePassword = async () => {
  try {
    toast.add({
      severity: "success",
      summary: "Đổi mật khẩu thành công",
      detail: "Mật khẩu đã được cập nhật",
      life: "3000",
    });
    password.value = null;
    newPassword.value = null;
    confirmPassword.value = null;
    passwordVisible.value = false;
  } catch (error) {
    console.error("Error changing password:", error);
    toast.add({
      severity: "error",
      summary: "Đổi mật khẩu thất bại",
      detail: error.response?.data?.error || "Có lỗi xảy ra khi đổi mật khẩu",
      life: "3000",
    });
  }
};

const onUpload = (event) => {
  const file = event.target.files[0];
  const maxSize = 5 * 1024 * 1024; // Giới hạn 5MB

  if (file.size > maxSize) {
    alert("File quá lớn! Vui lòng chọn file nhỏ hơn 5MB.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    profile.value.avatar = e.target.result;
  };
  reader.readAsDataURL(file);
};

const onClickSave = async () => {
  try {
    await onActionSaveProfile(profile.value); // Ensure profile is saved first

    toast.add({
      severity: "success",
      summary: "Success",
      detail: "User updated successfully",
      life: 3000,
    });

    // Fetch updated profile after saving
    await onActionGetProfile(userData.value.userId);
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to update user",
      life: 3000,
    });
  }
};

onMounted(() => {
  console.log(userData.value);

  onActionGetProfile(userData.value.userId);
});
</script>

<template>
  <div class="flex flex-column p-3 m-5 border-1 border-round border-300">
    <!-- Trang thông tin cá nhân -->
    <div class="flex flex-column gap-3">
      <div class="flex justify-content-center">
        <span class="font-semibold uppercase text-2xl"> Profile </span>
      </div>

      <div class="flex justify-content-center">
        <hr class="w-full" />
      </div>
    </div>

    <div
      class="flex flex-column lg:flex-row gap-8 p-3 align-items-center justify-content-center"
    >
      <!-- Ảnh  -->
      <div class="flex flex-column gap-3 relative">
        <div class="w-15rem h-15rem">
          <img
            :src="
              profile?.avatar?.startsWith('http')
                ? profile?.avatar
                : `http://localhost:3000${profile.avatar}`
            "
            alt="Avatar"
            class="w-full h-full border-circle border-1 border-gray-300"
            style="object-fit: cover"
          />
        </div>
        <!-- File upload -->
        <div
          class="flex flex-column gap-2 absolute bottom-0 border-circle"
          style="margin-left: 11rem; height: 50px; width: 2.5rem"
          for="upload"
        >
          <div
            class="bg-white relative overflow-hidden flex align-items-center text-600 justify-content-center w-3rem h-10rem border-1 border-dashed border-circle"
          >
            <div class="flex flex-column text-center">
              <i style="font-size: 1.2rem" class="pi pi-camera" />
              <input
                type="file"
                style="top: -5rem"
                accept="image/*"
                class="absolute bottom-0 left-0 right-0 cursor-pointer"
                @change="onUpload"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- thông tin -->
      <div class="flex flex-column gap-2">
        <div class="flex gap-5 text-base align-items-center">
          <span class="w-8rem font-semibold">Full name</span>
          <InputText v-model="profile.username" class="h-1 w-8 pl-2" />
        </div>

        <div class="flex gap-5 text-base align-items-center">
          <span class="w-8rem font-semibold">Email</span>
          <InputText v-model="profile.email" class="h-1 w-8 pl-2" disabled />
        </div>

        <div class="flex gap-5 text-base align-items-center">
          <span class="w-8rem font-semibold">Mobile number</span>
          <InputText v-model="profile.phoneNumber" class="h-1 w-8 pl-2" />
        </div>

        <!-- Gender -->
        <div class="flex gap-5 text-base align-items-center h-2rem">
          <span class="w-8rem font-semibold">Gender</span>
          <div v-for="gender in genderType" :key="gender.code">
            <RadioButton
              v-model="profile.gender"
              :inputId="gender.code"
              :name="gender.name"
              :value="gender.code"
            />
            <label class="ml-2">{{ gender.name }}</label>
          </div>
        </div>

        <!-- Birth Date -->
        <div class="flex gap-5 text-base align-items-center">
          <span class="w-8rem font-semibold">Date of birth</span>
          <div class="w-20rem">
            <div class="flex-auto">
              <DatePicker
                v-model="profile.dateOfBirth"
                showIcon
                fluid
                iconDisplay="input"
                inputId="icondisplay"
              />
            </div>
          </div>
        </div>

        <!-- address -->
        <div class="flex gap-5 text-base align-items-center card">
          <span class="w-8rem font-semibold">Address</span>
          <Textarea v-model="profile.address" autoResize rows="2" cols="39" />
        </div>

        <!-- Thay đỏi mật khẩu -->
        <div class="flex gap-5 text-base align-items-center">
          <span class="w-8rem font-semibold">Password</span>
          <Button
            label="Change password"
            outlined
            class="h-1 w-8"
            @click="passwordVisible = !passwordVisible"
          />
        </div>

        <!-- Save Button -->
        <div class="card flex justify-content-end mt-3">
          <Button label="Save" class="w-full h-1" @click="onClickSave" />
        </div>
      </div>
    </div>
  </div>

  <!-- Dialog Change Password -->
  <Dialog
    v-model:visible="passwordVisible"
    modal
    :style="{ width: '30rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <template #header>
      <span class="font-semibold w-full text-center">Change Password</span>
    </template>

    <div class="flex flex-column gap-3">
      <div class="flex align-items-center">
        <span class="w-11rem">
          Current password <span class="text-red-500">*</span>
        </span>
        <Password v-model="password" :feedback="false" toggleMask />
      </div>

      <div class="flex align-items-center">
        <span class="w-11rem">
          New password <span class="text-red-500">*</span>
        </span>
        <Password v-model="newPassword" toggleMask />
      </div>

      <div class="flex align-items-center">
        <span class="w-11rem">
          Confirm password <span class="text-red-500">*</span>
        </span>
        <Password v-model="confirmPassword" toggleMask />
      </div>
    </div>

    <div class="flex justify-content-end gap-2 pt-3">
      <div class="card flex justify-content-center">
        <Button label="Cancel" @click="passwordVisible = false" outlined />
      </div>
      <div class="card flex justify-content-center">
        <Button label="Save" @click="onClickChangePassword" />
      </div>
    </div>
  </Dialog>
</template>

<style scoped></style>
