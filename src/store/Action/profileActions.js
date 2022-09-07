import http from '@/utils/http'
import { createAsyncThunk } from '@reduxjs/toolkit'
/**
 * 获取用户基本信息
 * @returns thunk
 */
export const getUser = createAsyncThunk('profile/getUser', async () => {
  const res = await http('/user')
  return res.data
})
