import { getArticleDetail } from "@/api/atricle";
import { ArticleMenu, ArticleType } from "@/constants/types";
import { onMounted, reactive, toRefs } from "vue"
import { useRoute } from "vue-router";
import useScrollMenu from '../common/useScrollMenu';
export default function () {
  const state : {
    article: ArticleType | null;
    content: string;
    menu: ArticleMenu[];
    activeMenuIndex: number;
    minMenuLevel: number;
  } = reactive({
    article: null,
    content: '',
    menu: [],
    activeMenuIndex: 0,
    minMenuLevel: 1
  })

  const route = useRoute()
  
  const { isScrollingDown, getScrollDirection } = useScrollMenu()
  
  const extractHTags = (htmlString: string):ArticleMenu[] => {
    const pattern = /<h([1-6])[^>]*>(.*?)<\/h\1>/gi;
    const hTags = [];
    let match;
  
    while ((match = pattern.exec(htmlString)) !== null) {
      const tagLevel = match[1];
      const tagContent = match[2];
      hTags.push({ level: Number(tagLevel), content: tagContent });
    }
  
    return hTags;
  }

  const setMenuStyle = (menuItem: ArticleMenu) => {
    return {
      paddingLeft: `${(menuItem.level - state.minMenuLevel) * 8}px`,
      color: menuItem.level > 2 ? '#515767' : '#252933'
    }
  }

  const handleScroll = (e: Event) => {
    getScrollDirection(e)
    const menuList = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    
  }

  onMounted(async () => {
    const [err, {article = {}, content = '' }] = await getArticleDetail(route.params.id as string)
    state.content = content
    state.menu = extractHTags(state.content)
    state.minMenuLevel = Math.min(...state.menu.map(item => item.level))
  })

  return {
    ...toRefs(state),
    setMenuStyle,
    handleScroll
  }
}