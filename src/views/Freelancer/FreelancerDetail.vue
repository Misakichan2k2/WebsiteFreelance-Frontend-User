<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { STORE_FREELANCER } from "@/services/stores";
import { STORE_PROFILE } from "@/services/stores";

const route = useRoute();
const router = useRouter();
const freelancerDetail = ref(null);
const freelancerProfile = ref(null);
const displayedFreelancers = ref([]);

const { onActionFreelancerDetail, onActionRandomFreelancerBoard } =
  STORE_FREELANCER.StoreFreelancer();
const { onActionFreelancerProfile } = STORE_PROFILE.StoreProfile();

// Fetch freelancer job details
const fetchFreelancerPost = async () => {
  try {
    const response = await onActionFreelancerDetail(route.params.id);
    if (response?.data) {
      freelancerDetail.value = response.data;

      // Lấy userId từ postBy.userId và gọi fetchFreelancerProfile
      const userId = response.data.postBy.userId;
      fetchFreelancerProfile(userId);
    } else {
      throw new Error("No data found");
    }
  } catch (error) {
    console.error("Error fetching job details:", error);
    alert("Failed to load freelancer details. Please try again later.");
  }
};

// Fetch freelancer profile
const fetchFreelancerProfile = async (userId) => {
  try {
    const response = await onActionFreelancerProfile();
    if (response?.data) {
      // Tìm profile có userId khớp
      const matchedProfile = response.data.find(
        (profile) => profile.userProfile.userId === userId
      );
      if (matchedProfile) {
        freelancerProfile.value = matchedProfile;
        console.log("Matched Freelancer Profile:", matchedProfile);
      } else {
        console.warn("No matching profile found for userId:", userId);
      }
    } else {
      throw new Error("No profiles found");
    }
  } catch (error) {
    console.error("Error fetching freelancer profile:", error);
  }
};

// Fetch random freelancers (excluding current freelancer)
const fetchRandomFreelancers = async () => {
  try {
    const excludeId = route.params.id;
    const response = await onActionRandomFreelancerBoard(excludeId);

    if (response?.data) {
      displayedFreelancers.value = response.data;
    } else {
      throw new Error("No data found");
    }
  } catch (error) {
    console.error("Error fetching random freelancers:", error);
    alert("Failed to load random freelancers. Please try again later.");
  }
};

// Fetch data when component is mounted or when route params change
onMounted(() => {
  fetchFreelancerPost();
  fetchRandomFreelancers();
});

// Watch for changes in route params.id to re-fetch both freelancer and random freelancers
watch(
  () => route.params.id,
  () => {
    fetchFreelancerPost();
    fetchRandomFreelancers();
  }
);

// Navigate to freelancer detail page
const navigateToFreelancerDetail = (freelancer) => {
  if (freelancer && freelancer._id) {
    router.push(`/freelancer/detail/${freelancer._id}`);
  } else {
    console.error("Invalid data, no _id found", freelancer);
  }
};

// View Profile handler
const onViewProfile = () => {
  if (freelancerProfile.value) {
    router.push(`profile/${freelancerProfile.value._id}`);
  } else {
    console.error("Freelancer profile is not loaded yet.");
  }
};
</script>

<template>
  <div
    v-if="freelancerDetail"
    class="flex gap-5 my-3 mx-7 px-3 py-4 justify-content-between"
  >
    <div class="flex flex-column gap-2 w-12 pr-5">
      <div class="w-12">
        <img
          :src="`http://localhost:3000/uploads/${freelancerDetail.imagePath}`"
          alt="freelancer post image"
          class="w-full border-round-md"
          style="object-fit: cover"
        />
      </div>
      <div>
        <div class="flex gap-2 border-bottom-1 pb-3 border-300">
          <Tag
            v-if="freelancerDetail.engAvailable"
            severity="info"
            value="ENG"
            class="h-max mt-1"
          />
          <h2 class="font-semibold text-blue-600">
            {{ freelancerDetail.title }}
          </h2>
        </div>

        <div class="py-3">
          <span class="text-justify">{{ freelancerDetail.detail }}</span>
        </div>

        <div class="flex flex-column gap-3">
          <span class="text-xl text-blue-600 font-semibold">Freelancer</span>
          <div
            class="p-3 flex justify-content-between gap-3 border-round border-1 border-gray-300"
          >
            <div class="flex gap-5">
              <div>
                <div class="w-6rem h-6rem border-circle">
                  <img
                    :src="
                      freelancerDetail?.postBy?.avatar.startsWith('http')
                        ? freelancerDetail?.postBy?.avatar
                        : `http://localhost:3000${freelancerDetail?.postBy?.avatar}`
                    "
                    alt="Avatar"
                    class="w-full h-full border-circle"
                    style="object-fit: cover"
                  />
                </div>
              </div>

              <div class="flex flex-column">
                <span class="text-lg font-semibold">{{
                  freelancerProfile?.fullName
                }}</span>
                <span class="text-sm"
                  >{{ freelancerProfile?.description }}
                </span>
              </div>
            </div>

            <div
              class="flex h-fit text-blue-600 gap-2 w-max cursor-pointer hover:bg-gray-200 p-2 text-xs border-1 border-gray-300 border-round"
              @click="onViewProfile"
            >
              <i class="pi pi-external-link font-semibold"></i>
              <span class="w-max font-semibold">View profile</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right side -->
    <div class="h-max flex flex-column gap-3" style="width: 36%">
      <div
        class="flex gap-3 align-items-center shadow-2 border-round bg-blue-50 p-3"
      >
        <i class="pi pi-shield text-blue-600 text-3xl"></i>
        <div class="flex flex-column">
          <span class="font-semibold text-blue-600">Freelance Guarantee</span>
          <span class="mt-1 text-xs text-gray-600 line-height-3"
            >Take care throughout the employment, safe, not cheated, the
            middleman protects the money until the job is approved.
          </span>
          <span class="text-xs text-blue-600 cursor-pointer line-height-3"
            >Read additional terms and conditions and protection rights.
          </span>
        </div>
      </div>

      <div class="flex flex-column gap-3">
        <span class="font-semibold text-xl text-blue-600">Other Services</span>
        <div
          v-for="freelancer in displayedFreelancers"
          :key="freelancer.postId"
          @click="navigateToFreelancerDetail(freelancer)"
          class="flex flex-column cursor-pointer p-3 border-round-md surface-card shadow-2 gap-3"
        >
          <img
            :src="`http://localhost:3000/uploads/${freelancer.imagePath}`"
            alt="freelancer post image"
            class="w-full border-round-md"
            style="height: 150px; object-fit: cover"
          />
          <h3 class="text-lg text-start font-semibold">
            {{ freelancer.title }}
          </h3>
          <div
            :class="
              freelancer.engAvailable
                ? 'flex justify-content-between align-items-center'
                : 'flex justify-content-end'
            "
          >
            <Tag
              v-if="freelancer.engAvailable"
              severity="info"
              value="ENG"
              class="h-max"
            />
            <div class="text-right flex flex-column">
              <span class="text-sm text-secondary"> Start from </span>
              <span class="text-sm text-cyan-600"
                >${{ freelancer.budget.toFixed(2) }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="card">
    <div
      class="flex rounded border border-surface-200 dark:border-surface-700 p-6 bg-surface-0 dark:bg-surface-900"
    >
      <div class="w-full">
        <div class="flex mb-4">
          <Skeleton width="100%" height="300px"></Skeleton>
        </div>
        <Skeleton width="100%" height="50px"></Skeleton>

        <div class="flex flex-column mt-4 gap-2">
          <Skeleton width="100%" height="25px"></Skeleton>
          <Skeleton width="100%" height="25px"></Skeleton>
          <Skeleton width="100%" height="25px"></Skeleton>
          <Skeleton width="100%" height="25px"></Skeleton>
          <Skeleton width="80%" height="25px"></Skeleton>
        </div>
        <div class="flex gap-2 mt-5">
          <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
          <div>
            <Skeleton width="10rem" class="mb-2"></Skeleton>
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height=".5rem"></Skeleton>
          </div>
        </div>
      </div>
      <div class="w-5 flex flex-column gap-2 align-items-end">
        <Skeleton width="70%" height="170px"></Skeleton>
        <Skeleton width="70%" height="170px"></Skeleton>
        <Skeleton width="70%" height="170px"></Skeleton>
        <Skeleton width="70%" height="170px"></Skeleton>
        <Skeleton width="70%" height="170px"></Skeleton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
