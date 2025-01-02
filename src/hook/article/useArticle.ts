import { onMounted, reactive, toRefs } from "vue"
import { ArticleType } from "@/constants/types"
import { useBury } from 'janus-bury'
import { addArticleView, getArticleList } from '@/api/atricle'
export default function (init = true) {
  const state: {
    articleList: ArticleType[]
    loading: boolean,
    total: number
  } = reactive({
    articleList: [],
    loading: false,
    total: 0
  })
  const { dataSender } = useBury()
  

  const getArticleData = async (params = {}) => {
    state.loading = true
    const [_err, { articleList = [], total = 0 }]:any = await getArticleList(params)
    state.articleList = articleList
    state.total = total
    state.loading = false
  }

  const addViewCount = async (id: number) => {
    await addArticleView(id)
  }

  const articleCardClick = (article: ArticleType) => {
    article.article_view += 1
    addViewCount(article.article_id)
    const common = JSON.stringify({
      article_title: article.article_title,
      article_id: article.article_id
    })
    dataSender.value?.track({
      event_name: `博客文章-${article.article_title}`,
      event_msg: JSON.stringify(common),
      event_type: 'click'
    })
    location.href = `/post/${article.article_id}`
  }

  onMounted(async () => {
    init && await getArticleData()
  })

  return {
    ...toRefs(state),
    getArticleData,
    articleCardClick
  }
}