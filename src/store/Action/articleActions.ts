import http from '@/utils/http'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { saveArticleDetail, saveComment, saveMoreComment } from '../reducers/article'
import { commentType } from '../types'

/**
 * 获取文章详情
 * @param id 文章id
 */
export const getArticleDetail = createAsyncThunk('article/getArticleDetail', async (id: string, { dispatch }) => {
  const res = await http.get(`/articles/${id}`)
  dispatch(saveArticleDetail(res.data))
})

/**
 * 获取文章评论
 * @param id 文章id
 * @param type 评论类型 a 文章 c 回复
 */
export const getCommentList = createAsyncThunk('article/getCommentList', async (id: string, { dispatch }) => {
  const res = await http.get<commentType>(`/comments`, {
    params: {
      type: 'a',
      source: id
    }
  })
  dispatch(saveComment(res.data))
})

/**
 * 获取更多文章评论
 * @param id 文章id
 * @param type 评论类型 a 文章 c 回复
 * @param offset？ 偏移量
 * @param limit？ 限制条数
 */
export const getMoreCommentList = createAsyncThunk('article/getMoreCommentList', async ({ id, offset }: { id: string; offset: string }, { dispatch }) => {
  const res = await http.get<commentType>(`/comments`, {
    params: {
      type: 'a',
      source: id,
      offset
    }
  })
  dispatch(saveMoreComment(res.data))
})
