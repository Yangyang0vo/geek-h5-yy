// import http from '@/utils/http'
import { createSlice } from '@reduxjs/toolkit'
import { getUser, getUserProfile } from '@/store/action/profileActions'

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    // 用户基本信息
    user: {},
    // 详情信息
    userProfile: {}
  },
  reducers: {
    // 数据同步到本地
    saveUser: (state, { payload }) => {
      state.userProfile = { ...state.userProfile, ...payload }
    },
 
  },
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
export const { saveUser } = profileSlice.actions
export default profileSlice.reducer
