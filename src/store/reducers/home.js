import { createSlice } from '@reduxjs/toolkit'

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    userChannels: [],
    allChannels: []
  },
  reducers: {
    // 保存用户频道列表
    saveUserChannels: (state, { payload }) => {
      state.userChannels = payload
    },
    // 保存所有频道列表
    saveAllChannels: (state, { payload }) => {
      state.allChannels = payload
    }
  }
})
export const { saveUserChannels, saveAllChannels } = homeSlice.actions
export default homeSlice.reducer
