import { onMounted, reactive, toRefs } from "vue";
import { ArticleMenu } from "@/constants/types";
export default function () {
  
  const state: {
    menu: ArticleMenu[];
    activeMenuIndex: number;
    minMenuLevel: number;
  } = reactive({
    menu: [],
    activeMenuIndex: 0,
    minMenuLevel: 1
  })
  
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

  // 使用正则表达式来匹配每个<h>标签，并在替换时增加索引
  const addIndexToHtml = (htmlString: string) => {
    let index = 1
    const regex = /<h(\d+) id="([^">]+)">/g
    const output = htmlString.replace(regex, (match, hNumber, idValue) => {
      const replacement = `<h${hNumber} id="article-menu_${index}">`
      index++
      return replacement
    });

      return output
  }

  const getArticleMenu = (html: string) => {
    state.menu = extractHTags(html)
    state.minMenuLevel = Math.min(...state.menu.map(item => item.level))
  }

  const setActiveMenu = (index: number) => {
    state.activeMenuIndex = index
  }

  return {
    ...toRefs(state),
    setMenuStyle,
    getArticleMenu,
    setActiveMenu,
    addIndexToHtml
  }
}