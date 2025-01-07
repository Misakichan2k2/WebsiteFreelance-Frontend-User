<script setup>
const steps = [
  {
    title: "Step 1: Register as a Freelancer",
    description:
      "To get started, you need to register as a freelancer. Click on the 'Sign up as a Freelancer' button on the homepage and fill out the registration form.",
    icon: "pi pi-user-plus",
  },
  {
    title: "Step 2: Explore Job Opportunities",
    description:
      "Once registered, browse the job listings to find opportunities that match your skills and interests.",
    icon: "pi pi-search",
  },
  {
    title: "Step 3: View Job Details",
    description:
      "Click on any job to view its details, including requirements and budget, to ensure it matches your expectations.",
    icon: "pi pi-info-circle",
  },
  {
    title: "Step 4: Apply for a Job",
    description:
      "Click the 'Apply for Job' button on the job detail page to express your interest. Your application will be marked as 'Interested'.",
    icon: "pi pi-send",
  },
  {
    title: "Step 5: Wait for Acceptance",
    description:
      "The customer will review your application. Once they accept, you will be assigned the job and can begin working.",
    icon: "pi pi-check-circle",
  },
];
</script>

<template>
  <div class="flex flex-column align-items-center gap-4 p-4">
    <!-- Tiêu đề -->
    <h1 class="text-2xl font-bold text-center">
      User Guide: How to Get Job on Job Board
    </h1>

    <!-- Danh sách các bước -->
    <div class="w-full flex flex-column gap-3 align-items-center">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="col-12 md:col-6 lg:col-4 flex flex-column align-items-start gap-2 p-3 border-1 border-round border-gray-300"
      >
        <!-- Icon và tiêu đề -->
        <div class="flex align-items-center gap-2">
          <i :class="step.icon" class="text-blue-500 text-3xl"></i>
          <h3 class="text-xl font-semibold">{{ step.title }}</h3>
        </div>

        <!-- Mô tả -->
        <p class="text-sm text-justify">{{ step.description }}</p>
      </div>
    </div>
  </div>
</template>
