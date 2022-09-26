import { Channel, Token } from '@/store/types'
// 用户 Token 的本地缓存键名
const TOKEN_KEY = 'geek-itcast-yy'
const CHANNEL_KEY = 'geek-itcast-yy-channel'
// 搜索关键字的本地缓存键名
const SEARCH_HIS_KEY = 'itcast_history_k'

/**
 * 从本地缓存中获取 Token 信息
 */
export const getTokenInfo = (): Token => {
  // JSON.parse() 参数必须是string
  // localstorage.getItem()  获取到 string | null
  return JSON.parse(localStorage.getItem(TOKEN_KEY) as string) || {}
}

/**
 * 将 Token 信息存入缓存
 * @param {Object} tokenInfo 从后端获取到的 Token 信息
 */
export const setTokenInfo = (tokenInfo: Token) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenInfo))
}

/**
 * 删除本地缓存中的 Token 信息
 */
export const removeTokenInfo = () => {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * 判断本地缓存中是否存在 Token 信息
 */
export const hasToken = (): boolean => {
  return !!getTokenInfo().token
}

/**
 * 保存频道数据到本地
 * @param {*} channels
 */
export const setLocalChannels = (channels: Channel[]) => {
  localStorage.setItem(CHANNEL_KEY, JSON.stringify(channels))
}

/**
 * 获取本地缓存中的频道数据
 * @returns
 */
export const getLocalChannels = (): [] => {
  return JSON.parse(localStorage.getItem(CHANNEL_KEY) as string)
}

/**
 * 删除本地缓存中的频道数据
 */
export const removeLocalChannels = () => {
  localStorage.removeItem(CHANNEL_KEY)
}

/**
 * 从缓存获取搜索历史关键字
 */
export const getLocalHistories = (): string[] => {
  return JSON.parse(localStorage.getItem(SEARCH_HIS_KEY)!) || []
}

/**
 * 将搜索历史关键字存入本地缓存
 * @param {Array} histories
 */
export const setLocalHistories = (histories: string[]) => {
  localStorage.setItem(SEARCH_HIS_KEY, JSON.stringify(histories))
}

/**
 * 删除本地缓存中的搜索历史关键字
 */
export const removeLocalHistories = () => {
  localStorage.removeItem(SEARCH_HIS_KEY)
}
