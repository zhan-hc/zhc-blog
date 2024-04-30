import MyRequest from '@/services/index'
/*
 * 调用demo
 * cosnt [err, res] = await getUser()
*/
export const getProjectList = () => {
  return MyRequest.request({
    url: '/project/getProjectList',
    method: 'GET'
  })
}