// index.ts
import MyAxios from './axios'

const MyRequest =  new MyAxios({
  baseURL: '/',
  timeout: 3000
})

export default MyRequest

