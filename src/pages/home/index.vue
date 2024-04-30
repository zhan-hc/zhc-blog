<template>
  <main-frame>
    <el-skeleton animated :rows="5" :loading="loading"/>
    <article-card class="article-item" v-for="article in articleList" :key="article.article_id" :data="article" @click="articleCardClick(article)"></article-card>
    <empty-state v-if="!loading && !articleList.length"/>
  </main-frame>
</template>

<script lang='ts' setup>
  import { onMounted } from 'vue'
  import articleCard from '@/components/card/article-card.vue'
  import emptyState from '@/components/common/empty-state.vue'
  import mainFrame from '@/components/common/main-frame.vue'
  import useArticle from '@/hook/article/useArticle'
  import useCollect from '@/hook/common/useCollect'

  const { loading, articleList, articleCardClick } = useArticle()
  const { reportEvent } = useCollect()

  onMounted(() => {
    reportEvent(`博客首页页面`, { type: 'view' })
  })

</script>

<style scoped lang='scss'>
.article-item {
  margin-bottom: 20px;
}
</style>