// @ts-nocheck
import App from './App'
import React from 'react'
// 导入通用样式
import './assets/styles/index.scss'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App></App>
  </Provider>
)
