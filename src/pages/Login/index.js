import React from 'react'
import NavBar from '@/components/NavBar'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
export default function Login() {
  const navigate = useNavigate()
  return (
    <div className={styles.root}>
      {/* 标题 */}
      <NavBar onLeftClick={() => navigate(-1)}>登录</NavBar>
      {/* 内容 */}
      <div className="content">
        <h3>短信登录</h3>
        <form>
          <div className="input-item">
            <input type="text" />
            <div className="validate">手机号验证提示错误</div>
          </div>
          <div className="input-item">
            <input type="text" />
            <div className="validate">验证码提示错误</div>
          </div>
          <button type="submit" className="login-btn">
            登录
          </button>
        </form>
      </div>
    </div>
  )
}
