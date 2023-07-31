import { onMounted, reactive, toRefs } from 'vue'
import { TagType } from '@/constants/types';
import { getTagList } from '@/api/tag';
import { useArticleStore } from '@/store/article';
export default function () {

  const store = useArticleStore()

  const state: {
    tagList: TagType[]
  } = reactive({
    tagList: []
  })

  const getTagObj = () => {
    const tagObj : { [key: string]: string } = {}
    state.tagList.forEach((item: TagType) => {
      tagObj[item.tag_id] = item.tag_name
    })
    store.setTagObj(tagObj)
  }

  onMounted(async () => {
    const [err, { tagList = [] }]:any = await getTagList()
    state.tagList = tagList
    getTagObj()
  })

  return {
    ...toRefs(state)
  }
}