<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { STORE_FREELANCER } from "@/services/stores";

const router = useRouter();

const categories = ref([
  { name: "Graphic Design" },
  { name: "UX/UI Design" },
  { name: "Architecture and Interior Design" },
  { name: "Art and Painting" },
  { name: "Application Development" },
  { name: "IT Solutions" },
  { name: "IoT Work" },
  { name: "Website Development" },
  { name: "Influencer" },
  { name: "Baht" },
  { name: "Online Media" },
  { name: "Person" },
  { name: "Online Store Management" },
  { name: "Lifestyle" },
  { name: "Self-Improvement" },
  { name: "Marketing" },
  { name: "Business and Finance" },
  { name: "Images and Videos" },
  { name: "Put on Makeup" },
  { name: "Stylist" },
  { name: "Actor" },
  { name: "Voice Actor" },
  { name: "Singer" },
  { name: "Sound Engineer" },
  { name: "Writings / Articles" },
  { name: "Language" },
  { name: "Other" },
]);

const selectedCategory = ref(null);
const filteredCategories = ref([]);
const allFreelancers = ref([]);

// Hiển thị freelancers lọc
const filteredFreelancers = ref(allFreelancers.value);

// Tính toán các freelancers hiển thị dựa trên phân trang
const itemsPerPage = 8; // Số freelancer hiển thị trên mỗi trang
const displayedFreelancers = computed(() => {
  const start = first.value;
  const end = start + itemsPerPage;
  return filteredFreelancers.value.slice(start, end);
});

// Tìm kiếm danh mục trong AutoComplete
const searchCategories = (event) => {
  const query = event.query.toLowerCase();
  filteredCategories.value = categories.value.filter((item) =>
    item.name.toLowerCase().includes(query)
  );
};

// Lọc freelancers theo danh mục
const filterData = () => {
  if (selectedCategory.value) {
    filteredFreelancers.value = allFreelancers.value.filter(
      (freelancer) => freelancer.category === selectedCategory.value.name
    );
  } else {
    filteredFreelancers.value = allFreelancers.value;
  }
  first.value = 0; // Reset về trang đầu tiên khi thay đổi danh mục
};

const first = ref(0);

const handleClick = (data) => {
  router.push(`detail/${data._id}`);
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
  <div
    class="flex flex-column px-5 py-4 gap-3 bg-white border-bottom-1 border-300"
  >
    <div class="flex justify-content-between">
      <h1 class="font-semibold">Freelancer Board</h1>
      <AutoComplete
        v-model="selectedCategory"
        :suggestions="filteredCategories"
        @complete="searchCategories"
        @change="filterData"
        :virtualScrollerOptions="{ itemSize: 38 }"
        optionLabel="name"
        dropdown
        placeholder="Search for job categories"
        class="w-3"
      />
    </div>

    <div class="card">
      <div class="grid mt-2 gap-4">
        <template v-if="displayedFreelancers.length > 0">
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
        </template>
        <template v-else>
          <div class="w-max">
            <h3>No freelancers found for the selected category.</h3>
          </div>
        </template>
      </div>
    </div>
    <Paginator
      v-model:first="first"
      :rows="itemsPerPage"
      :rowsPerPageOptions="[10, 20, 30]"
      :totalRecords="filteredFreelancers.length"
      template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink "
    />
  </div>

  <div>
    <div class="text-sm flex flex-column surface-100 px-4 py-5">
      <!-- Header Section -->
      <div class="my-3 flex flex-column">
        <span class="mb-2 font-semibold">
          Create websites and develop systems
        </span>
        <span class="text-justify">
          Website creation and development services according to customer needs,
          whether it is
          <span class="font-semibold">creating a company website</span>,
          <span class="font-semibold">creating a sales website</span>,
          <span class="font-semibold">creating a hotel website</span>,
          <span class="font-semibold">a ready-made website</span>,
          <span class="font-semibold">creating a school website</span>,
          <span class="font-semibold">creating a real estate website</span>,
          <span class="font-semibold">a single-page website</span>, including
          <span class="font-semibold">website troubleshooting</span>,
          <span class="font-semibold">adding website features</span>,
          <span class="font-semibold">creating a custom website</span>,
          <span class="font-semibold">improving and editing the website</span>,
          redesigning the website, back-end system, website system to make the
          web page modern, making the website support all communication tools
          (Responsive or Mobile Site) by developing a website from an
          experienced person. It can be guaranteed that our
          <span class="font-semibold">website creation service</span> will be
          beautiful, perfect, and you will definitely like it at freelance.co, a
          source of
          <span class="font-semibold">website creation experts</span> (Website)
          who are ready to help you.
        </span>
      </div>

      <!-- Service Details Section -->
      <div class="mb-3 flex flex-column">
        <span class="mb-2 font-semibold">
          Website creation service (Website)
        </span>
        <span class="text-justify">
          Website creation service, website writing, creating new websites
          (Custom Made Website) or ready-made websites (Template Website) with a
          variety of design styles that are in line with the principles of
          <span class="font-semibold">website creation</span> in various
          languages HTML, CSS, PHP, JSP, C++, C#, SQL, jQuery, Bootstrap, Wix,
          and others. Websites can be created to cover all needs, such as
          websites for businesses, companies, organizations, selling, and
          general use. It meets the needs of all sizes of organizations,
          including small / medium / large / SME / selling / news websites at an
          affordable price. On the freelance.co website, we have gathered
          quality freelancers to provide services through a selection process to
          ensure that this
          <span class="font-semibold">website creation service</span> will be
          beautiful and most pleasing to employers.
        </span>
      </div>

      <!-- How to Hire Section -->
      <div>
        <span class="font-semibold mb-3">
          How to hire freelancers to create websites and develop freelance
          systems
        </span>
        <ol class="">
          <li>
            Find a freelancer you like by considering their work, capabilities,
            work processes, as well as reviews and comments received.
          </li>
          <li>
            Discuss details with the freelancer, giving the freelancer complete
            work details. The freelancer will create a price quote for you to
            consider.
          </li>
          <li>
            Agree on the schedule, ensure all details of the project are
            completed, and the freelancer will deliver the project on time.
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
.text-secondary {
  color: #6c757d;
}
</style>
