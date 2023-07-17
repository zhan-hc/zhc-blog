<template>
  <menu-bar :tabs="tabs" @tabClick="tabClick"></menu-bar>
</template>

<script lang='ts' setup>
  import MenuBar from './components/menu-bar.vue'
  import useTabs from '@/hook/home/useTabs'
  const { tabs, tabClick } = useTabs()
</script>

<style scoped lang='scss'>
  .index {
    color: red;
    &:hover {
      color: blue;
    }
  }
</style>