import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { commentType, Detail } from '../types'

type initialState = {
  detail: Detail
  comments: commentType
}
const article = createSlice({
  name: 'article',
  initialState: {
    // 文章详情数据
    detail: {},
    // 文章评论数据
    comments: {}
  } as initialState,
  reducers: {
    // 保存文章详情
    saveArticleDetail: (state, { payload }: PayloadAction<Detail>) => {
      state.detail = payload
    },
    // 保存文章评论
    saveComment: (state, { payload }: PayloadAction<commentType>) => {
      state.comments = payload
    },
    // 保存更多文章评论
    saveMoreComment: (state, { payload }: PayloadAction<commentType>) => {
      state.comments = {
        ...payload,
        results: [...state.comments.results, ...payload.results]
      }
    },
    // 保存文章点赞状态
    setAttitude: (state, { payload }: PayloadAction<number>) => {
      state.detail.attitude = payload
    },
    setCollect: (state, { payload }: PayloadAction<boolean>) => {
      state.detail.is_collected = payload
    }
  }
})
export const { saveArticleDetail, saveComment, saveMoreComment, setAttitude, setCollect } = article.actions
export default article.reducer
