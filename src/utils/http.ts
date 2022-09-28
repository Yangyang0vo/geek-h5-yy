import { Toast } from 'antd-mobile'
// eslint-disable-next-line
import axios, { AxiosError } from 'axios'
import history from './history'
import { getTokenInfo, setTokenInfo } from './storage'
import { logOut, saveToken } from '@/store/reducers/login'
import store from '@/store/index'
const baseURL = 'http://geek.itheima.net/v1_0/'
// const baseURL = 'http://toutiao.itheima.net/v1_0/'
// 1. 创建新的 axios 实例
const http = axios.create({
  timeout: 5000,
  baseURL
})

// 2. 设置请求拦截器和响应拦截器
http.interceptors.request.use((config) => {
  config.headers!['Access-Control-Allow-Origin'] = '*'
  // 获取缓存中的 Token 信息
  const token = getTokenInfo().token
  if (token) {
    // 设置请求头的 Authorization 字段
    config.headers!['Authorization'] = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error: AxiosError<{ message: string }>) => {
    if (!error.response) {
      // 如果因为网络原因 请求超时没有response
      Toast.show({
        content: '服务器繁忙，请稍后再试',
        duration: 1000
      })
      return Promise.reject(error)
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
      history.replace('/login', { from: history.location.pathname })
      // history.go(0)
      return Promise.reject(error)
    }
    // 有刷新token  重新请求获取新的token
    try {
      const res = await axios({
        method: 'PUT',
        url: `${baseURL}authorizations`,
        headers: {
          Authorization: `Bearer ${refresh_token}`
        }
      })
      // 刷新成功 重新设置token
      const tokenInfo = {
        token: res.data.data.token,
        refresh_token: refresh_token
      }
      // 保存到redux中
      store.dispatch(saveToken(tokenInfo))
      // 保存到本地缓存中
      setTokenInfo(tokenInfo)
      // 刷新token 成功后 需要把失败的请求重新发出去
      return http(error.config)
    } catch (error) {
      // 如果刷新token失败  跳转到登录页面
      // 清空token
      store.dispatch(logOut())
      history.replace('/login', { from: history.location.pathname })
      history.go(0)
      Toast.show({
        content: '登录过期，请重新登录',
        duration: 1000
      })
      return Promise.reject(error)
    }
  }
)

// 3. 导出该 axios 实例
export default http
