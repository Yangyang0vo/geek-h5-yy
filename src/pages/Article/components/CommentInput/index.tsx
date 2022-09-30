import NavBar from '@/components/NavBar'
import { SendComment } from '@/store/action/articleActions'
import { useAppDispatch } from '@/store/hooks'
import { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'

/**
 * @param {String} props.name 评论人姓名
 * @param {Function} props.onClose 关闭评论表单时的回调函数
 * @param {String} props.articleId 文章ID
 */
type Props = {
  onClose: () => void
  articleId: string
  name?: string
  onAddReply?: (content: string) => void
}
const CommentInput = ({ onClose, articleId, name, onAddReply }: Props) => {
  // 输入框内容
  const [value, setValue] = useState('')
  const dispatch = useAppDispatch()
  // 输入框引用
  const txtRef = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    // 输入框自动聚焦
    setTimeout(() => {
      txtRef.current!.focus()
    }, 100)
  }, [])

  const onSendComment = () => {
    if (!value) return
    if (name) {
      // 回复评论
      onAddReply && onAddReply(value)
    } else {
      // 发表评论
      dispatch(
        SendComment({
          id: articleId,
          content: value
        })
      )
    }

    // 关闭抽屉
    onClose()
  }
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar
        onLeftClick={onClose}
        rightContent={
          <span className="publish" onClick={onSendComment}>
            发表
          </span>
        }
      >
        {name ? '回复评论' : '评论文章'}
      </NavBar>

      <div className="input-area">
        {/* 回复别人的评论时显示：@某某 */}
        {name && <div className="at">@{name}:</div>}

        {/* 评论内容输入框 */}
        <textarea ref={txtRef} placeholder="说点什么~" rows={20} value={value} onChange={(e) => setValue(e.target.value.trim())} />
      </div>
    </div>
  )
}

export default CommentInput
