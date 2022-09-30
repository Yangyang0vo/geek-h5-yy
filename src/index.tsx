import App from './App'
// 导入通用样式
import './assets/styles/index.scss'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import 'antd/dist/antd.css'
import { AliveScope } from 'react-activation'

import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
// 扩展dayjs
dayjs.extend(relativeTime)
// 导入中文包
require('dayjs/locale/zh-cn')
// 全局使用简体中文
dayjs.locale('zh-cn')

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AliveScope>
      <App></App>
    </AliveScope>
  </Provider>
)
