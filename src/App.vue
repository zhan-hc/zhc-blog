<template>
  <div class="app-container">
    <nav-header></nav-header>
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import NavHeader from '@/components/nav-header.vue'
</script>
<style scoped lang="scss">
.app-container {
  background-image: linear-gradient(0deg,rgba(0,0,0,0) 24%,rgba(201,195,195,.329) 25%,hsla(0,8%,80.4%,.05) 26%,rgba(0,0,0,0) 27%,rgba(0,0,0,0) 74%,hsla(0,5.2%,81%,.185) 75%,rgba(180,176,176,.05) 76%,rgba(0,0,0,0) 77%,rgba(0,0,0,0)),linear-gradient(90deg,rgba(0,0,0,0) 24%,rgba(204,196,196,.226) 25%,hsla(0,4%,66.1%,.05) 26%,rgba(0,0,0,0) 27%,rgba(0,0,0,0) 74%,hsla(0,5.2%,81%,.185) 75%,rgba(180,176,176,.05) 76%,rgba(0,0,0,0) 77%,rgba(0,0,0,0));
  background-size: 50px 50px;
}
</style>
