import { getTokenInfo, removeTokenInfo } from '@/utils/storage'
import { createSlice } from '@reduxjs/toolkit'

interface Token {
  token: string
  refresh_token: string
}
const initialState: Token = {
  token: getTokenInfo().token,
  refresh_token: getTokenInfo().refresh_token
}

const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    // 保存token
    saveToken(state, { payload }: { payload: Token }) {
      state.token = payload.token
      state.refresh_token = payload.refresh_token
    },
    // 退出登录
    logOut: (state) => {
      removeTokenInfo()
      state.token = ''
      state.refresh_token = ''
    }
  },
  extraReducers: {}
})

export const { saveToken, logOut } = LoginSlice.actions

export default LoginSlice.reducer
