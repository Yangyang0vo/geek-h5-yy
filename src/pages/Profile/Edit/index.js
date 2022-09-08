import React, { useEffect, useState } from 'react'
import NavBar from '@/components/NavBar'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { List, DatePicker } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '@/store/Action/profileActions'
import classnames from 'classnames'
import { removeTokenInfo } from '@/utils/storage'
export default function Edit() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserProfile())
  }, [dispatch])
  const profile = useSelector((state) => state.profileSlice.userProfile)
  const layout = () => {
    navigate('/login')
    removeTokenInfo()
  }
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 顶部导航栏 */}
        <NavBar onLeftClick={() => navigate(-1)}>个人信息</NavBar>

        <div className="wrapper">
          {/* 列表一：显示头像、昵称、简介 */}
          <List className="profile-list">
            <List.Item
              arrow
              extra={
                <span className="avatar-wrapper">
                  <img src={profile.photo} alt="" />
                </span>
              }
              onClick={() => console.log('1111')}
            >
              头像
            </List.Item>
            <List.Item arrow extra={profile.name} onClick={() => console.log('1111')}>
              昵称
            </List.Item>
            <List.Item arrow extra={<span className={classnames('intro', profile.intro ? 'normal' : '')}>{profile.intro || '未填写'}</span>} onClick={() => console.log(11)}>
              简介
            </List.Item>
          </List>
          {/* 列表二：显示性别、生日 */}
          <List className="profile-list">
            <List.Item arrow extra={profile.gender === 0 ? '男' : '女'} onClick={() => console.log('1111')}>
              性别
            </List.Item>
            <List.Item arrow extra={profile.birthday} onClick={() => setVisible(true)} className="none">
              生日
            </List.Item>
            <DatePicker
              title="选择年月日"
              visible={visible}
              value={new Date()}
              min={new Date(1900, 1, 1)}
              max={new Date()}
              onClose={() => {
                setVisible(false)
              }}
              onConfirm={(val) => {
                console.log(val)
                setVisible(false)
              }}
            />
          </List>
          {/* 文件选择框，用于头像图片的上传 */}
          {/* <input type="file" hidden /> */}
        </div>
        {/* 底部栏：退出登录按钮 */}
        <div className="logout">
          <button className="btn" onClick={layout}>
            退出登录
          </button>
        </div>
      </div>
    </div>
  )
}
