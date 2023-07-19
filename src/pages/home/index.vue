<template>
  <div class="home-container">
    <div class="home-main">
      <article-card></article-card>
    </div>
    <div class="home-right">
      <author-card></author-card>
    </div>
  </div>
</template>

<script lang='ts' setup>
import authorCard from './components/author-card.vue'
import articleCard from './components/article-card.vue'
</script>

<style scoped lang='scss'>
.home-container {
  padding: 20px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  .home-main {
    width: 800px;
  }
  .home-right {
    margin-left: 20px;
    width: 200px;
  }
}

</style>