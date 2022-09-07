import axios from 'axios'
import { getTokenInfo } from './storage'

// 1. 创建新的 axios 实例
const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0/'
})

// 2. 设置请求拦截器和响应拦截器
http.interceptors.request.use((config) => {
  // 获取缓存中的 Token 信息
  const token = getTokenInfo().token

  // 设置请求头的 Authorization 字段
  config.headers['Authorization'] = `Bearer ${token}`
  return config
})

http.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 3. 导出该 axios 实例
export default http