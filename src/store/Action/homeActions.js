import http from '@/utils/http'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { saveUserChannels } from '../reducers/home'

/**
 * 获取用户频道列表
 * @returns {Promise}
 */
export const getUserChannels = createAsyncThunk('home/getChannels', async (_, { dispatch }) => {
  const res = await http.get('/channels')
  dispatch(saveUserChannels(res.data.data))
})
