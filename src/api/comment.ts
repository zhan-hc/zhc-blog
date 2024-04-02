import MyRequest from '@/services/index'
/*
 * 调用demo
 * cosnt [err, res] = await getUser()
*/
export const getCommentList = (id: number) => {
  return MyRequest.request({
    url: '/comment/getCommentList',
    method: 'GET',
    params: {
        id
    }
  })
}
export const addComment = (data: any) => {
  return MyRequest.request({
    url: '/comment/addComment',
    method: 'Post',
    data
  })
}