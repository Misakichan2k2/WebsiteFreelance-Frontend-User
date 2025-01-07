<script setup>
import { ref, onMounted } from "vue";
import JobBoardTable from "./components/JobBoardTable.vue";
// import { CustomerService } from "./services/stores/JobBoardService";
import JobYouAdvertiseTable from "./components/JobYouAdvertiseTable.vue";
import { STORE_JOB } from "@/services/stores";
import router from "@/router";

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
const allJobs = ref([]);
const filteredJobs = ref([]);

const { onActionJobBoard } = STORE_JOB.StoreJob();

// Gọi API từ file services/api.js
const fetchJobsFromBackend = async () => {
  try {
    const response = await onActionJobBoard();

    // Đảm bảo response là một object chứa data
    if (response && response.data && Array.isArray(response.data)) {
      console.log("Jobs fetched:", response.data);
      allJobs.value = response.data;
      filteredJobs.value = response.data;
    } else {
      console.error("Unexpected response format:", response);
    }
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
};

// Gọi hàm fetch dữ liệu khi component được mount
onMounted(fetchJobsFromBackend);

// Lọc danh mục
const searchCategories = (event) => {
  const query = event.query.toLowerCase();
  filteredCategories.value = categories.value.filter((item) =>
    item.name.toLowerCase().includes(query)
  );
};

// Lọc dữ liệu bảng khi chọn danh mục
const filterTableData = () => {
  if (selectedCategory.value) {
    filteredJobs.value = allJobs.value.filter(
      (job) => job.category === selectedCategory.value.name
    );
  } else {
    filteredJobs.value = allJobs.value;
  }
};
</script>

<template>
  <div>
    <div class="flex flex-column mb-3 mx-7 bg-white px-3 pb-4 gap-3">
      <div class="relative">
        <div class="relative">
          <img
            src="/public/images/simple-background.jpg"
            alt="header-background"
            class="w-full h-14rem"
          />
          <div class="absolute pt-7 top-0 left-0">
            <h1 class="font-bold text-4xl text-blue-600">Job Board</h1>
            <p class="font-semibold text-lg">
              Employers post jobs to find the right candidates, while
              freelancers choose jobs that interest them.
            </p>
          </div>
        </div>
      </div>

      <div class="card">
        <Tabs value="0">
          <TabList>
            <Tab value="0">Job Board</Tab>
            <Tab value="1">Jobs You Advertise</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0">
              <div class="flex flex-column">
                <div class="flex justify-content-between">
                  <AutoComplete
                    v-model="selectedCategory"
                    :suggestions="filteredCategories"
                    @complete="searchCategories"
                    @change="filterTableData"
                    :virtualScrollerOptions="{ itemSize: 38 }"
                    optionLabel="name"
                    dropdown
                    placeholder="Search for job categories"
                    class="w-4"
                  />
                  <div class="flex gap-2">
                    <Button
                      label="Want to get a job on the job board?"
                      class="text-sm"
                      outlined
                      @click="router.push('/jobs/user-guide')"
                    />
                    <RouterLink to="/jobs/post">
                      <Button label="Freelance recruitment announcement" />
                    </RouterLink>
                  </div>
                </div>
                <div>
                  <JobBoardTable
                    :jobs="filteredJobs"
                    :noDataMessage="
                      filteredJobs.length === 0
                        ? selectedCategory
                          ? 'No jobs match the selected category.'
                          : 'No entries to display.'
                        : ''
                    "
                  />
                </div>
              </div>
            </TabPanel>
            <TabPanel value="1">
              <div>
                <RouterLink to="/jobs/post" class="no-underline">
                  <div class="flex justify-content-end">
                    <Button label="Freelance recruitment announcement" />
                  </div>
                </RouterLink>
                <JobYouAdvertiseTable />
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
