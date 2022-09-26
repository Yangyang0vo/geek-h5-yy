import { getLocalHistories } from '@/utils/storage'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Article } from '../types'
type SearchType = {
  // 推荐搜索关键词
  suggestions: string[]
  // 搜索历史
  histories: string[]
  // 搜索结果
  searchResults: Article[]
}
const homeSlice = createSlice({
  name: 'search',
  initialState: {
    // 推荐结果
    suggestions: [],
    histories: getLocalHistories(),
    searchResults: []
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
    saveSearchResults: (state, { payload }: PayloadAction<Article[]>) => {
      state.searchResults = payload
    }
  }
})
export const { saveSuggestions, clearSuggestions, saveHistories, clearHistories, saveSearchResults } = homeSlice.actions
export default homeSlice.reducer
