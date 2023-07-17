<template>
  <div class="index">{{userStore.name}}</div>
</template>

<script lang='ts' setup>
import { useUserStore } from '@/store/user'
const userStore = useUserStore()
</script>

<style scoped lang='scss'>
  .index {
    color: red;
    &:hover {
      color: blue;
    }
  }
</style>