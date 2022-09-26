import http from '@/utils/http'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { clearHistories, saveHistories, saveSearchResults, saveSuggestions } from '../reducers/search'
import { removeLocalHistories, setLocalHistories } from '@/utils/storage'
import { SearchRes } from '../types'
/**
 * 获取推荐搜索关键词
 * @param keyword 关键字
 */
type SuggestionRes = {
  options: string[]
}
export const getSuggestList = createAsyncThunk('search/getSuggestList', async (keyword: string, { dispatch }) => {
  // const res = await http.get('/suggestion', { params: { q: keyword } })
  const { data: res } = await http.get<SuggestionRes>(`/suggestion?q=${keyword}`)
  // 后台返回为[null]时 会报错
  if (!res.options[0]) {
    res.options = []
  }
  dispatch(saveSuggestions(res.options))
})

/**
 *  保存搜索历史
 *  @param keyword 关键字
 */
export const addSearchList = createAsyncThunk('search/addSearchList', async (keyword: string, { dispatch, getState }) => {
  let histories = getState().SearchSlice.histories
  // 1. 不允许重复
  histories = histories.filter((item) => item !== keyword)
  // 2. 限制最大长度
  if (histories.length >= 10) {
    histories = histories.slice(0, 10)
  }
  histories = [keyword, ...histories]
  // 保存到redux
  dispatch(saveHistories(histories))
  // 保存到本地
  setLocalHistories(histories)
})
/**
 * 清空搜索历史
 */
export const clearSearchList = createAsyncThunk('search/clearSearchList', async (_, { dispatch }) => {
  dispatch(clearHistories())
  removeLocalHistories()
})

/** 获取搜索结果
 * @params keyword string 关键字
 * @params page number 页码
 */
type SearchParams = {
  keyword: string
  page?: number
}

export const getSearchReslts = createAsyncThunk('search/getSearchReslts', async ({ keyword, page = 1 }: SearchParams, { dispatch }) => {
  const res = await http.get<SearchRes>('/search', { params: { q: keyword, page } })
  dispatch(saveSearchResults(res.data))
})
