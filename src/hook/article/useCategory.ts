import { onMounted, reactive, toRefs } from 'vue'
import { CategoryType } from '@/constants/types'
import { getCategoryList } from '@/api/category'
import { useArticleStore } from '@/store/article'
export default function (init = true) {

  const store = useArticleStore()

  const state: {
    categoryList: CategoryType[]
  } = reactive({
    categoryList: []
  })

  const getCategoryObj = () => {
    const catergoryObj : { [key: string]: string } = {}
    state.categoryList.forEach((item: CategoryType) => {
      catergoryObj[item.category_id] = item.category_name
    })
    store.setCategoryObj(catergoryObj)
  }

  const getCategoryData = async () => {
    const [_err, { categoryList = [] }]:any = await getCategoryList()
    state.categoryList = categoryList
    getCategoryObj()
  }

  onMounted(async () => {
    init && await getCategoryData()
  })

  return {
    ...toRefs(state),
    getCategoryData
  }
}