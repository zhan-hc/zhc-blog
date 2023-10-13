import { onMounted, reactive, toRefs } from 'vue'
import { TagType } from '@/constants/types'
import { getTagList } from '@/api/tag'
import { useArticleStore } from '@/store/article'
export default function (init = true) {

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

  const getTagData = async () => {
    const [_err, { tagList = [] }]:any = await getTagList()
    state.tagList = tagList
    getTagObj()
  }
  onMounted(async () => {
    init && await getTagData()
  })

  return {
    ...toRefs(state),
    getTagData
  }
}