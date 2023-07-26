// index.ts
import { ENV, envApiHost, getNodeEnv } from '@/utils/env'
import MyAxios from './axios'
const MyRequest =  new MyAxios({
  baseURL: getNodeEnv === ENV.DEV ? '/api' : envApiHost,
  timeout: 3000
})

export default MyRequest

