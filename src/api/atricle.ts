import MyRequest from '@/services/index'
/*
 * 调用demo
 * cosnt [err, res] = await getUser()
*/
export const getArticleList = (data = {}) => {
  return MyRequest.request({
    url: '/article/getArticleList',
    method: 'GET',
    data
  })
}
export const getArticleDetail = (id: string) => {
  return MyRequest.request({
    url: '/article/getArticleDetail',
    method: 'GET',
    params: { id }
  })
}
export const addArticleView = (id: number) => {
  return MyRequest.request({
    url: '/article/addArticleView',
    method: 'POST',
    data: { id }
  })
}