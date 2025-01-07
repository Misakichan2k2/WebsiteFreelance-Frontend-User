<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { STORE_FREELANCER } from "@/services/stores";

const router = useRouter();
const toast = useToast();

const { onActionFreelancerPost } = STORE_FREELANCER.StoreFreelancer();

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

const title = ref(null);
const description = ref("");
const price = ref();
const sampleWork = ref("");
const engAvailable = ref(false);
const selectedCategory = ref(null);
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
    description.value.trim() !== "" &&
    selectedCategory.value !== null &&
    price.value !== null;
};

// Step 2

const jobMedia = ref({
  images: [],
  exampleLink: "",
});

const onAdvancedUpload = (event) => {
  const file = event.files[0];
  const maxSize = 5 * 1024 * 1024; // Giới hạn 5MB

  if (file.size > maxSize) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "File size exceeds 5MB limit.",
      life: 3000,
    });
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    jobMedia.value.images.push(e.target.result); // Lưu dữ liệu ảnh base64 vào jobMedia.images
  };
  reader.readAsDataURL(file);

  // Thông báo thành công
  toast.add({
    severity: "success",
    summary: "Upload Successful",
    detail: "File uploaded successfully.",
    life: 3000,
  });
};

// Step 3
// Tạo state sử dụng ref API
const agreement = ref({
  ownWork: false,
  deliverWork: false,
  terms: false,
});

// Kiểm tra tính hợp lệ của form
const isAgreementValid = computed(() => {
  return (
    agreement.value.ownWork &&
    agreement.value.deliverWork &&
    agreement.value.terms
  );
});

// Nhãn cho nút submit
const submitLabel = computed(() => {
  return isAgreementValid.value ? "Submit" : "PLease agree to all terms";
});

// Xử lý khi gửi form
const submitAgreement = async () => {
  const postData = {
    title: title.value,
    detail: description.value,
    budget: price.value,
    engAvailable: engAvailable.value,
    category: selectedCategory.value.name,
    sampleWork: sampleWork.value,
  };

  await onActionFreelancerPost(postData)
    .then(() => {
      toast.add({
        severity: "success",
        summary: "Post Created",
        detail:
          "Your post has been successfully created and is awaiting approval.",
        life: 3000,
      });
      router.push({ name: "FreelancerBoard" });
    })
    .catch(() => {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "There was an error creating the post.",
        life: 3000,
      });
    });
};
</script>

<template>
  <div class="card flex flex-column align-items-center px-6 pt-3 pb-6 gap-6">
    <Stepper value="1" linear class="w-full">
      <StepList>
        <Step value="1">Job Details</Step>
        <Step value="2">Upload Media</Step>
        <Step value="3">Agreement</Step>
      </StepList>

      <div class="mx-8 mt-3 p-5 border-round shadow-1">
        <StepPanels>
          <!-- Step 1: Job Details -->
          <StepPanel v-slot="{ activateCallback }" value="1">
            <div class="flex flex-column gap-4">
              <div class="flex flex-column">
                <span class="text-md text-blue-600 font-semibold">Step 1</span>
                <span class="text-2xl font-semibold">Job Details</span>
              </div>
              <div class="flex flex-column gap-2">
                <label for="category" class="font-semibold"
                  >Category
                  <span class="text-red-500 font-semibold">*</span></label
                >
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
                  @input="checkFormValidity"
                />
              </div>
              <div class="flex flex-column gap-2">
                <label for="title" class="font-semibold"
                  >Job Title
                  <span class="text-red-500 font-semibold">*</span></label
                >
                <InputText
                  id="title"
                  v-model="title"
                  class="w-full"
                  @input="checkFormValidity"
                />
              </div>
              <div class="flex flex-column gap-2">
                <label for="price" class="font-semibold"
                  >Starting Price
                  <span class="text-red-500 font-semibold">*</span></label
                >
                <InputNumber
                  id="price"
                  v-model="price"
                  mode="currency"
                  currency="USD"
                  class="w-full"
                  @input="checkFormValidity"
                />
              </div>
              <div class="flex flex-column gap-2">
                <label for="description" class="font-semibold"
                  >Job Description
                  <span class="text-red-500 font-semibold">*</span></label
                >
                <Textarea
                  id="description"
                  v-model="description"
                  rows="4"
                  class="w-full"
                  @input="checkFormValidity"
                />
              </div>
              <div class="flex gap-2 align-items-center">
                <Checkbox v-model="engAvailable" binary />
                <span class="font-semibold"
                  >Available for English communication</span
                >
              </div>
            </div>
            <div class="flex pt-6 justify-content-between">
              <div></div>
              <Button
                label="Next"
                icon="pi pi-arrow-right"
                :disabled="!isFormValid"
                @click="activateCallback('2')"
              />
            </div>
          </StepPanel>

          <!-- Step 2: Upload Media -->
          <StepPanel v-slot="{ activateCallback }" value="2">
            <div class="flex flex-column gap-4">
              <div class="flex flex-column">
                <span class="text-md text-blue-600 font-semibold">Step 2</span>
                <span class="text-2xl font-semibold"> Upload Media</span>
              </div>
              <div class="flex flex-column gap-2">
                <label for="images">Upload Your Work Images</label>
                <FileUpload
                  id="images"
                  mode="advanced"
                  :multiple="true"
                  :maxFileSize="1000000"
                  accept="image/*"
                  :auto="false"
                  :customUpload="true"
                  v-model="jobMedia.images"
                  @upload="onAdvancedUpload($event)"
                >
                  <template #empty>
                    <div
                      class="flex align-items-center justify-content-center flex-column"
                    >
                      <i
                        class="pi pi-cloud-upload text-4xl p-4 border-1 border-gray-300 shadow-1 border-circle"
                      />
                      <p class="mt-4 mb-0">
                        Drag and drop files to here to upload.
                      </p>
                    </div>
                  </template>
                </FileUpload>
              </div>
              <div class="flex flex-column gap-2">
                <label for="exampleLink">Example Link</label>
                <InputText
                  id="exampleLink"
                  v-model="jobMedia.exampleLink"
                  class="w-full"
                />
              </div>
            </div>
            <div class="flex pt-6 justify-content-between">
              <Button
                label="Back"
                severity="secondary"
                icon="pi pi-arrow-left"
                @click="activateCallback('1')"
              />
              <Button
                label="Next"
                icon="pi pi-arrow-right"
                @click="activateCallback('3')"
              />
            </div>
          </StepPanel>

          <!-- Step 3: Agreement -->
          <StepPanel v-slot="{ activateCallback }" value="3">
            <div class="flex flex-column gap-4">
              <div class="flex flex-column">
                <span class="text-md text-blue-600 font-semibold">Step 3</span>
                <span class="text-2xl font-semibold">Agreement</span>
              </div>
              <div class="flex flex-column">
                <div class="flex flex-column gap-3">
                  <div class="flex flex-column">
                    <span class="text-lg font-semibold">
                      Confirm Your Agreement to Work on Freelance
                      <span class="text-red-500 font-semibold">*</span>
                    </span>
                    <span class="text-sm text-gray-600">
                      If you do not comply with the trial agreement, you will
                      not be eligible to apply for jobs on Freelance.
                    </span>
                  </div>

                  <div
                    class="flex gap-1 p-2 border-1 border-round border-blue-600 bg-primary-100"
                  >
                    <div class="flex flex-column text-sm text-blue-800">
                      <div class="flex gap-2">
                        <Tag icon="pi pi-info-circle" severity="info"></Tag>
                        <span>Additional information from the system</span>
                      </div>
                      <ul class="p-list-none">
                        <li>
                          The system will verify job posting information only
                          after the profile has been approved.
                        </li>
                        <li>
                          The review and approval process will take up to 7
                          working days.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="flex flex-column gap-2">
                    <p class="font-semibold">By confirming, you acknowledge:</p>
                    <div class="flex flex-column pl-3">
                      <span>
                        <input type="checkbox" v-model="agreement.ownWork" /> I
                        am the rightful owner of the work submitted.
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          v-model="agreement.deliverWork"
                        />
                        I can deliver all work as outlined in the job
                        description.
                      </span>
                      <span>
                        <input type="checkbox" v-model="agreement.terms" /> I
                        have read and agree to the Freelance Terms and
                        Conditions of Use.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex pt-6 justify-content-between">
              <Button
                label="Back"
                severity="secondary"
                icon="pi pi-arrow-left"
                @click="activateCallback('2')"
              />
              <Button
                :label="submitLabel"
                icon="pi pi-check"
                :disabled="!isAgreementValid"
                @click="submitAgreement"
              />
            </div>
          </StepPanel>
        </StepPanels>
      </div>
    </Stepper>
  </div>
</template>

<style scoped></style>
