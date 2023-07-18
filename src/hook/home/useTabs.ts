import { toRefs, reactive, onMounted, nextTick } from 'vue'
import { getJumpTypes } from '../../api/jump'
import { JumpType, LinkListType } from '../../constants/types'

export default function () {
  const state: {
    tabs: JumpType[];
    list: LinkListType[];
    scrollTop: number;
    isScrollingDown: boolean;
  } = reactive({
    tabs: [],
    list: [],
    scrollTop: 0,
    isScrollingDown: true,
  })

  const tabClick = (index: number) => {
    const navList =  document.querySelectorAll('.tab-list')
    navList[index].scrollIntoView()
  }

  const activeTabIndex = (index: number) => {
      state.tabs = state.tabs.map((item: JumpType, i:number) => {
        return {
          ...item,
          active: i === index
        }
      })
  }

  const handleScroll = (e: Event) => {
    const target = e.target as HTMLElement
    const scrollTop = target.scrollTop
    state.isScrollingDown = state.scrollTop <= scrollTop
    state.scrollTop = scrollTop
    
  }
  // 监听出现的导航栏元素
  const observeNavBar = () => {
    const navList =  document.querySelectorAll('.tab-list')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { // 目标元素出现在可视区
          const Index = Number(entry.target.id.replace('nav-bar_', ''))
          // 根据滚动方向来判断最顶部或者最底部出现的元素
          if (state.isScrollingDown && entry.boundingClientRect.bottom >= window.innerHeight) {
            activeTabIndex(Index)
          } else if (!state.isScrollingDown && entry.boundingClientRect.top <= 0) {
            activeTabIndex(Index)
          }
        }
      })
    }, {
      threshold: [0.1]
    })
    Array.from(navList).forEach(nav => observer.observe(nav))
  }

  onMounted(async () => {
    const [err, {jump: tabs = []}] = await getJumpTypes()
    if (!err) {
      state.tabs = tabs
      activeTabIndex(0)
    }
    nextTick(() => observeNavBar())
  })
  return {
    ...toRefs(state),
    tabClick,
    handleScroll
  }
}