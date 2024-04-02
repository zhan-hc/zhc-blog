import MyRequest from '@/services/index'
/*
 * 调用demo
 * cosnt [err, res] = await getUser()
*/
export const getCategoryList = () => {
  return MyRequest.request({
    url: '/category/getCategoryList',
    method: 'GET'
  })
}
export const getCategoryCount = () => {
  return MyRequest.request({
    url: '/category/groupCategory',
    method: 'GET'
  })
}