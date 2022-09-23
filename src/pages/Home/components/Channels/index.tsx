import Icon from '@/components/Icon'
import { useState } from 'react'
import styles from './index.module.scss'
// import { differenceBy } from 'lodash'
// 按需导入
import differenceBy from 'lodash/differenceBy'
import classNames from 'classnames'
import { addChannel, delChannel } from '@/store/action/homeActions'
import { Toast } from 'antd-mobile'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Channel } from '@/store/types'
type ChannelsProps = {
  onClose: () => void
  activeIndex: number
  setActiveIndex: (index: number) => void
}

export default function Channels({ onClose, activeIndex, setActiveIndex }: ChannelsProps) {
  const dispatch = useAppDispatch()
  // 用户频道列表
  const userChannels = useAppSelector((state) => state.homeSlice.userChannels)
  // 推荐频道列表
  const recommendChannels = useAppSelector((state) => {
    // 推荐频道 = 所有频道 - 用户频道
    const { userChannels, allChannels } = state.homeSlice
    return differenceBy(allChannels, userChannels, 'id')
    // return allChannels.filter((item) => {
    //   //  如果这个频道在userChannels中就不要
    //   return userChannels.findIndex((v) => v.id === item.id) === -1
    // })
  })
  // 编辑频道
  const [editing, setEditing] = useState(false)
  // 点击切换频道
  const changeChannel = (index: number) => {
    if (editing) return
    // 修改高亮
    setActiveIndex(index)
    closeChannel()
  }
  const closeChannel = () => {
    // 关闭抽屉
    onClose()
    setEditing(false)
  }
  //删除频道
  const del = async (channel: Channel, index: number) => {
    // id number  name  string  index number
    if (userChannels.length <= 4) {
      return Toast.show({ content: '至少保留4个频道', duration: 400 })
    }
    await dispatch(delChannel(channel))
    // 删除的时候 需要处理高亮
    // 如果删除的index 和activeIndex相同，就让默认推荐0 高亮
    // 如果 删除的index 小于 activeIndex，就让 activeIndex - 1 高亮
    Toast.show({ content: '删除成功', duration: 1000 })
    if (index === activeIndex) {
      setActiveIndex(0)
    }
    if (index < activeIndex) {
      setActiveIndex(activeIndex - 1)
    }
  }
  // 添加频道
  const add = async (channel: Channel) => {
    // 可选   是否编辑状态才允许添加和删除频道
    // if (!editing) return
    await dispatch(addChannel(channel))
    Toast.show({ content: '添加成功', duration: 300 })
  }
  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={closeChannel} />
      </div>

      {/* 频道列表 */}
      <div className="channel-content">
        {/* 当前选择的频道列表 */}
        <div className={classNames('channel-item', editing ? 'edit' : '')}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">{editing ? '点击删除频道' : '点击进入频道'}</span>
            <span className="channel-item-edit" onClick={() => setEditing(!editing)}>
              {editing ? '完成' : '编辑'}
            </span>
          </div>

          <div className="channel-list">
            {userChannels.map((item, index) => (
              <span key={item.id} className={classNames('channel-list-item', index === activeIndex ? 'selected' : '')} onClick={() => changeChannel(index)}>
                {item.name}
                {item.id !== 0 && <Icon type="iconbtn_tag_close" onClick={() => del(item, index)} />}
              </span>
            ))}
          </div>
        </div>

        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {recommendChannels.map((item) => (
              <span key={item.id} className="channel-list-item" onClick={() => add(item)}>
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
