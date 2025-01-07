<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import NumberToEnglishWords from "./services/store";
import Dropzone from "./components/Dropzone.vue";
import { STORE_JOB } from "@/services/stores";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const jobDetail = ref(null);

// Format Currency Helper
const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

// Convert Number to Words
const numberToWords = (num) => {
  return NumberToEnglishWords(num);
};

const { onActionJobDetail } = STORE_JOB.StoreJob();

// Fetch job details
const fetchJobPost = async () => {
  try {
    console.log(jobDetail);
    console.log("Route Params ID:", route.params.id);
    const response = await onActionJobDetail(route.params.id);
    console.log("API Response:", response); // Xem chi tiết phản hồi từ API
    if (response?.data) {
      jobDetail.value = response.data; // Ensure you are updating jobDetail.value here
    } else {
      console.warn("No data found in API response");
    }
    console.log("API Response Data:", response.data);
  } catch (error) {
    console.error("Error fetching job details:", error);
  }
};

onMounted(fetchJobPost);

const handleConfirm = () => {
  toast.add({
    severity: "success",
    summary: "Success",
    detail:
      "You have successfully uploaded the payment confirmation. Your payment confirmation is pending approval.",
    life: 3000,
  });

  router.push({ name: "JobBoard" });
};
</script>

<template>
  <div v-if="jobDetail" class="p-5">
    <!-- Title Section -->
    <div class="border-top-1 border-bottom-1 border-300 py-3 mb-4">
      <div
        class="flex flex-column sm:flex-row justify-content-between align-items-center gap-3"
      >
        <span v-if="jobDetail">Job Post: #{{ jobDetail.postId }}</span>
        <tag severity="danger" class="font-bold w-1">Unpaid</tag>
      </div>
    </div>

    <!-- Content Section -->
    <div class="flex flex-column lg:flex-row lg:justify-content-between gap-5">
      <!-- Room Details -->
      <div class="w-full">
        <div class="border-1 border-300 border-round p-4 bg-gray-100 mb-4">
          <div class="flex justify-content-between mb-3">
            <span>Job title</span>
            <span class="font-bold text-blue-600">{{ jobDetail.title }}</span>
          </div>
          <div class="flex justify-content-between mb-3">
            <span>Assigned freelancer</span>
            <span class="font-bold text-blue-600">{{
              jobDetail.assignedFreelancer.username
            }}</span>
          </div>
          <div class="flex justify-content-between">
            <span>Amount</span>
            <span class="font-bold text-blue-600">{{
              formatCurrency(jobDetail.budget)
            }}</span>
          </div>
        </div>

        <!-- Notes Section -->
        <div class="mt-4">
          <span class="font-bold text-red-600">Notes:</span>
          <ul class="mt-3 text-sm">
            <li>
              Customers must complete payment within 24 hours after
              registration.
            </li>
            <li>
              Only the exact amount stated is accepted. Overpayments or
              underpayments will not be processed.
            </li>
            <li class="text-red-600">
              Double-check information before paying. Room changes are not
              allowed after payment.
            </li>
          </ul>
        </div>
      </div>

      <!-- Payment Details -->
      <div
        class="w-full border-top-1 border-bottom-1 p-3 flex flex-column gap-3"
      >
        <div class="text-red-600 text-sm font-italic">
          Customers must transfer the payment to the following details:
        </div>
        <div class="flex justify-content-between">
          <span class="font-bold">Amount to be paid</span>
          <span class="font-bold text-blue-600">{{
            formatCurrency(jobDetail.budget)
          }}</span>
        </div>
        <div class="flex justify-content-between">
          <span class="font-bold">In words</span>
          <span>{{ numberToWords(jobDetail.budget) }}</span>
        </div>
        <div class="flex justify-content-between">
          <span class="font-bold">Account Holder</span>
          <span>Freelance Company</span>
        </div>
        <div class="flex justify-content-between">
          <span class="font-bold">Account Number</span>
          <span class="font-bold">111 000 111 389</span>
        </div>
        <div class="flex justify-content-between">
          <span class="font-bold">Bank</span>
          <span>Vietinbank</span>
        </div>
        <div class="flex justify-content-between">
          <span class="font-bold">Branch</span>
          <span>Hai Ba Trung Branch</span>
        </div>
      </div>
    </div>

    <!-- Screenshot Upload Section -->
    <div class="my-5 flex flex-column gap-3 align-items-center w-full">
      <p class="text-center text-lg font-bold">Upload Transfer Screenshot</p>
      <div class="w-8 flex flex-column">
        <Dropzone />
        <div class="mt-4">
          <span class="font-bold text-primary">Additional Notes:</span>
          <ul class="mt-3 text-sm">
            <li>
              Please contact support at 012 3456 7899 during business hours for
              assistance.
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-wrap gap-3 justify-content-between mt-5">
      <Button label="Back" class="p-button-secondary w-1" />
      <Button label="Confirm Payment" @click="handleConfirm" />
    </div>
  </div>

  <div v-else class="card">
    <div class="w-full p-8">
      <Skeleton class="mb-2" borderRadius="16px"></Skeleton>
      <Skeleton width="10rem" class="mb-2" borderRadius="16px"></Skeleton>
      <Skeleton width="5rem" borderRadius="16px" class="mb-2"></Skeleton>
      <Skeleton height="2rem" class="mb-2" borderRadius="16px"></Skeleton>
      <Skeleton width="10rem" height="4rem" borderRadius="16px"></Skeleton>
    </div>
  </div>
</template>
