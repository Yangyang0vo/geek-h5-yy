import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './reducers/login'
import profileSlice from './reducers/profile'
import homeSlice from './reducers/home'
const store = configureStore({
  reducer: {
    loginSlice,
    profileSlice,
    homeSlice
  }
})
// 获取store的类型
export type RootState = ReturnType<typeof store.getState>
// 获取dispatch的类型
export type AppDispatch = typeof store.dispatch
export default store
