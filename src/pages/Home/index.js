import React, { useState } from 'react'
import styles from './index.module.scss'
import Tabs from '@/components/Tabs'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllChannels, getUserChannels } from '@/store/action/homeActions'
import Icon from '@/components/Icon'
import { Drawer } from 'antd'
import Channels from './components/Channels'
export default function Home() {
  const dispatch = useDispatch()
  const tabs = useSelector((state) => state.homeSlice.userChannels)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    // 获取用户频道列表
    dispatch(getUserChannels())
    // 获取所有频道列表
    dispatch(getAllChannels())
  }, [dispatch])
  // 控制高亮
  const [activeIndex, setActiveIndex] = useState(0)
  //
  const changeActive = (e) => {
    setActiveIndex(e)
  }
  return (
    <div className={styles.root}>
      <Tabs tabs={tabs || []} index={activeIndex} onChange={changeActive}></Tabs>
      {/* 频道Tab 栏 右侧的两个图标 搜索、频道列表 */}
      <div className="tabs-opration">
        <Icon type="iconbtn_search"></Icon>
        <Icon type="iconbtn_channel" onClick={() => setOpen(true)}></Icon>
      </div>
      <Drawer open={open} onClose={() => setOpen(false)} placement={'left'} bodyStyle={{ padding: 0 }} closable={false}>
        <Channels onClose={() => setOpen(false)} activeIndex={activeIndex} setActiveIndex={changeActive}></Channels>
      </Drawer>
    </div>
  )
}
