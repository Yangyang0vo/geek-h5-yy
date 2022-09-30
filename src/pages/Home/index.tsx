import { useState } from 'react'
import styles from './index.module.scss'
import Tabs from '@/components/Tabs'
import { useEffect } from 'react'
import { getAllChannels, getUserChannels } from '@/store/action/homeActions'
import Icon from '@/components/Icon'
import { Drawer } from 'antd'
import Channels from './components/Channels'
import ArticleList from './components/ArticleList'
import MoreAction from '@/pages/Home/components/MoreAction'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const tabs = useAppSelector((state) => state.homeSlice.userChannels)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // 获取用户频道列表
    dispatch(getUserChannels())
    // 获取所有频道列表
    dispatch(getAllChannels())
  }, [dispatch])
  // 控制高亮
  const [activeIndex, setActiveIndex] = useState(0)
  // 切换频道
  const changeActive = (e: number) => {
    setActiveIndex(e)
  }

  return (
    <div className={styles.root}>
      <Tabs tabs={tabs || []} index={activeIndex} onChange={changeActive}>
        {tabs.map((item) => (
          <ArticleList key={item.id} channelId={item.id} activeId={tabs[activeIndex].id}></ArticleList>
        ))}
      </Tabs>
      {/* 频道Tab 栏 右侧的两个图标 搜索、频道列表 */}
      <div className="tabs-opration">
        <Icon type="iconbtn_search" onClick={() => navigate('/search')}></Icon>
        <Icon type="iconbtn_channel" onClick={() => setOpen(true)}></Icon>
      </div>
      <Drawer open={open} onClose={() => setOpen(false)} placement={'left'} bodyStyle={{ padding: 0 }} closable={false}>
        <Channels onClose={() => setOpen(false)} activeIndex={activeIndex} setActiveIndex={changeActive}></Channels>
      </Drawer>
      <MoreAction></MoreAction>
    </div>
  )
}
