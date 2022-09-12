import { createSlice } from '@reduxjs/toolkit'

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    userChannels: []
  },
  reducers: {
    // 保存频道列表
    saveUserChannels: (state, { payload }) => {
      state.userChannels = payload.channels
    }
  }
})
export const { saveUserChannels } = homeSlice.actions
export default homeSlice.reducer
