<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { STORE_JOB } from "@/services/stores";
import { userData } from "@/utils";

const router = useRouter();
const toast = useToast();
const confirm = useConfirm();

const title = ref(null);
const detail = ref("");
const budget = ref();
const sampleWork = ref("");
const deadline = ref();
const contact = ref("");
const engChecked = ref(false);
const selectedCategory = ref(null);

const { onActionJobPost } = STORE_JOB.StoreJob();

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

const filteredCategories = ref([]);

const searchCategories = (event) => {
  const query = event.query.toLowerCase();
  filteredCategories.value = categories.value.filter((item) =>
    item.name.toLowerCase().includes(query)
  );
};

const isFormValid = ref(false);

const checkFormValidity = () => {
  isFormValid.value =
    title.value !== null &&
    detail.value.trim() !== "" &&
    selectedCategory.value !== null &&
    budget.value !== null;
};

// Function to make the API call
const createJobPost = async () => {
  const postData = {
    postBy: userData.value._id,
    title: title.value,
    detail: detail.value,
    budget: budget.value,
    sampleWork: sampleWork.value,
    deadline: deadline.value,
    engRequired: engChecked.value,
    category: selectedCategory.value?.name,
    contact: contact.value,
  };

  console.log(postData);
  console.log(userData.value);

  await onActionJobPost(postData)
    .then(() => {
      toast.add({
        severity: "success",
        summary: "Job Post Created",
        detail: "Your job post has been created successfully.",
        life: 3000,
      });

      router.push({ name: "JobBoard" });
    })
    .catch(() => {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "There was an error creating the job post.",
        life: 3000,
      });
    });
};

const showTemplate = () => {
  confirm.require({
    group: "templating",
    message: "Please confirm to accept the terms and post.",
    icon: "pi pi-exclamation-circle",
    rejectProps: {
      label: "Cancel",
      outlined: true,
    },
    acceptProps: {
      label: "Confirm",
    },
    accept: () => {
      createJobPost();
    },
    reject: () => {
      toast.add({
        severity: "error",
        summary: "Rejected",
        detail: "You have rejected the job post.",
        life: 3000,
      });
    },
  });
};
</script>

<template>
  <div
    class="flex flex-column my-3 mx-7 bg-white px-3 py-4 border-round-md shadow-2 gap-3"
  >
    <h2 class="font-semibold">Post a new job</h2>
    <div class="border-1 border-round border-blue-500 bg-blue-100">
      <div class="flex gap-1 p-2">
        <span class="text-sm text-blue-800">
          <Tag icon="pi pi-info-circle" severity="info"></Tag> For
          <span class="underline">“Job posting”</span> only. Do not sell
          products, share contact info, or violate system terms. Violations will
          be removed immediately.
        </span>
      </div>
    </div>
    <div class="flex flex-column gap-1">
      <span class="font-semibold"
        >Job title <span class="text-red-600 font-semibold">*</span></span
      >
      <InputText
        type="text"
        v-model="title"
        placeholder="I find..."
        class="text-sm"
        @input="checkFormValidity"
      />
    </div>

    <div class="flex flex-column gap-1">
      <span class="font-semibold"
        >Job details <span class="text-red-600 font-semibold">*</span></span
      >
      <Textarea
        v-model="detail"
        rows="5"
        cols="30"
        placeholder="Describe the details of the work you want, such as:
      1. Work information: Purpose of the work, Customer group, Operation plan, etc...
      2. Work details: Number of pieces, Scope of work, Necessary conditions, etc...
      3. Contact information such as email, phone number, etc,..."
        class="text-sm"
        @input="checkFormValidity"
      />
    </div>

    <div class="flex flex-column gap-3 justify-content-between">
      <div class="flex flex-column gap-1">
        <span class="font-semibold">Sample of desired work (if any)</span>
        <InputText
          type="text"
          v-model="sampleWork"
          placeholder="For example, https://example.com"
        />
      </div>

      <div class="flex flex-column gap-1 w-full">
        <span class="font-semibold"
          >Job Category <span class="text-red-600 font-semibold">*</span></span
        >
        <AutoComplete
          v-model="selectedCategory"
          :suggestions="filteredCategories"
          @complete="searchCategories"
          :virtualScrollerOptions="{ itemSize: 38 }"
          optionLabel="name"
          dropdown
          class="w-full"
          placeholder="To make it easier for those interested in finding your job"
          @input="checkFormValidity"
        />
      </div>
    </div>

    <div class="flex gap-2">
      <div class="flex flex-column gap-1 w-full">
        <label for="budget" class="font-semibold">
          Budget <span class="text-red-600 font-semibold">*</span></label
        >
        <InputNumber
          v-model="budget"
          inputId="budget"
          mode="currency"
          currency="USD"
          locale="en-US"
          fluid
          @input="checkFormValidity"
        />
      </div>
      <div class="flex flex-column gap-1 w-full">
        <label for="deadline" class="font-semibold">
          Submission deadline (if any)
        </label>
        <DatePicker
          v-model="deadline"
          showIcon
          fluid
          iconDisplay="input"
          inputId="deadline"
        />
      </div>
    </div>

    <div class="flex gap-2 align-items-center">
      <Checkbox v-model="engChecked" binary />
      <label for="engChecked" class="font-semibold">
        An English-speaking seller is required.
      </label>
    </div>

    <div class="mt-2 flex gap-2 justify-content-end">
      <RouterLink to="/jobs/board">
        <Button label="Back" outlined class="w-full" />
      </RouterLink>
      <ConfirmDialog group="templating" class="w-4">
        <template #message="slotProps">
          <div class="flex flex-column align-items-center gap-4 border-primary">
            <i
              :class="slotProps.message.icon"
              class="text-primary text-6xl"
            ></i>
            <p class="font-semibold">{{ slotProps.message.message }}</p>
            <ul class="text-500">
              <li>The system will review and approve within 1 business day.</li>
              <li>
                Your announcement will be valid for 30 days (from the date of
                approval).
              </li>
              <li>
                If any information is found that violates the terms or
                conditions or is in violation of the usage, the system will not
                approve it and you will not be able to edit the post later.
              </li>
            </ul>
          </div>
        </template>
      </ConfirmDialog>
      <div class="w-1">
        <Button
          @click="showTemplate"
          label="Post"
          class="w-full"
          :disabled="!isFormValid"
        ></Button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
