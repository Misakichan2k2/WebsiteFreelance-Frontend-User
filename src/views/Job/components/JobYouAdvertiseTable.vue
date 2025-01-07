<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { format } from "date-fns";
import { userData, accessToken } from "@/utils";
import { STORE_JOB } from "@/services/stores";
import { onMounted } from "vue";

const customers = ref();
const router = useRouter();

const { onActionAllJobBoard } = STORE_JOB.StoreJob();

// Hàm để định dạng ngày
const formatDate = (date) => {
  return format(new Date(date), "dd/MM/yyyy");
};

const formatDateTime = (date) => {
  return format(new Date(date), "dd/MM/yyyy HH:mm");
};

const props = defineProps({
  jobs: {
    type: Array,
    default: () => [],
  },
  noDataMessage: {
    type: String,
    default: "No entries to display.",
  },
});

watch(
  () => props.jobs,
  (newJobs) => {
    customers.value = newJobs;
  },
  { immediate: true }
);

const handleRowClick = (rowData) => {
  router.push(`/jobs/detail/${rowData.data._id}`);
};

onMounted(async () => {
  const response = await onActionAllJobBoard();
  customers.value = response.data;
});
</script>

<template>
  <div class="card mt-3">
    <DataTable
      :value="
        customers?.filter((item) => item?.postBy.userId === userData.userId)
      "
      :paginator="customers?.length > 0"
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 50rem; table-layout: fixed;"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{currentPage} of {totalPages}"
      @row-click="handleRowClick"
    >
      <template #empty>
        <p class="text-center my-4">
          {{ noDataMessage }}
        </p>
      </template>
      <Column
        field="title"
        header="Job Title"
        style="width: 50%; cursor: pointer"
      >
        <template #body="slotProps">
          <div
            class="overflow-hidden text-overflow-ellipsis white-space-nowrap"
            style="width: 100%"
          >
            <Tag
              v-if="slotProps.data.engRequired"
              severity="info"
              value="ENG"
            />
            {{ slotProps.data.title }}
          </div>
        </template>
      </Column>
      <Column
        field="status"
        header="Status"
        style="width: 25%; cursor: pointer"
      ></Column>
      <Column
        field="budget"
        header="Budget (Dollar)"
        style="width: 20%; cursor: pointer"
      ></Column>
      <Column
        field="createdAt"
        header="Posted on"
        style="width: 20%; cursor: pointer"
        sortable
      >
        <template #body="slotProps">
          {{
            slotProps.data.createdAt
              ? formatDateTime(slotProps.data.createdAt)
              : "-"
          }}
        </template>
      </Column>
      <Column
        field="deadline"
        header="Deliver work within"
        style="width: 20%; cursor: pointer"
      >
        <template #body="slotProps">
          {{
            slotProps.data.deadline ? formatDate(slotProps.data.deadline) : "-"
          }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped></style>
