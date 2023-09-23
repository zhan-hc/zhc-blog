import { onMounted, reactive, toRefs } from "vue";
import { ArticleType } from "@/constants/types";
import useRouter from '@/hook/common/useRouter'
import { addArticleView, getArticleList } from '@/api/atricle';
export default function () {
  const { routerGo } = useRouter()
  const state: {
    articleList: ArticleType[]
    loading: boolean
  } = reactive({
    articleList: [],
    loading: false
  })

  onMounted(async () => {
    state.loading = true
    const [err, { articleList = [] }]:any = await getArticleList()
    state.articleList = articleList
    state.loading = false
  })

  const addViewCount = async (id: number) => {
    await addArticleView(id)
  }

  const articleCardClick = (article: ArticleType) => {
    article.article_view += 1
    addViewCount(article.article_id)
    location.href = `/post/${article.article_id}`
    // routerGo(`/article/${id}`)
  }

  return {
    ...toRefs(state),
    articleCardClick
  }
}