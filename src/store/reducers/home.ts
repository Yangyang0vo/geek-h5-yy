import { createSlice, PayloadAction } from '@reduxjs/toolkit'
const homeSlice = createSlice({
  name: 'home',
  initialState: {
    userChannels: [] as string[],
    allChannels: [] as string[],
    // 所有的文章列表
    articles: {} as any,
    moreAction: {
      visible: false,
      articleId: '',
      channelId: ''
    }
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
    saveMoreArticleList: (state, { payload }: PayloadAction<any>) => {
      const { channelId, timestamp, articleList } = payload
      state.articles[channelId] = {
        list: [...state.articles[channelId].list, ...articleList],
        timestamp
      }
      // state.articles[channelId].list.push(...articleList)
      // state.articles[channelId].timestamp = timestamp
    },
    // 显示更多操作
    setMoreActionVisible: (state, { payload }) => {
      state.moreAction = {
        ...payload
      }
    }
  }
})
export const { saveUserChannels, saveAllChannels, saveArticleList, saveMoreArticleList, setMoreActionVisible } = homeSlice.actions
export default homeSlice.reducer
