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
  
  onMounted(async () => {
    let params = {}
    let pageName = ''
    switch(type) {
      case 'category': 
        params = {
          category_id: id
        }
        pageName = '分类'
        break;
      case 'tag': 
        params = {
          tagId: id
        }
        pageName = '标签'
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
        reportEvent(`博客分类_${categoryObj.value[id]}页面`, 'view')
        break;
      case 'tag':
        cardName.value =  `${BLOG_TYPE[type].label} - ${tagObj.value[id]}`
        reportEvent(`博客标签_${tagObj.value[id]}页面`, 'view')
        break;
      default: 
        break;
    }
  })

</script>

<style scoped lang='scss'>

</style>