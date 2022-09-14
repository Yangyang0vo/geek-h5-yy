import classnames from 'classnames'
import Icon from '../Icon'
import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import { useRef } from 'react'
const Image = ({ className, src, alt }) => {
  const imgRef = useRef(null)
  // 控制是否加载中
  const [loading, setLoading] = useState(true)
  // 控制是否加载失败
  const [error, setErrror] = useState(false)
  const onLoad = () => {
    setErrror(false)
    setLoading(false)
  }
  const onError = () => {
    setLoading(false)
    setErrror(true)
  }
  useEffect(() => {
    // 监听图片
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting) {
        // 图片在可视区
        imgRef.current.src = imgRef.current.dataset.src
        // 取消监听
        observer.unobserve(imgRef.current)
      }
    })
    // 开始监听
    observer.observe(imgRef.current)
  }, [])

  return (
    <div className={classnames(styles.root, className)}>
      {/* 加载中 */}
      {error && (
        <div className="image-icon">
          <Icon type="iconphoto-fail" />
        </div>
      )}
      {/* 加载错误 */}
      {loading && (
        <div className="image-icon">
          <Icon type="iconphoto" />
        </div>
      )}
      <img alt={alt} data-src={src} ref={imgRef} onLoad={onLoad} onError={onError} />
    </div>
  )
}

export default Image
