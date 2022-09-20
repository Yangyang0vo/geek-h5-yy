import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function NotFound() {
  const [time, setTime] = useState(3)
  const navigate = useNavigate()
  const timeRef = useRef<number>()
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((time) => {
        timeRef.current = time - 1
        return time - 1
      })
      if (timeRef.current === 1) {
        clearInterval(timer)
        navigate('/home/index', { replace: true })
      }
    }, 1000)
  }, [navigate])

  return (
    <div>
      <h1>对不起，您访问的内容不存在...</h1>
      <p>
        {time}秒后自动跳转到<Link to="/home/index">首页</Link>
      </p>
    </div>
  )
}
