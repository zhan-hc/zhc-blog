import { toRefs, reactive } from 'vue'
import useScrollFun from './useScrollFun'

/**
 * 
 * @param itemName item的名称
 * @param itemIdPrefix item的id前缀
 * @returns 
 */
export default function (itemName = '.tab-list', itemIdPrefix = 'nav-bar_') {
  const state: {
    isObserving: boolean;
  } = reactive({
    isObserving: false
  })

  const { isScrollingDown, getScrollDirection} = useScrollFun()

  const handleScroll = (e: Event, cb: any) => {
    observeNavBar(cb)
    getScrollDirection(e)
  }
  // 监听出现的导航栏元素
  const observeNavBar = (cb:any = () => {}) => {
    if (!state.isObserving) {
      const navList =  document.querySelectorAll(itemName)
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { // 目标元素出现在可视区
            const index = Number(entry.target.id.replace(itemIdPrefix, ''))
            // 根据滚动方向来判断最顶部或者最底部出现的元素
            if (isScrollingDown.value && entry.boundingClientRect.bottom >= window.innerHeight - 120) { // 设置误差在120px有时候滚动太多无法判断
              cb(index - 1)
            } else if (!isScrollingDown.value && entry.boundingClientRect.top <= 120) { 
              // 触发向上滚动
              cb(index - 1)
            }
          }
        })
      }, {
        threshold: [0.1, 0.25, 0.5, 0.75, 0.9]
      })
      // 监听h标签
      if (itemName === 'h') {
        const hList = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
        Array.from(hList).forEach(item => observer.observe(item))
      } else {
        Array.from(navList).forEach(item => observer.observe(item))
      }
      
      state.isObserving = true
    }
  }

  return {
    ...toRefs(state),
    handleScroll
  }
}