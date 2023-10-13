import { toRefs, reactive, onMounted } from 'vue'
import { getJumpTypes } from '@/api/jump'
import { JumpType } from '@/constants/types'

export default function () {
  const state: {
    jumpTabs: JumpType[];
  } = reactive({
    jumpTabs: []
  })

  const activeTabIndex = (index: number) => {
    state.jumpTabs = state.jumpTabs.map((item: JumpType, i:number) => {
      return {
        ...item,
        active: i === index
      }
    })
  }

  onMounted(async () => {
    const [_err, {jump = []}]:any = await getJumpTypes()
    state.jumpTabs = jump
    activeTabIndex(0)
  })

  return {
    ...toRefs(state),
    activeTabIndex
  }
}