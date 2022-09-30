import { useEffect, useRef } from 'react'
import styles from './index.module.scss'

/**
 * 吸顶组件
 * @param {HTMLElement} props.root 滚动容器元素
 * @param {Number} props.height 吸顶元素的高度
 * @param {HTMLElement} props.offset 吸顶位置的 top 值
 * @param {HTMLElement} props.children 本组件的子元素
 */

type Props = {
  children: React.ReactNode | string
  top?: number
}
const Sticky = ({ children, top = 0 }: Props) => {
  const placeRef = useRef<HTMLDivElement>(null)
  const childrenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // top 换算
    // top/375 = x/当前屏幕的宽度
    let value = (top / 375) * document.documentElement.clientWidth
    const onScroll = () => {
      const place = placeRef.current!
      const child = childrenRef.current!
      if (!place || !child) return
      if (place?.getBoundingClientRect()?.top <= value) {
        child.style.position = 'fixed'
        child.style.top = `${value}px`
        place.style.height = child.offsetHeight + 'px'
      } else {
        child.style.position = 'static'
        place.style.height = `${0}px`
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [top])

  return (
    <div className={styles.root}>
      {/* 占位元素 */}
      <div className="sticky-placeholder" ref={placeRef} />

      {/* 吸顶显示的元素 */}
      <div className="sticky-container" ref={childrenRef}>
        {children}
      </div>
    </div>
  )
}

export default Sticky
