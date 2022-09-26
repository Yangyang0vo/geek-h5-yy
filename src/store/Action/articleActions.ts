import http from '@/utils/http'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { saveArticleDetail } from '../reducers/article'

/**
 * 获取文章详情
 * @param id 文章id
 */
export const getArticleDetail = createAsyncThunk('article/getArticleDetail', async (id: string, { dispatch }) => {
  const res = await http.get(`/articles/${id}`)
  dispatch(saveArticleDetail(res.data))
})
