<template>
  <div class="app-container">
    <nav-header></nav-header>
    <router-view :key="route.path"></router-view>
  </div>
</template>
<script setup lang="ts">
import NavHeader from '@/components/common/nav-header.vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { reportVisitor } from './api/bury'
const route = useRoute()
onMounted(async () => {
  await reportVisitor({
    usergent: navigator.userAgent
  })
})
</script>
<style scoped lang="scss">
.app-container {
  @include bg_image();
  background-size: 50px 50px;
}
</style>
