import { getLocalHistories } from '@/utils/storage'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Article, SearchRes } from '../types'
type SearchType = {
  // 推荐搜索关键词
  suggestions: string[]
  // 搜索历史
  histories: string[]
  // 搜索结果
  searchResults: {
    page: number
    per_page: number
    total_count: number
    results: Article[]
  }
}

const homeSlice = createSlice({
  name: 'search',
  initialState: {
    // 推荐结果
    suggestions: [],
    histories: getLocalHistories(),
    searchResults: {
      page: 0,
      per_page: 10,
      total_count: 0,
      results: []
    }
  } as SearchType,
  reducers: {
    // 保存搜索建议
    saveSuggestions: (state, { payload }: PayloadAction<string[]>) => {
      state.suggestions = payload
    },
    // 清空搜索建议
    clearSuggestions: (state) => {
      state.suggestions = []
    },
    // 保存搜索历史
    saveHistories: (state, { payload }: PayloadAction<string[]>) => {
      state.histories = payload
    },
    // 清空搜索历史
    clearHistories: (state) => {
      state.histories = []
    },
    // 保存搜索结果
    saveSearchResults: (state, { payload }: PayloadAction<SearchRes>) => {
      state.searchResults = {
        ...payload,
        results: [...state.searchResults.results, ...payload.results]
      }
    }
  }
})
export const { saveSuggestions, clearSuggestions, saveHistories, clearHistories, saveSearchResults } = homeSlice.actions
export default homeSlice.reducer
