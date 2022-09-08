// import http from '@/utils/http'
import { createSlice } from '@reduxjs/toolkit'
import { getUser, getUserProfile } from '@/store/Action/profileActions'

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    // 用户基本信息
    user: {},
    // 详情信息
    userProfile: {}
  },
  reducers: {},
  extraReducers: {
    // 成功之后保存用户信息
    [getUser.fulfilled](state, { payload }) {
      state.user = payload.data
    },
    // 成功之后保存用户详情信息
    [getUserProfile.fulfilled](state, { payload }) {
      state.userProfile = payload.data
    }
  }
})
// export const {  } = profileSlice.actions
export default profileSlice.reducer
