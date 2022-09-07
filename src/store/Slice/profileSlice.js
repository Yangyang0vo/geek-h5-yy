// import http from '@/utils/http'
import { createSlice } from '@reduxjs/toolkit'
import { getUser } from '@/store/Action/profileActions'

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: {}
  },
  reducers: {},
  extraReducers: {
    // 成功之后保存用户信息
    [getUser.fulfilled](state, { payload }) {
      state.user = payload.data
    }
  }
})
// export const {  } = profileSlice.actions
export default profileSlice.reducer
