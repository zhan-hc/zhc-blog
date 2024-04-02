import { toRefs, reactive } from 'vue'
export default function () {
  const state: {
    scrollTop: number;
    isScrollingDown: boolean;
  } = reactive({
    scrollTop: 0,
    isScrollingDown: true
  })


  const getScrollDirection = (e: Event) => {
    const target = e.target as HTMLElement
    const scrollTop = target.scrollTop
    state.isScrollingDown = state.scrollTop <= scrollTop
    state.scrollTop = scrollTop
    
  }

  return {
    ...toRefs(state),
    getScrollDirection
  }
}