import MyRequest from '@/services/index'
/*
 * 调用demo
 * cosnt [err, res] = await getUser()
*/
export const getUser = (data:any) => {
  return MyRequest.request({
    url: '/users/userInfo',
    method: 'GET',
    params: data
  })
}