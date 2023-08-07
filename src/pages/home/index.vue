<template>
  <div class="home-container">
    <div class="home-main">
      <article-card class="article-item" v-for="article in articleList" :key="article.article_id" :data="article" @click="routerGo(`/article/${article.article_id}`)"></article-card>
      <empty-state v-if="!articleList.length"/>
    </div>
    <div class="home-right">
      <author-card style="margin-bottom: 20px;"></author-card>
      <category-card style="margin-bottom: 20px;" :data="categoryData"></category-card>
      <tag-card :data="tagData"></tag-card>
    </div>
  </div>
</template>

<script lang='ts' setup>
import useRouter from '@/hook/common/useRouter'
import authorCard from './components/author-card.vue'
import categoryCard from './components/category-card.vue'
import tagCard from './components/tag-card.vue'
import articleCard from './components/article-card.vue'
import emptyState from '@/components/empty-state.vue'
import useArticle from '@/hook/article/useArticle'
import useStatistics from '@/hook/article/useStatistics'
import { STATISTICS_TYPE } from '@/constants'

const { routerGo } = useRouter()
const { articleList } = useArticle()
const { categoryData, tagData } = useStatistics([STATISTICS_TYPE.CATEGORY, STATISTICS_TYPE.TAG])

</script>

<style scoped lang='scss'>
.home-container {
  padding: 20px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  .home-main {
    width: 800px;
    .article-item {
      margin-bottom: 20px;
    }
  }
  .home-right {
    margin-left: 20px;
    width: 200px;
  }
}

</style>