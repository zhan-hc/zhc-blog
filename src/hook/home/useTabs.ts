import { toRefs, reactive, onMounted } from 'vue'
import { getJumpTypes } from '../../api/modules/jump'
import { JumpType } from '../../constants/types'

export default function () {
  const state = reactive({
    tabs: []
  })
  const tabClick = (i: number) => {
    console.log('tabClick', i)
  }
  
  onMounted(async () => {
    const [err, {jump: tabs = []}] = await getJumpTypes()
    if (!err) {
      state.tabs = tabs.map((item: JumpType, i:number) => {
      return {
        ...item,
        active: i === 0
      }
    })
    }
  })
  return {
    ...toRefs(state),
    tabClick
  }
}