import { defineStore } from 'pinia'
export const useArticleStore = defineStore({
  id: 'article', // id必填，且需要唯一
  state: (): {
    tagObj: {[key:string] : string};
    categoryObj: {[key:string] : string};
  } => {
    return {
      tagObj: {}, // 标签的id-name键值对
      categoryObj: {} // 分类的id-name键值对
    }
  },
  actions: {
    setTagObj (val: any) {
      this.tagObj = val
    },
    setCategoryObj (val: any) {
      this.categoryObj = val
    }
  }
})
