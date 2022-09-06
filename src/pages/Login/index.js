import React from 'react'
import NavBar from '@/components/NavBar'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import Input from '@/components/Input'
export default function Login() {
  const navigate = useNavigate()
  const onExtraClick = () => {
    console.log('1qqq')
  }
  return (
    <div className={styles.root}>
      {/* 标题 */}
      <NavBar onLeftClick={() => navigate(-1)}>登录</NavBar>
      {/* 内容 */}
      <div className="content">
        <h3>短信登录</h3>
        <form>
          <div className="input-item">
            <Input type="text" placeholder="请输入手机号" />
            {/* <div className="validate">手机号验证提示错误</div> */}
          </div>
          <div className="input-item">
            <Input type="text" placeholder="请输入验证码" extra="获取验证码" onExtraClick={onExtraClick} />
            {/* <div className="validate">验证码提示错误</div> */}
          </div>
          <button type="submit" className="login-btn">
            登录
          </button>
        </form>
      </div>
    </div>
  )
}
