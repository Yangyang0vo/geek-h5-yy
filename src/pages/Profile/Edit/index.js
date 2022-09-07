import React from 'react'
import NavBar from '@/components/NavBar'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { DatePicker, List } from 'antd-mobile'
import { useSelector } from 'react-redux'
export default function Edit() {
  const navigate = useNavigate()
  const info = useSelector((state) => state.profileSlice.user)
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
                  <img src={info.photo} alt="" />
                </span>
              }
              onClick={() => console.log('1111')}
            >
              头像
            </List.Item>
            <List.Item>昵称</List.Item>
            <List.Item>简介</List.Item>
          </List>
          {/* 底部栏：退出登录按钮 */}
          {/* <div className="logout">
            <button className="btn">退出登录</button>
          </div> */}
        </div>
      </div>
    </div>
  )
}
