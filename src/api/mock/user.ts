
import MyRequest from '@/services/index'
export const getUser = (data:any) => {
  return MyRequest.request({
    url: '/user/userInfo',
    method: 'GET',
    params: data
  })
}