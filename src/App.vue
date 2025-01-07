<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Toast />
  <div class="surface-card">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<style scoped></style>
