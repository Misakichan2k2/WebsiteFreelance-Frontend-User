export default [
  {
    path: "/jobs/detail/payment/:id",
    name: "Payment",
    meta: { publicPage: true },
    component: () => import("../Payment.vue"),
  },
];
