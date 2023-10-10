<template>
  <main-frame>
    <el-skeleton animated :rows="5" :loading="loading"/>
    <time-line-card v-if="!loading" :list="articleList" :name="cardName" />
    <empty-state v-if="!loading && !articleList.length"/>
  </main-frame>
</template>

<script lang='ts' setup>
  import { onMounted, ref, watch } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useRouter } from 'vue-router'
  import { useArticleStore } from '@/store/article'
  import emptyState from '@/components/empty-state.vue'
  import timeLineCard from '@/components/card/time-line-card.vue'
  import useArticle from '@/hook/article/useArticle'
  import mainFrame from '@/components/main-frame.vue'
  import { BLOG_TYPE } from '@/constants'

  const router = useRouter()
  const store = useArticleStore()
  const { id, type } :any = router.currentRoute.value.params
  const { categoryObj, tagObj } = storeToRefs(store)
  let typeName = ''
  const cardName = ref('')
  const { loading, articleList, getArticleData } = useArticle(false)

  onMounted(async () => {
    let params = {}
    switch(type) {
      case 'category': 
        params = {
          category_id: id
        }
        break;
      case 'tag': 
        params = {
          tagId: id
        }
        break;
      default: 
        break;
    }
    await getArticleData(params)
  })

  watch([categoryObj, tagObj], _val => {
    switch(type) {
      case 'category':
        cardName.value =  `${BLOG_TYPE[type].label} - ${categoryObj.value[id]}`
        break;
      case 'tag':
        cardName.value =  `${BLOG_TYPE[type].label} - ${tagObj.value[id]}`
        break;
      default: 
        break;
    }
  })

</script>

<style scoped lang='scss'>

</style>