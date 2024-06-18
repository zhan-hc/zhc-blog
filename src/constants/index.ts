import { AuthorInfoType, OperateType } from "./types"

export const AuthorInfo: AuthorInfoType = {
  name: '前端笨鸟',
  desc: '别说路不平,只是你不行',
  avatarUrl: 'http://oss.janus-c.top/blog/avatar/avatar.png',
  account: [
    {
      label: 'github',
      url: 'https://github.com/zhan-hc',
      type: OperateType.OPEN,
      icon: 'icon-github'
    },
    {
      label: '掘金',
      url: 'https://juejin.cn/user/1433418895468829',
      type: OperateType.OPEN,
      icon: 'icon-juejin'
    },
    {
      label: '微信',
      url: 'HC--ZHAN',
      type: OperateType.COPY,
      icon: 'icon-wechat'
    }
  ]
}
export const STATISTICS_TYPE = {
  'CATEGORY': 1,
  'TAG': 2
}

export const BLOG_TYPE: any = {
  'category': {
    label: 'Category'
  },
  'tag': {
    label: 'Tag'
  }
}