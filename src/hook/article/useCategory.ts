import { onMounted, reactive, toRefs } from 'vue'
import { CategoryType } from '@/constants/types';
import { getCategoryList } from '@/api/category';
import { useArticleStore } from '@/store/article';
export default function () {

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

  onMounted(async () => {
    const [err, { categoryList = [] }]:any = await getCategoryList()
    state.categoryList = categoryList
    getCategoryObj()
  })

  return {
    ...toRefs(state)
  }
}