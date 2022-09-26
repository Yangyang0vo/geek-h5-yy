import http from '@/utils/http'
import { getLocalChannels, hasToken, setLocalChannels } from '@/utils/storage'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { saveAllChannels, saveArticleList, saveMoreArticleList, saveUserChannels } from '../reducers/home'
import { Article, Channel } from '../types'
/**
 * 获取用户频道列表
 * @returns {Promise}
 */
export const getUserChannels = createAsyncThunk('home/getUserChannels', async (_, { dispatch }) => {
  // 1. 判断是否登录
  if (hasToken()) {
    const { data: res } = await http.get('user/channels')
    dispatch(saveUserChannels(res.channels))
  } else {
    // 2. 如果没有登录，则使用本地缓存中的频道数据
    const channels = getLocalChannels()
    if (channels) {
      dispatch(saveUserChannels(channels))
    } else {
      // 3. 如果本地缓存中没有频道数据，则使用默认的频道数据
      const { data: res } = await http.get('user/channels')
      dispatch(saveUserChannels(res.channels))
      setLocalChannels(res.channels)
    }
  }
})

/**
 * 获取所有频道列表
 * @returns {Promise}
 */

export const getAllChannels = createAsyncThunk('home/getAllChannels', async (_, { dispatch }) => {
  const { data: res } = await http.get('channels')
  dispatch(saveAllChannels(res.channels))
})

/**
 * 删除用户频道
 * @param {object} channel 频道对象
 * @returns {Promise}
 */

export const delChannel = createAsyncThunk('home/delChannel', async (channel: Channel, { dispatch, getState }) => {
  //  判断是否登录 如果登录了就调用接口删除 如果没有登录就调用本地缓存删除
  // 不管登录没登录 都需要修改redux中的数据
  const userChannels = getState().homeSlice.userChannels
  if (hasToken()) {
    await http.delete(`user/channels/${channel.id}`)
    // 同步到redux
    dispatch(saveUserChannels(userChannels.filter((item) => item.id !== channel.id)))
  } else {
    // 没有登录
    // 同步到本地缓存  同步到redux
    const result = userChannels.filter((item) => item.id !== channel.id)
    dispatch(saveUserChannels(result))
    setLocalChannels(result)
  }
})

/**
 * 添加用户频道
 * @param {object} channel 频道对象
 * @returns {Promise}
 */

export const addChannel = createAsyncThunk('home/addChannel', async (channel: Channel, { dispatch, getState }) => {
  //  判断是否登录 如果登录了就调用接口添加 如果没有登录就调用本地缓存添加
  // 不管登录没登录 都需要修改redux中的数据
  const userChannels = getState().homeSlice.userChannels
  if (hasToken()) {
    await http.patch('user/channels', { channels: [channel] })
    // 同步到redux
    dispatch(saveUserChannels([...userChannels, channel]))
  } else {
    // 没有登录
    // 同步到本地缓存  同步到redux
    const result = [...userChannels, channel]
    dispatch(saveUserChannels(result))
    setLocalChannels(result)
  }
})

/**
 * 获取文章列表
 * @param {ChannelId,timestamp} params 频道id和时间戳
 * @returns {Promise}
 */

type GetArticleListParams = {
  channelId: number
  timestamp: string
  loadMore?: boolean
}
export const getArticleList = createAsyncThunk('home/getArticleList', async ({ channelId, timestamp, loadMore = false }: GetArticleListParams, { dispatch }) => {
  const { data: res } = await http({
    url: '/articles',
    method: 'get',
    params: {
      channel_id: channelId,
      timestamp
    }
  })

  // 保存文章列表
  // 有loadmore 代表加载更多
  if (loadMore) {
    dispatch(
      saveMoreArticleList({
        channelId,
        timestamp: res.pre_timestamp,
        articleList: res.results
      })
    )
  } else {
    // 没有loadmore 代表第一次加载
    dispatch(
      saveArticleList({
        channelId,
        timestamp: res.pre_timestamp,
        articleList: res.results
      })
    )
  }
})

/**
 * 对文章不喜欢
 * @param {number} articleId 文章id
 * @returns {Promise}
 */

export const unLikeArticle = createAsyncThunk('home/unLikeArticle', async (articleId: string, { dispatch, getState }) => {
  await http({
    method: 'post',
    url: '/article/dislikes',
    data: {
      target: articleId
    }
  })
  // 删除指定文章
  const channnelId = getState().homeSlice.moreAction.channelId as number
  const article = getState().homeSlice.articles[channnelId].list.filter((item) => item.art_id !== articleId)
  dispatch(saveArticleList({ channelId: channnelId, articleList: article }))
})
type ReportArticleParams = {
  articleId: string
  type: number
}

// articleId string  type number
export const reportArticle = createAsyncThunk('home/reportArticle', async ({ articleId, type }: ReportArticleParams, { dispatch, getState }) => {
  await http({
    method: 'post',
    url: '/article/dislikes',
    data: {
      target: articleId,
      type
    }
  })
  // 删除指定文章
  const channelId = getState().homeSlice.moreAction.channelId as number
  const article = getState().homeSlice.articles[channelId].list.filter((item: Article) => item.art_id !== articleId)
  dispatch(saveArticleList({ channelId: channelId, articleList: article }))
})
