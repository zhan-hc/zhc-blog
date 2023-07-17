import { toRefs, reactive } from 'vue'
export default function () {
  const state = reactive({
    tabs: [
      {
        label: '前端框架文档',
        active: true
      },
      {
        label: '图片图标',
        active: false
      }
    ]
  })
  const tabClick = (i: number) => {
    console.log('tabClick', i)
  }
  return {
    ...toRefs(state),
    tabClick
  }
}