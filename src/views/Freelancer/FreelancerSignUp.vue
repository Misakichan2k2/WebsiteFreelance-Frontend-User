<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

const router = useRouter();
const toast = useToast();

const formData = ref({
  description: "",
  email: "",
  phoneNumber: null,
  bankAccountName: "",
  bankAccountNumber: null,
  fullName: "",
  idNumber: "",
  idCardImage: null,
  selfieImage: null,
});

// Form validation
const isStepOneValid = ref(false);
const checkStepOneValidity = () => {
  isStepOneValid.value = formData.value.description.trim() !== "";
};

const isStepTwoValid = ref(false);
const checkStepTwoValidity = () => {
  isStepTwoValid.value =
    formData.value.email.trim() !== "" &&
    formData.value.phoneNumber !== null &&
    formData.value.bankAccountName.trim() !== "" &&
    formData.value.bankAccountNumber !== null;
};

const isStepThreeValid = ref(false);
const checkStepThreeValidity = () => {
  console.log("Current Step 3 Data:", formData.value);
  isStepThreeValid.value =
    formData.value.fullName.trim() !== "" &&
    formData.value.idNumber.trim() !== "" &&
    formData.value.idCardImage !== null &&
    formData.value.selfieImage !== null;

  console.log("Step 3 Validity:", isStepThreeValid.value);
};

const onAdvancedUpload = () => {
  toast.add({
    severity: "info",
    summary: "Success",
    detail: "File Uploaded",
    life: 3000,
  });
};

console.log("Step 3 Validity Check:", {
  fullName: formData.value.fullName,
  idNumber: formData.value.idNumber,
  idCardImage: formData.value.idCardImage,
  selfieImage: formData.value.selfieImage,
  isStepThreeValid: isStepThreeValid.value,
});

const submitForm = () => {
  console.log("Form Submitted:", formData.value);

  toast.add({
    severity: "success",
    summary: "Success",
    detail:
      "You have successfully registered as a freelancer. Your application is pending approval",
    life: 3000,
  });

  router.push({ name: "HomePage" });
};
</script>

<template>
  <div class="card flex flex-column align-items-center px-6 pt-3 pb-6 gap-6">
    <Stepper value="1" linear class="w-full">
      <StepList>
        <Step value="1">Description</Step>
        <Step value="2">Contact Information</Step>
        <Step value="3">Identity Verification</Step>
      </StepList>

      <div class="mx-8 mt-3 p-5 border-round shadow-1">
        <StepPanels>
          <!-- Step 1: Description -->
          <StepPanel v-slot="{ activateCallback }" value="1">
            <div class="flex flex-column gap-4">
              <h2 class="text-2xl font-semibold">Description</h2>
              <div class="flex flex-column gap-2">
                <label for="description" class="font-semibold"
                  >Description<span class="text-red-500 font-semibold"
                    >*</span
                  ></label
                >
                <Textarea
                  id="description"
                  v-model="formData.description"
                  rows="4"
                  class="w-full"
                  placeholder="Enter a detailed description"
                  @input="checkStepOneValidity"
                />
              </div>
            </div>
            <div class="flex pt-6 justify-content-between">
              <div></div>
              <Button
                label="Next"
                icon="pi pi-arrow-right"
                :disabled="!isStepOneValid"
                @click="activateCallback('2')"
              />
            </div>
          </StepPanel>

          <!-- Step 2: Contact Information -->
          <StepPanel v-slot="{ activateCallback }" value="2">
            <div class="flex flex-column gap-4">
              <h2 class="text-2xl font-semibold">Contact Information</h2>
              <div class="flex flex-column gap-2">
                <label for="email" class="font-semibold"
                  >Email<span class="text-red-500 font-semibold">*</span></label
                >
                <InputText
                  id="email"
                  v-model="formData.email"
                  class="w-full"
                  placeholder="Enter your email"
                  @input="checkStepTwoValidity"
                />
              </div>
              <div class="flex flex-column gap-2">
                <label for="phoneNumber" class="font-semibold"
                  >Phone Number<span class="text-red-500 font-semibold"
                    >*</span
                  ></label
                >
                <InputNumber
                  inputId="phoneNumber"
                  v-model="formData.phoneNumber"
                  class="w-full"
                  placeholder="Enter your phone number"
                  :useGrouping="false"
                  fluid
                  @input="checkStepTwoValidity"
                />
              </div>

              <div class="flex gap-2">
                <div class="flex flex-column gap-2 w-full">
                  <label for="bankAccountNumber" class="font-semibold"
                    >Bank Account Number<span class="text-red-500 font-semibold"
                      >*</span
                    ></label
                  >
                  <InputNumber
                    inputId="bankAccountNumber"
                    v-model="formData.bankAccountNumber"
                    placeholder="Enter your bank account number"
                    :useGrouping="false"
                    fluid
                    @input="checkStepTwoValidity"
                  />
                </div>
                <div class="flex flex-column gap-2 w-full">
                  <label for="bankAccountName" class="font-semibold"
                    >Bank Account Name<span class="text-red-500 font-semibold"
                      >*</span
                    ></label
                  >
                  <InputText
                    id="bankAccountName"
                    v-model="formData.bankAccountName"
                    placeholder="Enter your bank account name"
                    @input="checkStepTwoValidity"
                  />
                </div>
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
                :disabled="!isStepTwoValid"
                @click="activateCallback('3')"
              />
            </div>
          </StepPanel>

          <!-- Step 3: Identity Verification -->
          <StepPanel v-slot="{ activateCallback }" value="3">
            <div class="flex flex-column gap-4">
              <h2 class="text-2xl font-semibold">Identity Verification</h2>
              <div class="flex flex-column gap-2">
                <label for="fullName" class="font-semibold"
                  >Full Name<span class="text-red-500 font-semibold"
                    >*</span
                  ></label
                >
                <InputText
                  id="fullName"
                  v-model="formData.fullName"
                  placeholder="Enter your full name"
                  @input="checkStepThreeValidity"
                />
              </div>
              <div class="flex flex-column gap-2">
                <label for="idNumber" class="font-semibold"
                  >ID Card Number<span class="text-red-500 font-semibold"
                    >*</span
                  ></label
                >
                <InputText
                  id="idNumber"
                  v-model="formData.idNumber"
                  placeholder="Enter your ID card number"
                  @input="checkStepThreeValidity"
                />
              </div>
              <div class="flex flex-column gap-2">
                <label class="font-semibold"
                  >ID Card Image<span class="text-red-500 font-semibold"
                    >*</span
                  ></label
                >
                <Toast />

                <FileUpload
                  name="idCardImage"
                  url="/api/upload"
                  chooseLabel="Upload ID Card"
                  @upload="onAdvancedUpload($event)"
                  :multiple="true"
                  accept="image/*"
                  :maxFileSize="1000000"
                  @select="
                    (e) => {
                      formData.value.idCardImage =
                        e.files.length > 0 ? e.files[0] : null;
                      checkStepThreeValidity();
                    }
                  "
                >
                  <template #empty>
                    <span>Drag and drop files to here to upload.</span>
                  </template>
                </FileUpload>
              </div>
              <!-- <div class="flex flex-column gap-2">
                <label class="font-semibold"
                  >Selfie Image<span class="text-red-500 font-semibold"
                    >*</span
                  ></label
                >
                <FileUpload
                  name="selfieImage"
                  url="/api/upload"
                  chooseLabel="Upload Sel5ie"
                  @upload="onAdvancedUpload($event)"
                  :multiple="false"
                  accept="image/*"
                  :maxFileSize="1000000"
                  @select="
                    (e) => {
                      formData.value.selfieImage =
                        e.files.length > 0 ? e.files[0] : null;
                      checkStepThreeValidity();
                    }
                  "
                >
                  <template #empty>
                    <span>Drag and drop files to here to upload.</span>
                  </template>
                </FileUpload>
              </div> -->
            </div>
            <div class="flex pt-6 justify-content-between">
              <Button
                label="Back"
                severity="secondary"
                icon="pi pi-arrow-left"
                @click="activateCallback('2')"
              />
              <Button label="Submit" icon="pi pi-check" @click="submitForm" />
            </div>
          </StepPanel>
        </StepPanels>
      </div>
    </Stepper>
  </div>
</template>

<style scoped>
/* Custom styles can be added here if needed */
</style>
