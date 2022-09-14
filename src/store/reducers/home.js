import { createSlice } from '@reduxjs/toolkit'

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    userChannels: [],
    allChannels: [],
    articles: {}
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
    // 保存文章列表
    saveArticleList: (state, { payload }) => {
      state.articles = {
        // 保留原有的数据 不要直接覆盖
        ...state.articles,
        [payload.channelId]: {
          timestamp: payload.timestamp,
          list: payload.articleList
        }
      }
    },
    // 保存加载更多的文章列表
    saveMoreArticleList: (state, { payload }) => {
      const { channelId, timestamp, articleList } = payload
      state.articles[channelId].list.push(...articleList)
      state.articles[channelId].timestamp = timestamp
    }
  }
})
export const { saveUserChannels, saveAllChannels, saveArticleList, saveMoreArticleList } = homeSlice.actions
export default homeSlice.reducer
