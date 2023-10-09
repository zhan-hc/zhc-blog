<template>
  <main-frame>
    <el-skeleton animated :rows="5" :loading="loading"/>
    <time-line-card v-show="!loading" :list="articleList" :categoryName="categoryObj[categoryId]" />
    <empty-state v-if="!loading && !articleList.length"/>
  </main-frame>
</template>

<script lang='ts' setup>
  import { onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useRouter } from 'vue-router'
  import { useArticleStore } from '@/store/article';
  import emptyState from '@/components/empty-state.vue'
  import timeLineCard from '@/components/time-line-card.vue'
  import useArticle from '@/hook/article/useArticle'
  import mainFrame from '@/components/main-frame.vue'

  const router = useRouter()
  const store = useArticleStore()
  const { categoryId } = router.currentRoute.value.params
  const { categoryObj } = storeToRefs(store)
  const { loading, articleList, getArticleData } = useArticle(false)

  onMounted(async () => {
    await getArticleData({
      category_id: categoryId
    })
  })

</script>

<style scoped lang='scss'>

</style>