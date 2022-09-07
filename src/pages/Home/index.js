import React from 'react'
import styles from './index.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <div className={styles.root}>
      <button onClick={() => navigate('/login', { state: location.pathname })}>我要登录</button>
    </div>
  )
}
