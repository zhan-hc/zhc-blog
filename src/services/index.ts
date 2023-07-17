// index.ts
import MyAxios from './axios'

const MyRequest =  new MyAxios({
  baseURL: '/api',
  timeout: 3000
})

export default MyRequest

