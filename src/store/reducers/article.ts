import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Detail } from '../types'
type initialState = {
  detail: Detail
}
const article = createSlice({
  name: 'article',
  initialState: {
    // 文章详情数据
    detail: {}
  } as initialState,
  reducers: {
    saveArticleDetail: (state, { payload }: PayloadAction<Detail>) => {
      state.detail = payload
    }
  }
})
export const { saveArticleDetail } = article.actions
export default article.reducer
