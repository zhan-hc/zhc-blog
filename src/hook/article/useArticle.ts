import { onMounted, reactive, toRefs } from "vue";
import { ArticleType } from "@/constants/types";
import { getArticleList } from '@/api/atricle';
import useTag from '@/hook/article/useTag';
import useCategory from '@/hook/article/useCategory';
export default function () {
  
  const state: {
    articleList: ArticleType[]
  } = reactive({
    articleList: []
  })

  useTag()
  useCategory()

  onMounted(async () => {
    const [err, { articleList = [] }]:any = await getArticleList()
    console.log(err)
    state.articleList = articleList
  })

  return {
    ...toRefs(state)
  }
}