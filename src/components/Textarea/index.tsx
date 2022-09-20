import classnames from 'classnames'
import { useState } from 'react'
import styles from './index.module.scss'

/**
 * 带字数统计的多行文本
 * @param {String} className 样式类
 * @param {String} value 文本框的内容
 * @param {String} placeholder 占位文本
 * @param {Function} onChange 输入内容变动事件
 * @param {String} maxLength 允许最大输入的字数（默认100个字符）
 */

interface Type extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  rest?: any
}
const Textarea = ({ className, value, onChange, maxLength = 100, ...rest }: Type) => {
  // 字数状态
  const [count, setCount] = useState(value || '')

  // 输入框的 change 事件监听函数
  const onValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // 获取最新的输入内容，并将它的长度更新到 count 状态
    const newValue = e.target.value
    setCount(newValue)

    // 调用外部传入的事件回调函数
    onChange?.(e)
  }

  return (
    <div className={classnames(styles.root, className)}>
      {/* 文本输入框 */}
      <textarea className="textarea" maxLength={maxLength} {...rest} value={value} onChange={onValueChange} />

      {/* 当前字数/最大允许字数 */}
      <div className="count">
        {count.length}/{maxLength}
      </div>
    </div>
  )
}

export default Textarea
