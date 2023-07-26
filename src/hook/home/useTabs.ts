import { toRefs, reactive, onMounted } from 'vue'
import { getJumpTypes } from '../../api/jump'
import { getLinks } from '../../api/links';
import { JumpType, LinkListType } from '../../constants/types'
import useScrollMenu from '../common/useScrollMenu';

export default function () {
  const state: {
    tabs: JumpType[];
    linkList: LinkListType[];
    isObserving: boolean;
  } = reactive({
    tabs: [],
    linkList: [],
    isObserving: false
  })

  const { isScrollingDown, getScrollDirection} = useScrollMenu()

  const activeTabIndex = (index: number) => {
      state.tabs = state.tabs.map((item: JumpType, i:number) => {
        return {
          ...item,
          active: i === index
        }
      })
  }

  const handleJump = (url: any) => {
    window.open(url)
  }

  const handleScroll = (e: Event) => {
    observeNavBar()
    getScrollDirection(e)
  }
  // 监听出现的导航栏元素
  const observeNavBar = () => {
    if (!state.isObserving) {
      const navList =  document.querySelectorAll('.tab-list')
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { // 目标元素出现在可视区
            const Index = Number(entry.target.id.replace('nav-bar_', ''))
            // 根据滚动方向来判断最顶部或者最底部出现的元素
            if (isScrollingDown.value && entry.boundingClientRect.bottom >= window.innerHeight) {
              activeTabIndex(Index - 1)
            } else if (!isScrollingDown.value && entry.boundingClientRect.top <= 64) {
              // 触发向上滚动
              activeTabIndex(Index - 1)
            }
          }
        })
      }, {
        threshold: [0.1, 0.9]
      })
      Array.from(navList).forEach(nav => observer.observe(nav))
      state.isObserving = true
    }
  }

  onMounted(async () => {
    const [tabRes, linkRes] = await Promise.all([getJumpTypes(), getLinks()])
    const [err1, {jump: tabs = []}]:any = tabRes
    const [err2, {links = []}]:any = linkRes
    console.log(err1, err2)
    state.tabs = tabs
    state.linkList = links
    activeTabIndex(0)
  })
  return {
    ...toRefs(state),
    handleJump,
    handleScroll
  }
}