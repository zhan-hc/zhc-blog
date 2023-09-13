<template>
  <div class="home-container">
    <div class="home-main">
      <el-skeleton animated :rows="5" :loading="loading"/>
      <article-card class="article-item" v-for="article in articleList" :key="article.article_id" :data="article" @click="articleCardClick(article.article_id)"></article-card>
      <empty-state v-if="!loading && !articleList.length"/>
    </div>
    <div class="home-right">
      <author-card style="margin-bottom: 20px;"></author-card>
      <category-card style="margin-bottom: 20px;" :data="categoryData"></category-card>
      <tag-card :data="tagData"></tag-card>
    </div>
  </div>
  <footer>
    <a href="https://beian.miit.gov.cn">粤ICP备2023101697号-1</a>
    <span>&nbsp;&nbsp;©2023 janus-c.top</span>
  </footer>
</template>

<script lang='ts' setup>
import tagCard from './components/tag-card.vue'
import authorCard from './components/author-card.vue'
import articleCard from './components/article-card.vue'
import categoryCard from './components/category-card.vue'
import emptyState from '@/components/empty-state.vue'
import useArticle from '@/hook/article/useArticle'
import useTag from '@/hook/article/useTag'
import useCategory from '@/hook/article/useCategory'
import useStatistics from '@/hook/article/useStatistics'
import { STATISTICS_TYPE } from '@/constants'

useTag()
useCategory()
const { loading, articleList, articleCardClick } = useArticle()
const { categoryData, tagData } = useStatistics([STATISTICS_TYPE.CATEGORY, STATISTICS_TYPE.TAG])

</script>

<style scoped lang='scss'>
.home-container {
  padding: 20px;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 64px);
  background-image: linear-gradient(0deg,rgba(0,0,0,0) 24%,rgba(201,195,195,.329) 25%,hsla(0,8%,80.4%,.05) 26%,rgba(0,0,0,0) 27%,rgba(0,0,0,0) 74%,hsla(0,5.2%,81%,.185) 75%,rgba(180,176,176,.05) 76%,rgba(0,0,0,0) 77%,rgba(0,0,0,0)),linear-gradient(90deg,rgba(0,0,0,0) 24%,rgba(204,196,196,.226) 25%,hsla(0,4%,66.1%,.05) 26%,rgba(0,0,0,0) 27%,rgba(0,0,0,0) 74%,hsla(0,5.2%,81%,.185) 75%,rgba(180,176,176,.05) 76%,rgba(0,0,0,0) 77%,rgba(0,0,0,0));
  background-size: 50px 50px;
  box-sizing: border-box;
  .home-main {
    width: 800px;
    min-height: 100%;
    padding-bottom: 32px;
    .article-item {
      margin-bottom: 20px;
    }
  }
  .home-right {
    margin-left: 20px;
    width: 200px;
  }
}
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  margin-top: -32px;
  color: #999aaa;
  font-size: 12px;
  border-top: 1px solid $blog-color-gray-3;
  background: $theme-color;
  box-sizing: border-box;
}
</style>