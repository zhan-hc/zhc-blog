<template>
  <main-frame :right-show="false">
    <search-card class="article-item" :list="articleList" :total="total" :loading="loading" :keyword="keyword" @page-change="pageChange">
      <empty-state v-if="!loading && !articleList.length" desc-msg="未找到对应文章" />
    </search-card>
  </main-frame>
</template>

<script lang='ts' setup>
  import { onMounted, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import searchCard from '@/components/card/search-card.vue'
  import emptyState from '@/components/common/empty-state.vue'
  import mainFrame from '@/components/common/main-frame.vue'
  import useArticle from '@/hook/article/useArticle'
  import useCollect from '@/hook/common/useCollect'

  const { loading, articleList, total, getArticleData } = useArticle(false)
  const page = reactive({
    pageSize: 10,
    pageNo: 1
  })
  const router = useRouter()
  const { keyword } :any = router.currentRoute.value.query
  const { reportEvent } = useCollect()

  const pageChange = async (val: number) => {
    articleList.value = []
    page.pageNo = val
    await getArticleList()
  }

  const getArticleList = async () => {
    await getArticleData({
      article_title: keyword,
      ...page
    })
  }
  onMounted(async () => {
    await getArticleList()
    reportEvent(`博客搜索结果页面`, { type: 'view' })
  })

</script>

<style scoped lang='scss'>
.article-item {
  margin-bottom: 20px;
}
</style>