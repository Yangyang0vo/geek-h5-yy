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

export default store
