<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
// import { CustomerService } from "../services/stores/JobBoardService";
import { format } from "date-fns";

const customers = ref();
const router = useRouter();

// onMounted(() => {
//   CustomerService.getCustomersMedium().then((data) => (customers.value = data));
// });

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
  router.push(`detail/${rowData.data._id}`);
};
</script>

<template>
  <div class="card mt-3">
    <DataTable
      :value="customers"
      :paginator="customers?.length > 0"
      :rows="20"
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
        sortable
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
        field="category"
        header="Category"
        style="width: 25%; cursor: pointer"
        sortable
      ></Column>
      <Column
        field="budget"
        header="Budget (Dollar)"
        style="width: 25%; cursor: pointer"
        class="text-center"
        sortable
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
        header="Deliver work within"
        style="width: 30%; cursor: pointer"
        class="text-center"
        sortable
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
