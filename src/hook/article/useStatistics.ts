import { onMounted, reactive, toRefs } from "vue"
import { getCategoryCount } from '@/api/category'
import { getTagCount } from '@/api/tag'
import { STATISTICS_TYPE } from "@/constants"
export default function (reqTypeList: number[]) {
  const state = reactive({
    categoryData: [],
    tagData: []
  })
  const categoryStatistics = async () => {
    const [_err, data]: any = await getCategoryCount()
    state.categoryData = data
  }
  const tagStatistics = async () => {
    const [_err, data]: any = await getTagCount()
    state.tagData = data
  }
  const reqList = {
    [STATISTICS_TYPE.CATEGORY]: categoryStatistics(),
    [STATISTICS_TYPE.TAG]: tagStatistics()
  }

  onMounted(async () => {
    if (reqTypeList.length) {
      await Promise.all(reqTypeList.map(item => reqList[item]))
    }
  })
  return {
    ...toRefs(state)
  }
}