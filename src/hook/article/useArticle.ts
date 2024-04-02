import { onMounted, reactive, toRefs } from "vue"
import { ArticleType } from "@/constants/types"
import useCollect from '@/hook/common/useCollect'
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
  const { reportEvent } = useCollect()
  

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
    reportEvent(`博客文章-${article.article_title}`)
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