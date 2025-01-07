<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { STORE_FREELANCER } from "@/services/stores";

const keySearch = ref(null);

const categories = [
  { name: "Hot Trend", icon: "pi pi-chart-line" },
  { name: "Graphic Design", icon: "pi pi-palette" },
  { name: "Architecture and Engineering", icon: "pi pi-building" },
  { name: "Website and Technology", icon: "pi pi-globe" },
  { name: "Marketing and Advertising", icon: "pi pi-megaphone" },
  { name: "Writing and Translating", icon: "pi pi-pencil" },
  { name: "Audio and Visual", icon: "pi pi-video" },
  { name: "Business and Consulting", icon: "pi pi-briefcase" },
  { name: "Lifestyle", icon: "pi pi-heart" },
];

const router = useRouter();

const allFreelancers = ref([]);

const filteredFreelancers = ref(allFreelancers.value);

const itemsPerPage = 8;
const displayedFreelancers = computed(() => {
  const start = first.value;
  const end = start + itemsPerPage;
  return filteredFreelancers.value.slice(start, end);
});

const first = ref(0);

const handleClick = (data) => {
  router.push(`freelancer/detail/${data._id}`);
};

const { onActionFreelancerBoard } = STORE_FREELANCER.StoreFreelancer();

const fetchJobsFromBackend = async () => {
  try {
    console.log(filteredFreelancers.value);

    const response = await onActionFreelancerBoard();

    // Đảm bảo response là một object chứa data
    if (response && response.data && Array.isArray(response.data)) {
      console.log("Jobs fetched:", response.data);
      allFreelancers.value = response.data;
      filteredFreelancers.value = response.data;
    } else {
      console.error("Unexpected response format:", response);
    }
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
};

// Gọi hàm fetch dữ liệu khi component được mount
onMounted(fetchJobsFromBackend);
</script>

<template>
  <div>
    <div class="relative w-full surface-hover">
      <!-- Background in Right -->
      <div class="background-custom w-full h-20rem"></div>
      <!-- Content -->
      <div class="p-5 text-center w-full absolute top-0 flex flex-column gap-4">
        <div>
          <p class="text-white text-2xl font-semibold">
            We have professional freelancers in...
          </p>
          <p class="text-white text-4xl font-semibold">web development</p>
          <p class="text-white text-xl font-semibold">
            who are ready to turn your ideas into reality
          </p>
        </div>
        <div>
          <InputText
            v-model="keySearch"
            placeholder="Search for freelance work..."
            class="w-5"
          />
        </div>
        <!-- Submenu -->
        <div
          class="mt-5 flex p-3 justify-content-between bg-white border-round-lg shadow-2"
        >
          <div
            v-for="category in categories"
            :key="category.name"
            class="flex flex-column border-round hover:bg-gray-200 cursor-pointer p-1"
          >
            <i :class="category.icon" class="category-icon"></i>
            <span>{{ category.name }}</span>
          </div>
        </div>
      </div>

      <div class="flex flex-column mt-7 gap-5 p-5 card">
        <h3 class="font-semibold text-2xl">Freelancer Board</h3>
        <div class="grid">
          <div
            v-for="freelancer in displayedFreelancers"
            :key="freelancer.postId"
            @click="handleClick(freelancer)"
            class="flex flex-column cursor-pointer p-3 border-round-md surface-card border-1 border-gray-100 shadow-1 hover:shadow-3 gap-3"
          >
            <img
              :src="`http://localhost:3000/uploads/${freelancer.imagePath}`"
              alt="freelancer name"
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
  </div>
</template>

<style scoped>
.background-custom {
  background: linear-gradient(#85dae3, #9198e5);
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.text-secondary {
  color: #6c757d;
}
</style>
