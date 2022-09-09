import { getTokenInfo } from '@/utils/storage'
import { createSlice } from '@reduxjs/toolkit'

const LoginSlice = createSlice({
  name: 'login',
  initialState: getTokenInfo(),
  reducers: {
    // 保存token
    saveToken(state, { payload }) {
      state.token = payload.token
      state.refresh_token = payload.refresh_token
    }
  },
  extraReducers: {}
})
export const { saveToken } = LoginSlice.actions

export default LoginSlice.reducer
