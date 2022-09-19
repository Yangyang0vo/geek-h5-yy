import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
export default function NotFound() {
  const [time, setTime] = useState(3)
  const navigate = useNavigate()

  useEffect(() => {
    let timer = setTimeout(() => {
      setTime(time - 1)
    }, 1000)
    if (time === 0) {
      clearTimeout(timer)
      navigate('/home/index', { replace: true })
    }
  }, [time, navigate])

  return (
    <div className={styles.root}>
      <h1>对不起，您访问的内容不存在...</h1>
      <p>
        {time}秒后自动跳转到<Link to="/home/index">首页</Link>
      </p>
    </div>
  )
}
