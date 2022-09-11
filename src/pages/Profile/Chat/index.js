import Icon from '@/components/Icon'
import Input from '@/components/Input'
import NavBar from '@/components/NavBar'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { io } from 'socket.io-client'
import { getTokenInfo } from '@/utils/storage'
import { getUser } from '@/store/action/profileActions'

const Chat = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // 聊天记录
  const [messageList, setMessageList] = useState([
    // 放两条初始消息
    { type: 'robot', text: '亲爱的用户您好，小智同学为您服务。' },
    { type: 'user', text: '你好' }
  ])
  const clientRef = useRef(null)
  // 输入框内容
  const [msg, setMsg] = useState('')

  // 用于操作聊天列表元素的引用
  const chatListRef = useRef(null)
  useEffect(() => {
    // 拿取用户信息
    dispatch(getUser())
    // 创建客户端实例
    const client = io('http://toutiao.itheima.net', {
      transports: ['websocket'],
      // 在查询字符串参数中传递 token
      query: {
        token: getTokenInfo().token
      }
    })
    // 将客户端实例保存到 ref 中
    clientRef.current = client
    // 监听连接成功的事件
    client.on('connect', () => {
      // 向聊天记录中添加一条 自己的消息
      setMessageList((messageList) => [...messageList, { type: 'robot', text: '我现在恭候着您的提问。' }])
      // Toast.show({
      //   content: '连接成功！开始聊天吧',
      //   duration: 1000
      // })
    })

    // 监听收到消息的事件
    client.on('message', (data) => {
      // console.log('>>>>收到 socket.io 消息:', data)
      // 向聊天记录中添加一条机器人的消息
      setMessageList((messageList) => [...messageList, { type: 'robot', text: data.msg }])
    })
    // 在组件销毁时关闭 socket.io 的连接
    return () => {
      // 关闭连接
      client.close()
    }
  }, [dispatch])

  const onKeyUp = (e) => {
    if (e.keyCode !== 13) return
    if (!msg.trim()) return
    // 把自己的消息添加到聊天记录中
    setMessageList([...messageList, { type: 'user', text: msg }])
    //
    clientRef.current.emit('message', {
      msg,
      timestamp: Date.now()
    })
    // 清空输入框
    setMsg('')
  }

  useEffect(() => {
    // 监听聊天数据的变化，改变聊天容器元素的 scrollTop 值让页面滚到最底部
    chatListRef.current.scrollTop = chatListRef.current.scrollHeight - chatListRef.current.offsetHeight
  }, [messageList])

  const { photo } = useSelector((state) => state.profileSlice.user)
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className="fixed-header" onLeftClick={() => navigate(-1)}>
        小智同学
      </NavBar>

      {/* 聊天记录列表 */}
      <div className="chat-list" ref={chatListRef}>
        {messageList.map((msg, index) => {
          /* 机器人的消息 */
          if (msg.type === 'robot') {
            return (
              <div className="chat-item" key={index}>
                <Icon type="iconbtn_xiaozhitongxue" />
                <div className="message">{msg.text}</div>
              </div>
            )
          } else {
            // 用户的消息
            return (
              <div className="chat-item user" key={index}>
                <img src={photo} alt="" />
                <div className="message">{msg.text}</div>
              </div>
            )
          }
        })}
      </div>

      {/* 底部消息输入框 */}
      <div className="input-footer">
        <Input
          className="no-border"
          placeholder="请描述您的问题"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value)
          }}
          onKeyUp={onKeyUp}
        />
        <Icon type="iconbianji" />
      </div>
    </div>
  )
}

export default Chat
