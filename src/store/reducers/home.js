import { createSlice } from '@reduxjs/toolkit'

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    userChannels: [],
    allChannels: [],
    articleList: {}
  },
  reducers: {
    // 保存用户频道列表
    saveUserChannels: (state, { payload }) => {
      state.userChannels = payload
    },
    // 保存所有频道列表
    saveAllChannels: (state, { payload }) => {
      state.allChannels = payload
    },
    saveArticleList: (state, { payload }) => {
      state.articleList = {
        // 保留原有的数据 不要直接覆盖
        ...state.articleList,
        [payload.channelId]: {
          timestamp: payload.timestamp,
          list: payload.articleList
        }
      }
    }
  }
})
export const { saveUserChannels, saveAllChannels, saveArticleList } = homeSlice.actions
export default homeSlice.reducer
