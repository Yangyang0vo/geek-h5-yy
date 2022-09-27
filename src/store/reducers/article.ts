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
    saveArticleDetail: (state, { payload }: PayloadAction<Detail>) => {
      state.detail = payload
    },
    saveComment: (state, { payload }: PayloadAction<commentType>) => {
      state.comments = payload
    },
    saveMoreComment: (state, { payload }: PayloadAction<commentType>) => {
      state.comments = {
        ...payload,
        results: [...state.comments.results, ...payload.results]
      }
    }
  }
})
export const { saveArticleDetail, saveComment, saveMoreComment } = article.actions
export default article.reducer
