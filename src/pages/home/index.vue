<template>
  <div class="home-container">
    <div class="home-main">
      <article-card v-for="article in state.articleList" :key="article.article_id" :data="article" @click="goDetail(article.article_id)"></article-card>
    </div>
    <div class="home-right">
      <author-card></author-card>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { onMounted, reactive } from 'vue'
import authorCard from './components/author-card.vue'
import articleCard from './components/article-card.vue'
import { getArticleList } from '@/api/atricle'
import { ArticleType } from '@/constants/types'
import { useRouter } from 'vue-router'

const state: {
  articleList: ArticleType[]
} = reactive({
  articleList: []
})

const router = useRouter()
const goDetail = (id: number) => {
  router.push(`/article/${id}`)
}

onMounted(async () => {
  const [err, { articleList = [] }] = await getArticleList()
  state.articleList = articleList.map((item: ArticleType) => {
    return {
      ...item,
      article_tag: item.article_tag.split(',')
    }
  })
})
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