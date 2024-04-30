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
  import useArticle from '@/hook/article/useArticle'
  import useCollect from '@/hook/common/useCollect'
  import { useArticleStore } from '@/store/article'
  import emptyState from '@/components/common/empty-state.vue'
  import timeLineCard from '@/components/card/time-line-card.vue'
  import mainFrame from '@/components/common/main-frame.vue'
  import { BLOG_TYPE } from '@/constants'

  const router = useRouter()
  const store = useArticleStore()
  const { reportEvent } = useCollect()
  const { loading, articleList, getArticleData } = useArticle(false)

  let typeName = ''
  const cardName = ref('')
  const { categoryObj, tagObj } = storeToRefs(store)
  const { id, type } :any = router.currentRoute.value.params
  const reportNum = ref(0)
  
  onMounted(async () => {
    let params = {}
    let pageName = ''
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
        if (reportNum.value < 1) {
          reportEvent(`博客分类_${categoryObj.value[id]}页面`, { type: 'view' })
          reportNum.value = reportNum.value + 1
        }
        break;
      case 'tag':
        cardName.value =  `${BLOG_TYPE[type].label} - ${tagObj.value[id]}`
        if (reportNum.value < 1) {
          reportEvent(`博客标签_${tagObj.value[id]}页面`, { type: 'view' })
          reportNum.value = reportNum.value + 1
        }
        break;
      default: 
        break;
    }
  })

</script>

<style scoped lang='scss'>

</style>