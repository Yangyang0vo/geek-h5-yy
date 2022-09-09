import React, { useEffect, useState } from 'react'
import NavBar from '@/components/NavBar'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { List, DatePicker, ActionSheet } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '@/store/action/profileActions'
import classnames from 'classnames'
import { removeTokenInfo } from '@/utils/storage'
import { Drawer } from 'antd'
import Icon from '@/components/Icon'
import EditList from './components/EditList'
import Editinput from './components/EditInput'
export default function Edit() {
  const navigate = useNavigate()
  // 控制日期选择器的显示隐藏
  const [visible, setVisible] = useState(false)
  const [show, setShow] = useState(false)
  // 控制抽屉的显示隐藏
  const [open, setOpen] = useState({
    visible: false,
    type: ''
  })
  const onClose = () => {
    setOpen({
      visible: false,
      type: ''
    })
  }
  const dispatch = useDispatch()
  // 页面进入 发请求加载数据
  useEffect(() => {
    dispatch(getUserProfile())
  }, [dispatch])
  // 拿数据
  const profile = useSelector((state) => state.profileSlice.userProfile)
  // 退出功能
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
              onClick={() => {}}
            >
              头像
            </List.Item>
            <List.Item
              arrow
              extra={profile.name}
              onClick={() =>
                setOpen({
                  visible: true,
                  type: 'name'
                })
              }
            >
              昵称
            </List.Item>
            <List.Item
              arrow
              extra={<span className={classnames('intro', profile.intro ? 'normal' : '')}>{profile.intro || '未填写'}</span>}
              onClick={() =>
                setOpen({
                  visible: true,
                  type: 'intro'
                })
              }
            >
              简介
            </List.Item>
          </List>
          {/* 列表二：显示性别、生日 */}
          <List className="profile-list">
            <List.Item arrow extra={profile.gender === 0 ? '男' : '女'} onClick={() => setShow(true)}>
              性别
            </List.Item>
            <List.Item arrow extra={profile.birthday} onClick={() => setVisible(true)} className="none">
              生日
            </List.Item>
            {/* <DatePicker
              title="选择年月日"
              visible={visible}
              value={new Date(profile.birthday)}
              min={new Date(1900, 1, 1)}
              max={new Date()}
              onClose={() => {
                setVisible(false)
              }}
              onConfirm={(val) => {
                console.log(val)
                setVisible(false)
              }}
            /> */}
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
        <Editinput open={open.visible} onClose={onClose} type={open.type}></Editinput>

        <ActionSheet
          visible={show}
          actions={[
            { text: '男', key: 0 },
            { text: '女', key: 1 }
          ]}
          onClose={setShow}
        ></ActionSheet>
      </div>
    </div>
  )
}
