import { configureStore } from '@reduxjs/toolkit'
import xxxReducer from './Slice/xxx'
const store = configureStore({
  reducer: {
    xxxReducer
  }
})

export default store
