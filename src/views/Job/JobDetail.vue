<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { STORE_JOB } from "@/services/stores";
// import { STORE_PROFILE } from "@/services/stores";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { userData, accessToken } from "@/utils";
import {
  format,
  addDays,
  differenceInMonths,
  differenceInDays,
} from "date-fns";

const confirm = useConfirm();
const toast = useToast();
const route = useRoute();
const router = useRouter();

const RecruitmentStatus = ref([
  { name: "Recruiting", code: "RC" },
  { name: "In Progress", code: "IP" },
  { name: "Completed", code: "CP" },
  { name: "Cancelled", code: "CC" },
  { name: "Deleted", code: "DL" },
]);

// Hàm để định dạng ngày
const formatDate = (date) => {
  return format(new Date(date), "dd/MM/yyyy");
};

const getTimeRemaining = (date) => {
  const now = new Date();
  const targetDate = new Date(date);

  const months = differenceInMonths(targetDate, now);
  const days = differenceInDays(targetDate, now);

  if (months > 0) {
    return `(${months} more month${months > 1 ? "s" : ""})`;
  } else if (days > 0) {
    return `(${days} more day${days > 1 ? "s" : ""})`;
  } else {
    return "(expired)";
  }
};

function getTagSeverity(status) {
  switch (status) {
    case "Recruiting":
      return "success"; // Màu xanh lam
    case "In Progress":
      return "info"; // Màu xanh dương nhạt
    case "Completed":
      return "success"; // Màu xanh lá
    case "Cancelled":
      return "warn"; // Màu cam
    case "Deleted":
      return "danger"; // Màu đỏ
    default:
      return "secondary"; // Màu xám cho các trạng thái không xác định
  }
}

const {
  onActionJobDetail,
  onActionJobUpdate,
  onActionJobApply,
  onActionJobAccept,
} = STORE_JOB.StoreJob();
// const { onActionFreelancerProfile } = STORE_PROFILE.StoreProfile();

const jobDetail = ref(null);
const freelancers = ref([]);
const assignedFreelancer = ref(null);
// const freelancerProfile = ref(null);

// Fetch job details
const fetchJobPost = async () => {
  try {
    console.log(jobDetail);
    const response = await onActionJobDetail(route.params.id);
    console.log("API Response:", response); // Xem chi tiết phản hồi từ API
    if (response?.data) {
      jobDetail.value = response.data; // Ensure you are updating jobDetail.value here
      freelancers.value = response.data.interestedFreelancers;
      assignedFreelancer.value = response.data.assignedFreelancer || null;
    } else {
      console.warn("No data found in API response");
    }
    console.log("API Response Data:", response.data);
  } catch (error) {
    console.error("Error fetching job details:", error);
  }
};

const recruitmentStatusUpdate = async (newStatus, postId) => {
  if (!postId || !newStatus) {
    console.error("Invalid postId or newStatus:", { postId, newStatus });
    return;
  }

  try {
    // Gọi API với đối tượng đúng cấu trúc
    await onActionJobUpdate(newStatus, postId);

    // Hiển thị thông báo thành công
    toast.add({
      severity: "success",
      summary: "Recruitment Status Updated",
      detail: `The recruitment status has been updated to "${newStatus}".`,
      life: 3000,
    });
  } catch (error) {
    // Xử lý lỗi
    console.error("Error updating recruitment status:", error);
    toast.add({
      severity: "error",
      summary: "Update Failed",
      detail: "Failed to update the recruitment status.",
      life: 3000,
    });
  }
};

const confirmApply = (freelancerId, postId) => {
  // Kiểm tra xem postId có phải là chuỗi hợp lệ không
  console.log("postId passed to confirmApply:", postId);

  confirm.require({
    message: "Are you sure you want to apply for this job?",
    header: "Confirmation",
    accept: async () => {
      // Kiểm tra postId trước khi gọi API
      console.log("postId inside accept:", postId);

      // Gọi API với postId đúng
      await onActionJobApply(freelancerId, postId); // Truyền postId vào đây

      jobDetail.value.interestedFreelancers.push({
        _id: freelancerId,
        // Thêm thông tin freelancer nếu cần
      });

      toast.add({
        severity: "success",
        summary: "Applied",
        detail: "Your application has been sent.",
        life: 3000,
      });
    },
  });
};

const acceptFreelancer = (freelancerId, postId) => {
  confirm.require({
    message: "Are you sure you want to accept this freelancer?",
    header: "Confirm Acceptance",
    accept: async () => {
      await onActionJobAccept(freelancerId, postId);
      // Thực hiện thay đổi trạng thái khi freelancer được chấp nhận
      jobDetail.value.assignedFreelancer = freelancerId;
      toast.add({
        severity: "success",
        summary: "Accepted",
        detail: "Freelancer has been accepted.",
        life: 3000,
      });
      // Cập nhật lại danh sách freelancers để ẩn nút Accept cho freelancer đã được chọn
      freelancers.value = freelancers.value.map((freelancer) => {
        if (freelancer._id === freelancerId) {
          freelancer.accepted = true; // Thêm trạng thái accepted
        }
        return freelancer;
      });
    },
  });
};

const handleClick = () => {};

onMounted(fetchJobPost);

const handlePaymentClick = () => {
  router.push(`payment/${route.params.id}`);
};
</script>

<template>
  <div
    v-if="jobDetail"
    class="flex flex-column my-3 mx-7 px-3 py-4 border-round-md shadow-2 gap-3"
  >
    <div>
      <Tag
        :severity="getTagSeverity(jobDetail.recruitmentStatus)"
        :value="jobDetail.recruitmentStatus"
      />
    </div>

    <div
      v-if="userData.userId === jobDetail.postBy.userId"
      class="flex align-items-center gap-2"
    >
      <label for="recruitmentStatus" class="font-semibold"
        >Recruitment Status</label
      >
      <Select
        v-model="jobDetail.recruitmentStatus"
        :options="RecruitmentStatus"
        optionLabel="name"
        optionValue="name"
        placeholder="Recruitment status"
      />
      <Button
        label="Update status"
        @click="
          recruitmentStatusUpdate(jobDetail.recruitmentStatus, jobDetail.postId)
        "
      />
    </div>

    <div
      v-if="
        userData.userId === jobDetail.postBy.userId &&
        jobDetail.recruitmentStatus === 'Completed'
      "
      class="flex gap-2 align-items-center"
    >
      <span class="font-semibold"
        >Task completed successfully. You can now proceed with payment</span
      >
      <Button label="Proceed to Payment" @click="handlePaymentClick" />
    </div>
    <div class="flex flex-column border-bottom-1 pb-3 border-300">
      <span class="text-blue-600 font-semibold text-xl">{{
        jobDetail.title
      }}</span>
      <div class="flex gap-2 align-items-center">
        <div class="w-2rem h-2rem">
          <img
            :src="
              jobDetail.postBy.avatar.startsWith('http')
                ? jobDetail.postBy.avatar
                : `http://localhost:3000${jobDetail.postBy.avatar}`
            "
            alt="Avatar"
            class="w-full h-full border-circle"
            style="object-fit: cover"
          />
        </div>
        <span class="text-600">{{ jobDetail.postBy.username }}</span>
      </div>
    </div>
    <div class="flex border-bottom-1 pb-3 border-300">
      <div class="flex flex-column w-full">
        <span class="font-semibold">Job brief</span>
        <span>{{ jobDetail.detail }}</span>
        <span class="font-semibold mt-3"
          >Email: <span>{{ jobDetail.postBy.email }}</span></span
        >
      </div>

      <div class="flex gap-5 w-full justify-content-end align-items-center">
        <div class="flex flex-column gap-3">
          <div class="flex flex-column">
            <span class="font-semibold text-sm">Sample of derired work</span>
            <span>{{
              jobDetail.sampleWork && jobDetail.sampleWork.trim() !== ""
                ? jobDetail.sampleWork
                : "-"
            }}</span>
          </div>
          <div class="flex flex-column">
            <span class="font-semibold">Assignment deadline</span>
            <span>{{
              jobDetail.deadline
                ? `${formatDate(jobDetail.deadline)} ${getTimeRemaining(
                    jobDetail.deadline
                  )}`
                : "-"
            }}</span>
          </div>
        </div>
        <div class="flex flex-column gap-3">
          <div class="flex flex-column">
            <span class="font-semibold">Expired notice</span>
            <span>{{
              jobDetail.createdAt
                ? `${formatDate(
                    addDays(new Date(jobDetail.createdAt), 30)
                  )} ${getTimeRemaining(
                    addDays(new Date(jobDetail.createdAt), 30)
                  )}`
                : "-"
            }}</span>
          </div>
          <div class="flex flex-column">
            <span class="font-semibold">Budget</span>
            <span>${{ jobDetail.budget }}</span>
          </div>
        </div>
      </div>
    </div>
    <ConfirmDialog></ConfirmDialog>
    <div>
      <!-- Nếu user không phải là chủ bài -->
      <div v-if="jobDetail.postBy.userId !== userData.userId">
        <!-- Nếu user là Freelancer và chưa apply -->
        <div
          v-if="accessToken && userData.role === 'Freelancer' && !hasApplied"
          class="flex justify-content-end"
        >
          <Button
            @click="confirmApply(jobDetail._id, jobDetail.postId)"
            label="Apply for job"
          ></Button>
        </div>

        <!-- Nếu user là Freelancer và đã apply -->
        <div
          v-else-if="
            accessToken && userData.role === 'Freelancer' && hasApplied
          "
          class="flex justify-content-end"
        >
          <Button label="Applied job" disabled></Button>
        </div>

        <!-- Nếu user là Freelancer và đã được accept -->
        <div
          v-else-if="
            accessToken &&
            userData.role === 'Freelancer' &&
            jobDetail.assignedFreelancer === userData.userId
          "
          class="flex justify-content-end"
        >
          <Button label="Accepted" disabled></Button>
        </div>
      </div>

      <!-- Nếu user là chủ bài -->
      <div v-else>
        <div v-if="assignedFreelancer" class="text-xl font-bold mb-4">
          Assigned Freelancer
        </div>

        <!-- Danh sách asigned freelancer -->
        <div class="grid gap-4 p-2">
          <div
            v-if="assignedFreelancer"
            class="border-round border-1 border-gray-200 w-full p-4"
          >
            <!-- Header -->
            <div
              class="flex align-items-center cursor-pointer w-fit"
              @click="handleClick()"
            >
              <div class="flex gap-2">
                <div class="w-2rem h-2rem">
                  <img
                    :src="
                      assignedFreelancer?.avatar?.startsWith('http')
                        ? assignedFreelancer.avatar
                        : `http://localhost:3000${
                            assignedFreelancer?.avatar || ''
                          }`
                    "
                    alt="Avatar"
                    class="w-full h-full border-circle"
                    style="object-fit: cover"
                  />
                </div>
                <div class="text-lg font-semibold">
                  {{ assignedFreelancer.username }}
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="flex justify-content-end">
              <span class="text-green-500">Already accepted</span>
            </div>
          </div>

          <div v-else>
            <p v-if="assignedFreelancer">No freelancer assigned yet.</p>
          </div>
        </div>

        <div class="text-xl font-bold mb-4">Interested Freelancers</div>

        <!-- Danh sách freelancers -->
        <div class="grid gap-4 p-2">
          <div
            v-for="freelancer in freelancers"
            :key="freelancer._id"
            class="border-round border-1 border-gray-200 w-full p-4"
          >
            <!-- Header -->
            <div
              class="flex align-items-center cursor-pointer w-fit"
              @click="handleClick()"
            >
              <div class="flex gap-2">
                <div class="w-2rem h-2rem">
                  <img
                    :src="
                      freelancer?.avatar?.startsWith('http')
                        ? freelancer.avatar
                        : `http://localhost:3000${freelancer?.avatar || ''}`
                    "
                    alt="Avatar"
                    class="w-full h-full border-circle"
                    style="object-fit: cover"
                  />
                </div>
                <div class="text-lg font-semibold">
                  {{ freelancer.username }}
                </div>
              </div>
            </div>
            <div
              v-if="jobDetail.assignedFreelancer === freelancer._id"
              class="text-green-600 font-bold"
            >
              Accepted
            </div>

            <!-- Footer -->
            <div class="flex justify-content-end">
              <Button
                v-if="
                  jobDetail.assignedFreelancer !== freelancer._id &&
                  !freelancer.accepted
                "
                label="Accept"
                class="p-button-success"
                @click="acceptFreelancer(freelancer._id, jobDetail.postId)"
              />
              <span v-else class="text-green-500">Already accepted</span>
            </div>
          </div>
        </div>

        <!-- Hiển thị khi không có freelancer -->
        <div
          v-if="freelancers?.length === 0"
          class="text-center text-gray-500 mt-4"
        >
          No freelancers have shown interest yet.
        </div>
      </div>
    </div>

    <!-- Comment -->
    <!-- <div class="flex flex-column gap-3">
      <div class="flex gap-1 text-blue-600 text-lg">
        <span>Freelancers interested in this work</span>
        <span>(1 person has presented their work)</span>
      </div>
      <div class="border-1 border-round border-blue-500 bg-blue-100">
        <div class="flex gap-2 p-2">
          <Tag icon="pi pi-info-circle" severity="info"></Tag>
          <span class="text-blue-800"
            >We recommend chatting and paying via Fastwork. We guarantee you
            won't get cheated! We help protect your wages until you get work
            from freelancers.</span
          >
        </div>
      </div>

      <div
        class="border-1 border-round-sm border-gray-200 p-3 flex flex-column gap-2"
      >
        <div class="flex gap-2 align-items-center">
          <div class="w-3rem h-3rem">
            <img
              :src="avatar"
              alt="Avatar"
              class="w-full h-full border-circle"
              style="object-fit: cover"
            />
          </div>
          <span>Username</span>
        </div>
        <span
          >Hello, I am interested in this job. I have a friend who has direct
          experience in this field and we have been close since childhood. I
          have known about life all along. If you are interested, we can work
          together. You will not be disappointed.</span
        >
      </div>
    </div> -->
    <div>
      <RouterLink to="/jobs/board">
        <Button label="Back" outlined class="w-1" />
      </RouterLink>
    </div>
  </div>
  <div v-else class="card">
    <div
      class="rounded border border-surface-200 dark:border-surface-700 p-6 bg-surface-0 dark:bg-surface-900"
    >
      <div class="flex mb-4">
        <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
        <div>
          <Skeleton width="10rem" class="mb-2"></Skeleton>
          <Skeleton width="5rem" class="mb-2"></Skeleton>
          <Skeleton height=".5rem"></Skeleton>
        </div>
      </div>
      <Skeleton width="100%" height="150px"></Skeleton>
      <div class="flex justify-between mt-4">
        <Skeleton width="4rem" height="2rem"></Skeleton>
        <Skeleton width="4rem" height="2rem"></Skeleton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
