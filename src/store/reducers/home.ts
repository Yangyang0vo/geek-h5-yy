import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Article, Articles, Channel, MoreAction } from '../types'
type HomeType = {
  userChannels: Channel[]
  allChannels: Channel[]
  articles: Articles
  moreAction: MoreAction
}
type ArticlePayload = {
  channelId: number
  timestamp?: string 
  articleList: Article[]
}
const homeSlice = createSlice({
  name: 'home',
  initialState: {
    userChannels: [],
    allChannels: [],
    // 所有的文章列表
    articles: {},
    moreAction: {
      visible: false,
      articleId: '',
      channelId: ''
    }
  } as HomeType,
  reducers: {
    // 保存用户频道列表
    saveUserChannels: (state, { payload }: PayloadAction<Channel[]>) => {
      state.userChannels = payload
    },
    // 保存所有频道列表
    saveAllChannels: (state, { payload }: PayloadAction<Channel[]>) => {
      state.allChannels = payload
    },
    // 保存文章列表
    saveArticleList: (state, { payload }: PayloadAction<ArticlePayload>) => {
      state.articles = {
        // 保留原有的数据 不要直接覆盖
        ...state.articles,
        [payload.channelId]: {
          timestamp: payload.timestamp,
          list: payload.articleList
        }
      } as Articles
    },
    // 保存加载更多的文章列表
    saveMoreArticleList: (state, { payload }: PayloadAction<ArticlePayload>) => {
      const { channelId, timestamp, articleList } = payload
      state.articles[channelId] = {
        list: [...state.articles[channelId].list, ...articleList],
        timestamp: timestamp as string
      }
      // state.articles[channelId].list.push(...articleList)
      //ate.articles[channelId].timestamp = timestamp
    },
    // 显示更多操作
    setMoreActionVisible: (state, { payload }: PayloadAction<MoreAction>) => {
      state.moreAction = {
        ...payload
      }
    }
  }
})
export const { saveUserChannels, saveAllChannels, saveArticleList, saveMoreArticleList, setMoreActionVisible } = homeSlice.actions
export default homeSlice.reducer
