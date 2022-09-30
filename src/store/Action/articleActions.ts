import http from '@/utils/http'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { addNewComment, saveArticleDetail, saveComment, saveMoreComment, setArticleComments } from '../reducers/article'
import { Comment, CommentType } from '../types'

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
  const res = await http.get<CommentType>(`/comments`, {
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
  const res = await http.get<CommentType>(`/comments`, {
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
export const followAuthor = createAsyncThunk('article/followAuthor', async ({ id, is_followed }: { id: string; is_followed: boolean }, { dispatch, getState }) => {
  if (is_followed) {
    // 已关注 取消关注
    await http.delete(`user/followings/${id}`)
  } else {
    // 关注
    await http.post(`user/followings`, {
      target: id
    })
  }
  dispatch(getArticleDetail(getState().articleSlice.detail.art_id))
})

/**
 * 评论文章
 * @param id 文章id 或者 评论人的id
 * @param content 评论内容
 */
type commentRes = {
  com_id: string
  new_obj: Comment
  target: string
}
export const SendComment = createAsyncThunk('article/addComment', async ({ id, content }: { id: string; content: string }, { dispatch, getState }) => {
  const res = await http.post<commentRes>('comments', {
    target: id,
    content
  })
  dispatch(addNewComment(res.data.new_obj))
  dispatch(getArticleDetail(getState().articleSlice.detail.art_id))
})

/**
 * 点赞评论
 * @param id 评论id
 * @param attitude 点赞状态 boolean
 */
export const likeComment = createAsyncThunk('article/likeComment', async ({ id, isLiking }: { id: string; isLiking: boolean }, { dispatch, getState }) => {
  // 获取评论数据
  const { comments } = getState().articleSlice
  const { results } = comments
  if (!isLiking) {
    // 点赞
    await http.post(`comment/likings`, {
      target: id
    })
    dispatch(
      setArticleComments(
        results.map((item) => {
          if (item.com_id === id) {
            return {
              ...item,
              is_liking: true,
              like_count: item.like_count + 1
            }
          } else {
            return item
          }
        })
      )
    )
  } else {
    // 点过赞 取消点赞
    await http.delete(`comment/likings/${id}`)
    // 更新 Redux 中的评论数据
    dispatch(
      setArticleComments(
        results.map((item) => {
          if (item.com_id === id) {
            return {
              ...item,
              is_liking: false,
              like_count: item.like_count - 1
            }
          } else {
            return item
          }
        })
      )
    )
  }
})
