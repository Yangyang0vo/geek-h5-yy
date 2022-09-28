import http from '@/utils/http'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { saveArticleDetail, saveComment, saveMoreComment, setFollowAuthor } from '../reducers/article'
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

/**
 * 点赞文章
 * @param id 文章id
 * @param attitude 点赞状态 -1 无态度 1 点赞
 */
export const likeArticle = createAsyncThunk('article/likeArticle', async ({ id, attitude }: { id: string; attitude: number }, { dispatch }) => {
  if (attitude === 1) {
    // 点过赞 取消点赞
    await http.delete(`article/likings/${id}`)
  } else {
    // 点赞
    await http.post(`article/likings`, {
      target: id
    })
  }
  dispatch(getArticleDetail(id))
})
/**
 * 收藏文章
 * @param id 文章id
 * @param is_collected 是否收藏
 */
export const collectArticle = createAsyncThunk('article/collectArticle', async ({ id, collected }: { id: string; collected: boolean }, { dispatch }) => {
  if (collected) {
    // 已收藏 取消收藏
    await http.delete(`article/collections/${id}`)
  } else {
    // 收藏
    await http.post(`article/collections`, {
      target: id
    })
  }
  dispatch(getArticleDetail(id))
})

/**
 * 关注作者
 * @param id 作者id
 * @param is_followed 是否关注
 */
export const followAuthor = createAsyncThunk('article/followAuthor', async ({ id, is_followed }: { id: string; is_followed: boolean }, { dispatch }) => {
  if (is_followed) {
    // 已关注 取消关注
    await http.delete(`user/followings/${id}`)
    dispatch(setFollowAuthor(false))
  } else {
    // 关注
    await http.post(`user/followings`, {
      target: id
    })
    dispatch(setFollowAuthor(true))
  }
})
