import MyRequest from '@/services/index'
/*
 * 调用demo
 * cosnt [err, res] = await getUser()
*/
export const getArticleContent = (id) => {
  return MyRequest.request({
    url: '/',
    method: 'GET',
    data: { id }
  })
}