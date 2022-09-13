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
 * @returns {Promise}
 */
export const getAllChannels = createAsyncThunk('home/getAllChannels', async (_, { dispatch }) => {
  const { data: res } = await http.get('channels')
  dispatch(saveAllChannels(res.data.channels))
})

/**
 * 删除用户频道
 * @param {object} channel 频道对象
 * @returns {Promise}
 */
export const delChannel = createAsyncThunk('home/delChannel', async (channel, { dispatch, getState }) => {
  //  判断是否登录 如果登录了就调用接口删除 如果没有登录就调用本地缓存删除
  // 不管登录没登录 都需要修改redux中的数据
  const userChannels = getState().homeSlice.userChannels
  if (hasToken()) {
    await http.delete(`user/channels/${channel.id}`)
    // 同步到redux
    dispatch(saveUserChannels(userChannels.filter((item) => item.id !== channel.id)))
  } else {
    // 没有登录
    // 同步到本地缓存  同步到redux
    const result = userChannels.filter((item) => item.id !== channel.id)
    dispatch(saveUserChannels(result))
    setLocalChannels(result)
  }
})

/**
 * 添加用户频道
 * @param {object} channel 频道对象
 * @returns {Promise}
 */
export const addChannel = createAsyncThunk('home/addChannel', async (channel, { dispatch, getState }) => {
  //  判断是否登录 如果登录了就调用接口添加 如果没有登录就调用本地缓存添加
  // 不管登录没登录 都需要修改redux中的数据
  const userChannels = getState().homeSlice.userChannels
  if (hasToken()) {
    await http.patch('user/channels', { channels: [channel] })
    // 同步到redux
    dispatch(saveUserChannels([...userChannels, channel]))
  } else {
    // 没有登录
    // 同步到本地缓存  同步到redux
    const result = [...userChannels, channel]
    dispatch(saveUserChannels(result))
    setLocalChannels(result)
  }
})
