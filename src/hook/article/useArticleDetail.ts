import { getArticleDetail } from "@/api/atricle";
import { ArticleType } from "@/constants/types";
import { onMounted, reactive, toRefs } from "vue"
import { useRoute } from "vue-router";
export default function () {
  const state : {
    article: ArticleType | null;
    content: string;
  } = reactive({
    article: null,
    content: '',
  })

  const route = useRoute()
  const articleId = route.params.id as string

  onMounted(async () => {
    const [_err, {article = {}, content = '' }]:any = await getArticleDetail(articleId)
    state.article = article
    state.content = content
  })

  return {
    ...toRefs(state),
    articleId
  }
}