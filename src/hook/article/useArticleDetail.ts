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

  onMounted(async () => {
    const [err, {article = {}, content = '' }]:any = await getArticleDetail(route.params.id as string)
    console.log(err)
    state.article = article
    state.content = content
  })

  return {
    ...toRefs(state)
  }
}