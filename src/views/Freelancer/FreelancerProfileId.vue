<script setup>
import { ref, onMounted } from "vue";
import { format } from "date-fns";
import { useRoute, useRouter } from "vue-router";
import { STORE_PROFILE } from "@/services/stores";
import { STORE_FREELANCER } from "@/services/stores";

const route = useRoute();
const router = useRouter();

// Hàm để định dạng ngày
const formatDate = (date) => {
  return format(new Date(date), "dd/MM/yyyy");
};

const { onActionFreelancerProfileDetail } = STORE_PROFILE.StoreProfile();
const { onActionFreelancerBoard } = STORE_FREELANCER.StoreFreelancer();

const profile = ref(null);
const displayedWorks = ref([]);

const fetchProfileData = async () => {
  try {
    const response = await onActionFreelancerProfileDetail(route.params.id);

    if (response?.data) {
      profile.value = response.data;
      console.log("Freelancer Profile Detail:", response.data);

      // Gọi fetchJobsFromBackend sau khi có userId từ profile
      fetchJobsFromBackend(response.data.userProfile.userId);
    } else {
      console.warn("No matching profile found");
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
};

const fetchJobsFromBackend = async (profileUserId) => {
  try {
    const response = await onActionFreelancerBoard();

    // Đảm bảo response chứa data là một mảng
    if (response && response.data && Array.isArray(response.data)) {
      console.log("Jobs fetched:", response.data);

      // Lọc bài viết chỉ của userId từ profile
      displayedWorks.value = response.data.filter(
        (job) => job.postBy.userId === profileUserId
      );

      console.log("Filtered jobs:", displayedWorks.value);
    } else {
      console.error("Unexpected response format:", response);
    }
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
};

onMounted(() => {
  fetchProfileData();
});

const handleClick = (data) => {
  router.push(`/freelancer/detail/${data._id}`);
};
</script>

<template>
  <div class="relative">
    <div
      class="absolute"
      style="
        width: 100%;
        height: 200px;
        background: linear-gradient(
          to right,
          rgb(188, 219, 255),
          rgb(254, 255, 223)
        );
      "
    >
      <!-- Header Section -->
      <div v-if="profile" class="flex">
        <div
          class="h-fit mt-8 ml-3 bg-white border-1 border-gray-200 border-round flex flex-column gap-4 w-3 p-5 justify-content-center align-items-center"
        >
          <div class="w-12rem h-12rem">
            <img
              :src="
                profile.userProfile.avatar.startsWith('http')
                  ? profile.userProfile.avatar
                  : `http://localhost:3000${profile.userProfile.avatar}`
              "
              alt="Avatar"
              class="w-full h-full border-circle"
              style="object-fit: cover"
            />
          </div>
          <div class="flex flex-column gap-3 align-items-center">
            <h1 class="text-2xl font-bold">{{ profile.fullName }}</h1>
            <div class="w-fit">
              <Tag severity="success" value="Verified Freelancer">
                <i class="pi pi-verified"></i>Verified Freelancer
              </Tag>
            </div>
            <div class="flex w-full justify-content-between">
              <p class="text-sm font-semibold">Joined:</p>
              <p class="text-sm text-blue-600 font-semibold">
                {{ formatDate(profile.createdAt) }}
              </p>
            </div>
            <div class="flex w-full justify-content-between">
              <p class="text-sm font-semibold">Email:</p>
              <p class="text-sm text-blue-600 font-semibold">
                {{ profile.email }}
              </p>
            </div>
            <div
              class="border-1 border-gray-200 p-3 font-italic text-gray-600 bg-gray-50 border-round"
            >
              <span>{{ profile.description }}</span>
            </div>
          </div>
        </div>

        <div class="p-6 flex flex-column gap-3" style="margin-top: 11rem">
          <div class="flex justify-content-between">
            <span class="font-semibold text-2xl"
              >{{ profile.fullName }}'s work(s)</span
            >
          </div>

          <div class="card">
            <div class="grid mt-2 gap-4">
              <template v-if="displayedWorks.length > 0">
                <div
                  v-for="freelancer in displayedWorks"
                  :key="freelancer.postId"
                  class="flex flex-column cursor-pointer p-3 border-round-md surface-card border-1 border-gray-300 hover:shadow-3 gap-1"
                >
                  <div>
                    <img
                      :src="`http://localhost:3000/uploads/${freelancer.imagePath}`"
                      alt="freelancer service post"
                      @click="handleClick(freelancer)"
                      class="w-full border-round-md"
                      style="height: 150px; object-fit: cover"
                    />
                  </div>
                  <h3 class="text-lg text-start font-semibold">
                    {{ freelancer.title }}
                  </h3>
                  <div
                    :class="
                      freelancer.engAvailable
                        ? 'flex justify-content-between h-full align-items-end'
                        : 'flex justify-content-end h-full align-items-end'
                    "
                  >
                    <Tag
                      v-if="freelancer.engAvailable"
                      severity="info"
                      value="ENG"
                      class="h-max"
                    />
                    <div class="flex flex-column text-right">
                      <span class="text-sm text-secondary"> Start from </span>
                      <span class="text-sm text-cyan-600"
                        >${{ freelancer.budget.toFixed(2) }}</span
                      >
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="w-max">
                  <h3>No service postings available yet.</h3>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div
          class="rounded border border-surface-200 dark:border-surface-700 p-6 bg-surface-0 dark:bg-surface-900"
        >
          <div class="flex mb-4">
            <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
            <div>
              <Skeleton width="10rem" class="mb-2"></Skeleton>
              <Skeleton width="5rem" class="mb-2"></Skeleton>
              <Skeleton height=".5rem"></Skeleton>
            </div>
          </div>
          <Skeleton width="100%" height="150px"></Skeleton>
          <div class="flex justify-between mt-4">
            <Skeleton width="4rem" height="2rem"></Skeleton>
            <Skeleton width="4rem" height="2rem"></Skeleton>
          </div>
        </div>
      </div>
    </div>

    <!-- Portfolio Section -->
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
</style>
