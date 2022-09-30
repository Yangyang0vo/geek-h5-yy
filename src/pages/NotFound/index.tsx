import { useState } from 'react'
import { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import styles from './index.module.scss'
import history from '@/utils/history'
export default function NotFound() {
  const [time, setTime] = useState(3)

  useEffect(() => {
    let timer = window.setTimeout(() => {
      setTime(time - 1)
    }, 1000)
    if (time === 0) {
      clearTimeout(timer)
      // history.push('/home/index', { replace: true })
      // navigate('/home/index', { replace: true })
      history.go(0)
    }
  }, [time])

  return (
    <div className={styles.root}>
      <h1>对不起，您访问的内容不存在...</h1>
      <p>
        {time}秒后自动跳转到<Link to="/home/index">首页</Link>
        {time === 0 ? <Navigate to={'/home/index'} replace></Navigate> : null}
      </p>
    </div>
  )
}
