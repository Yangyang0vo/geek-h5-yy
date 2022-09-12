import Icon from '@/components/Icon'
import React from 'react'
import { useSelector } from 'react-redux'
import styles from './index.module.scss'
// import { differenceBy } from 'lodash'
// 按需导入
import differenceBy from 'lodash/differenceBy'
export default function Channels({ onClose }) {
  // 用户频道列表
  const userChannels = useSelector((state) => state.homeSlice.userChannels)
  // 推荐频道列表
  const recommendChannels = useSelector((state) => {
    const { userChannels, allChannels } = state.homeSlice
    return differenceBy(allChannels, userChannels, 'id')
    // return allChannels.filter((item) => {
    //   //  如果这个频道在userChannels中就不要
    //   return userChannels.findIndex((v) => v.id === item.id) === -1
    // })
  })
  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={onClose} />
      </div>

      {/* 频道列表 */}
      <div className="channel-content">
        {/* 当前选择的频道列表 */}
        <div className={'channel-item edit'}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">点击删除频道</span>
            <span className="channel-item-edit">保存</span>
          </div>

          <div className="channel-list">
            {userChannels.map((item) => (
              <span key={item.id} className="channel-list-item">
                {item.name}
                {/* <Icon type="iconbtn_tag_close" onClick={() => {}} /> */}
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
              <span key={item.id} className="channel-list-item">
                + {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
