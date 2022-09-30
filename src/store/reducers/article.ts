import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Comment, CommentType, Detail } from '../types'

type initialState = {
  detail: Detail
  comments: CommentType
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
    saveComment: (state, { payload }: PayloadAction<CommentType>) => {
      state.comments = payload
    },
    // 保存更多文章评论
    saveMoreComment: (state, { payload }: PayloadAction<CommentType>) => {
      state.comments = {
        ...payload,
        results: [...state.comments.results, ...payload.results]
      }
    },
    // 添加新评论
    addNewComment(state, { payload }: PayloadAction<Comment>) {
      state.comments.results = [payload, ...state.comments.results]
    },
    // 更新评论
    updateComment: (state, { payload }: PayloadAction<Comment>) => {
      state.comments.results = state.comments.results.map((item) => {
        if (item.aut_id === payload.aut_id) {
          return payload
        }
        return item
      })
    },
    setArticleComments: (state, { payload }: PayloadAction<Comment[]>) => {
      state.comments.results = [...payload]
    }
  }
})
export const { saveArticleDetail, saveComment, saveMoreComment, addNewComment, updateComment, setArticleComments } = article.actions
export default article.reducer
