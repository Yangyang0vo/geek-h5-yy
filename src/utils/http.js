import { Toast } from 'antd-mobile'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { getTokenInfo } from './storage'

// 1. 创建新的 axios 实例
const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0/',
  timeout: 5000
  // baseURL: 'http://toutiao.itheima.net/v1_0/'
})

// 2. 设置请求拦截器和响应拦截器
http.interceptors.request.use((config) => {
  // 获取缓存中的 Token 信息
  const token = getTokenInfo().token
  if (token) {
    // 设置请求头的 Authorization 字段
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

http.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (!error.response) {
      // 如果因为网络原因 请求超时没有response
      Toast.show({
        content: '服务器繁忙，请稍后再试',
        duration: 1000
      })
    }
    // 代表网络没问题 有数据
    if (error.response.status !== 401) {
      // 如果不是401错误
      Toast.show({
        content: error.response.data.message,
        duration: 1000
      })
      return Promise.reject(error)
    }
    // 网络没问题 有数据 但是是401错误
    // 1. 判断 是否有 refresh_token
    const { refresh_token } = getTokenInfo()
    if (!refresh_token) {
      // 2. 如果没有 直接跳转到登录页面
      const navigate = useNavigate()
      const loaction = useLocation()
      navigate('/login', { state: { from: loaction.pathname } })
      return Promise.reject(error)
    }
    // 有返回 就显示错误信息
    Toast.show({
      content: error.response.data.message,
      duration: 1000
    })

    return Promise.reject(error)
  }
)

// 3. 导出该 axios 实例
export default http
