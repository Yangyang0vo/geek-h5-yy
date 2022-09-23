import { useEffect, useRef, useState } from 'react'
import NavBar from '@/components/NavBar'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { List, DatePicker, Toast, Dialog } from 'antd-mobile'
import { getUserProfile, updatePhoto, updateUserProfile } from '@/store/action/profileActions'
import classnames from 'classnames'
import EditList from './components/EditList'
import Editinput from './components/EditInput'
import dayjs from 'dayjs'
import { logOut } from '@/store/reducers/login'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

export default function Edit() {
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  // 控制日期选择器的显示隐藏
  const [visible, setVisible] = useState(false)
  // 控制 简介，昵称抽屉的显示隐藏
  const [open, setOpen] = useState({
    visible: false,
    type: '' as 'name' | 'intro'
  })

  // 关闭昵称，简介抽屉
  const onClose = () => {
    setOpen({
      visible: false,
      type: '' as 'name' | 'intro'
    })
    setShow({
      visible: false,
      type: '' as 'photo'
    })
  }
  //  控制头像 性别 的显示隐藏
  const [show, setShow] = useState({
    visible: false,
    type: '' as 'photo' | 'gender'
  })
  // 列表抽屉数据
  const config = {
    photo: [
      {
        text: '拍照',
        key: 0,
        onClick: () => {}
      },
      {
        text: '本地上传',
        key: 1,
        onClick: () => {
          fileRef.current!.click()
        }
      },
      {
        text: '取消',
        key: 2,
        onClick: () => onClose()
      }
    ],
    gender: [
      {
        text: '男',
        key: 0,
        onClick: () => {
          onCommit('gender', 0)
        }
      },
      {
        text: '女',
        key: 1,
        onClick: () => {
          onCommit('gender', 1)
        }
      },
      {
        text: '取消',
        key: 2,
        onClick: () => onClose()
      }
    ]
  }

  // 提交抽屉
  const onCommit = async (type: string, value: string | number) => {
    await dispatch(updateUserProfile({ name: type, value }))
    Toast.show({
      icon: 'success',
      content: '修改成功',
      duration: 1000
    })
    // 关闭抽屉
    onClose()
  }
  // 上传文件
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    await dispatch(updatePhoto(file))
    Toast.show({
      icon: 'success',
      content: '修改头像成功',
      duration: 1000
    })
    // 关闭抽屉
    onClose()
  }
  // 修改生日
  const onDateSubmit = async (val: string | number | Date) => {
    const date = dayjs(val).format('YYYY-MM-DD')
    await onCommit('birthday', date)
  }
  // 退出功能
  const layout = () => {
    Dialog.show({
      title: '温馨提示',
      content: '您确定退出吗?',
      closeOnAction: true,
      className: 'dialog',
      actions: [
        {
          key: 'close',
          text: '取消',
          style: { color: '#000' }
        },
        {
          key: 'confirm',
          text: '确认',
          style: { color: '#fc6627' },
          danger: true,
          onClick: () => {
            // 清空token
            dispatch(logOut())
            Toast.show({
              icon: 'success',
              content: '退出成功',
              duration: 1000
            })
            // 跳转到登录页面
            navigate('/login', { replace: true })
          }
        }
      ]
    })
    // navigate('/login')
  }
  // 页面进入 发请求加载数据
  useEffect(() => {
    dispatch(getUserProfile())
  }, [dispatch])
  // 拿数据
  const profile = useAppSelector((state) => state.profileSlice.userProfile)
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
              onClick={() => {
                setShow({
                  type: 'photo',
                  visible: true
                })
              }}
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
            <List.Item
              arrow
              extra={profile.gender === 0 ? '男' : '女'}
              onClick={() =>
                setShow({
                  type: 'gender',
                  visible: true
                })
              }
            >
              性别
            </List.Item>
            <List.Item arrow extra={profile.birthday} onClick={() => setVisible(true)} className="none">
              生日
            </List.Item>
            <DatePicker
              title="选择年月日"
              visible={visible}
              value={new Date(profile.birthday)}
              min={new Date(1900, 1, 1)}
              max={new Date()}
              onClose={() => {
                setVisible(false)
              }}
              onConfirm={(val) => onDateSubmit(val)}
            />
          </List>
          {/* 文件选择框，用于头像图片的上传 */}
          <input type="file" hidden ref={fileRef} onChange={onFileChange} />
        </div>
        {/* 底部栏：退出登录按钮 */}
        <div className="logout">
          <button className="btn" onClick={layout}>
            退出登录
          </button>
        </div>
        {/* 全屏幕抽屉 */}
        {open.visible && <Editinput open={open.visible} onClose={onClose} type={open.type} onBtnClick={onCommit}></Editinput>}
        <EditList show={show.visible} onClose={onClose} type={show.type} config={config}></EditList>
      </div>
    </div>
  )
}
