<template>
  <div class="app-container">
    <nav-header></nav-header>
    <router-view :key="route.path"></router-view>
  </div>
</template>
<script setup lang="ts">
import NavHeader from '@/components/common/nav-header.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
<style scoped lang="scss">
.app-container {
  @include bg_image();
  @include bg-main_color();
  background-size: 50px 50px;
}
</style>
