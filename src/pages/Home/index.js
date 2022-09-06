import React from 'react'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
export default function Home() {
  return (
    <div className={styles.root}>
      {/* 顶部工具栏 */}
      {/* 后退按钮 */}
      <div className="left">
        <Icon type="icon-icon-fanhui"></Icon>
      </div>
      {/* 居中标题 */}
      <div className="title">我是标题</div>
      {/* 右侧内容 */}
      <div className="right">我是内容</div>
    </div>
  )
}
