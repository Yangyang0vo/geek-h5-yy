
import classnames from 'classnames'
import styles from './index.module.scss'
/**
 * 输入组件
 * @param {String} className 样式类
 * @param {String} type 输入类型（即 input 标签支持的所有 type 值）
 * @param {String} name 即 input 标签的 name 属性
 * @param {String} value 即 input 标签的 value 属性
 * @param {String} placeholder 即 input 标签的 placeholder 属性
 * @param {Function} onChange 即 input 标签的 change 事件
 * @param {String} extra 右侧区域显示内容
 * @param {Function} onExtraClick 右侧区域点击事件
 * @param {Array} rest 其他传入的属性
 * @returns
 */
const Input = ({ className, type = 'text', name, value, placeholder, onChange, extra, onExtraClick, ...rest }) => {
  return (
    <div className={classnames(styles.root, className)}>
      {/* 左侧：input 标签 */}
      <input className="input" type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} {...rest} />

      {/* 右侧：额外内容 */}
      {extra && (
        <span className="extra" onClick={onExtraClick}>
          {extra}
        </span>
      )}
    </div>
  )
}

export default Input
