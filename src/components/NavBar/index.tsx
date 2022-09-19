import classnames from 'classnames'
import Icon from '@/components/Icon'
import styles from './index.module.scss'

/**
 * 顶部导航栏
 * @param {String} props.className 样式类
 * @param {JSX} props.children 是通过组件标签体传递的子元素，用于填充中间标题区域
 * @param {JSX} props.rightContent 是用于填充右侧区域的元素
 * @param {Function} props.onLeftClick 左侧后退按钮的点击事件监听函数
 * @returns
 */
type Props = {
  children: JSX.Element | string
  className?: string
  rightContent?: JSX.Element | string
  onLeftClick?: () => void
}
const NavBar = ({ className, children, rightContent, onLeftClick }: Props) => {
  return (
    <div className={classnames(styles.root, className)}>
      {/* 后退按钮 */}
      <div className="left" onClick={onLeftClick}>
        <Icon type="iconfanhui" />
      </div>

      {/* 居中标题 */}
      <div className="title">{children}</div>

      {/* 右侧内容 */}
      <div className="right">{rightContent}</div>
    </div>
  )
}

export default NavBar
