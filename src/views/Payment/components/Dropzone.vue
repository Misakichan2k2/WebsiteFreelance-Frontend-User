<script setup>
import { ref } from "vue";
import { usePrimeVue } from "primevue/config";
import { useToast } from "primevue/usetoast";

const $primevue = usePrimeVue();
const toast = useToast();

const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);

const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
  removeFileCallback(index);
  totalSize.value -= parseInt(formatSize(file.size));
  totalSizePercent.value = totalSize.value / 10;
};

const onClearTemplatingUpload = (clear) => {
  clear();
  totalSize.value = 0;
  totalSizePercent.value = 0;
};

const onSelectedFiles = (event) => {
  files.value = event.files;
  files.value.forEach((file) => {
    totalSize.value += parseInt(formatSize(file.size));
  });
};

const uploadEvent = (callback) => {
  totalSizePercent.value = totalSize.value / 10;
  callback();
};

const onTemplatedUpload = () => {
  toast.add({
    severity: "info",
    summary: "Success",
    detail: "File Uploaded",
    life: 3000,
  });
};

const formatSize = (bytes) => {
  const k = 1024;
  const dm = 3;
  const sizes = $primevue.config.locale.fileSizeTypes;

  if (bytes === 0) {
    return `0 ${sizes[0]}`;
  }

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  return `${formattedSize} ${sizes[i]}`;
};
</script>

<template>
  <div class="card">
    <Toast />
    <FileUpload
      name="demo[]"
      url="/api/upload"
      @upload="onTemplatedUpload($event)"
      :multiple="false"
      accept="image/*"
      :maxFileSize="1000000"
      @select="onSelectedFiles"
    >
      <template
        #header="{ chooseCallback, uploadCallback, clearCallback, files }"
      >
        <div
          class="flex flex-wrap justify-content-between align-items-center flex-1 gap-4"
        >
          <div class="flex gap-2">
            <Button
              @click="chooseCallback()"
              icon="pi pi-image"
              label="Choose file"
              rounded
              outlined
              severity="secondary"
            ></Button>
            <Button
              @click="uploadEvent(uploadCallback)"
              icon="pi pi-cloud-upload"
              label="Upload"
              rounded
              outlined
              severity="success"
              :disabled="!files || files.length === 0"
            ></Button>
            <Button
              @click="clearCallback()"
              icon="pi pi-times"
              label="Cancel"
              rounded
              outlined
              severity="danger"
              :disabled="!files || files.length === 0"
            ></Button>
          </div>
        </div>
      </template>
      <template
        #content="{
          files,
          uploadedFiles,
          removeUploadedFileCallback,
          removeFileCallback,
        }"
      >
        <div class="flex flex-column">
          <div v-if="files.length > 0">
            <span class="font-semibold">Pending</span>
            <div class="p-2 flex flex-wrap gap-4 justify-content-center">
              <div
                v-for="(file, index) of files"
                :key="file.name + file.type + file.size"
                class="border-round flex flex-column align-items-center gap-1"
              >
                <div class="w-15rem">
                  <img
                    role="presentation"
                    :alt="file.name"
                    :src="file.objectURL"
                    class="w-full"
                    style="object-fit: contain"
                  />
                </div>
                <span
                  class="font-semibold text-overflow-ellipsis max-w-8 whitespace-nowrap overflow-hidden"
                  >{{ file.name }}</span
                >
                <div>{{ formatSize(file.size) }}</div>
                <Badge value="Pending" severity="warn" />
                <Button
                  icon="pi pi-times"
                  @click="
                    onRemoveTemplatingFile(file, removeFileCallback, index)
                  "
                  outlined
                  rounded
                  severity="danger"
                />
              </div>
            </div>
          </div>

          <div v-if="uploadedFiles.length > 0">
            <span class="font-semibold">Completed</span>
            <div class="flex flex-wrap gap-4 justify-content-center">
              <div
                v-for="(file, index) of uploadedFiles"
                :key="file.name + file.type + file.size"
                class="p-2 flex flex-column align-items-center gap-1"
              >
                <div class="w-15rem">
                  <img
                    role="presentation"
                    :alt="file.name"
                    :src="file.objectURL"
                    class="w-full"
                    style="object-fit: contain"
                  />
                </div>
                <span
                  class="font-semibold text-overflow-ellipsis whitespace-nowrap overflow-hidden"
                  style="max-width: 15rem"
                  >{{ file.name }}</span
                >
                <div>{{ formatSize(file.size) }}</div>
                <Badge value="Completed" severity="success" />
                <Button
                  icon="pi pi-times"
                  @click="removeUploadedFileCallback(index)"
                  outlined
                  rounded
                  severity="danger"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #empty>
        <div class="flex align-items-center justify-content-center flex-column">
          <div class="w-15rem">
            <img
              src="/public//images/payment.jpg"
              alt="receipt"
              class="w-full"
            />
          </div>
          <p>Drag and drop file to here to upload.</p>
        </div>
      </template>
    </FileUpload>
  </div>
</template>
