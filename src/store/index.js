import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './Slice/loginSlice'
import profileSlice from './Slice/profileSlice'
import homeSlice from './Slice/homeSlice'
const store = configureStore({
  reducer: {
    loginSlice,
    profileSlice,
    homeSlice
  }
})

export default store
