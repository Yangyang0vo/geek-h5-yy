import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

export default function Question() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className={styles.root}>
      <button onClick={() => navigate('/login', { state: location.pathname })}>我要登录</button>
    </div>
  )
}
