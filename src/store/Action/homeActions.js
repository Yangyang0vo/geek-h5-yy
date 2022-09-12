import http from '@/utils/http'
import { getLocalChannels, hasToken, setLocalChannels } from '@/utils/storage'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { saveAllChannels, saveUserChannels } from '../reducers/home'

/**
 * 获取用户频道列表
 * @returns {Promise}
 */
export const getUserChannels = createAsyncThunk('home/getUserChannels', async (_, { dispatch }) => {
  // 1. 判断是否登录
  if (hasToken()) {
    const { data: res } = await http.get('user/channels')
    dispatch(saveUserChannels(res.data.channels))
  } else {
    // 2. 如果没有登录，则使用本地缓存中的频道数据
    const channels = getLocalChannels()
    if (channels) {
      dispatch(saveUserChannels(channels))
    } else {
      // 3. 如果本地缓存中没有频道数据，则使用默认的频道数据
      const { data: res } = await http.get('user/channels')
      dispatch(saveUserChannels(res.data.channels))
      setLocalChannels(res.data.channels)
    }
  }
})

/**
 * 获取所有频道列表
 */
export const getAllChannels = createAsyncThunk('home/getAllChannels', async (_, { dispatch }) => {
  const { data: res } = await http.get('channels')
  dispatch(saveAllChannels(res.data.channels))
})
