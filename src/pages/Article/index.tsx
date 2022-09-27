import Icon from '@/components/Icon'
import NavBar from '@/components/NavBar'
import { getArticleDetail } from '@/store/action/articleActions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './index.module.scss'
import * as DOMPurify from 'dompurify'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai.css'
const Article = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const article = useAppSelector((state) => state.articleSlice.detail)
  useEffect(() => {
    dispatch(getArticleDetail(id!))
  }, [dispatch, id])
  useEffect(() => {
    // 配置 highlight.js
    hljs.configure({
      // 忽略未经转义的 HTML 字符
      ignoreUnescapedHTML: true
    })
    // 获取到渲染正文的容器元素
    const dgHtml = document.querySelector('.dg-html')
    // 查找容器元素下符合 pre code 选择器规则的子元素，进行高亮
    const codes = dgHtml!.querySelectorAll<HTMLElement>('pre code')
    if (codes.length > 0) {
      return codes.forEach((el) => hljs.highlightElement(el))
    }
    // 查找容器元素下的 pre 元素，进行高亮
    const pre = dgHtml!.querySelectorAll('pre')
    if (pre.length > 0) {
      return pre.forEach((el) => hljs.highlightElement(el))
    }
  }, [article])
  // 是否显示顶部信息
  const [isShowTop, setIsShowTop] = useState(false)
  const authorRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onScroll = () => {
      const { top } = authorRef.current?.getBoundingClientRect()!
      if (top <= 0) {
        setIsShowTop(true)
      } else {
        setIsShowTop(false)
      }
    }

    document.addEventListener('scroll', onScroll)
    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  }, [])
  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        {/* 顶部导航栏 */}
        <NavBar
          onLeftClick={() => navigate(-1)}
          rightContent={
            <span>
              <Icon type="icongengduo" />
            </span>
          }
          className="NavBar"
        >
          {isShowTop ? (
            <div className="nav-author">
              <img src={article.aut_photo} alt="" />
              <span className="name">{article.aut_name}</span>
              <span className={classNames('follow', article.is_followed ? 'followed' : '')}>{article.is_followed ? '已关注' : '关注'}</span>
            </div>
          ) : (
            '文章详情'
          )}
        </NavBar>

        <div className="wrapper">
          <div className="article-wrapper">
            {/* 文章描述信息栏 */}
            <div className="header">
              <h1 className="title">{article.title}</h1>

              <div className="info">
                <span>{dayjs(article.pubdate).format('YYYY-MM-DD')}</span>
                <span>{article.read_count} 阅读</span>
                <span>{article.read_count} 评论</span>
              </div>

              <div className="author" ref={authorRef}>
                <img src={article.aut_photo} alt="" />
                <span className="name">{article.aut_name}</span>
                <span
                  className={classNames('follow', {
                    followed: article.is_collected
                  })}
                >
                  {article.is_followed ? '已关注' : '关注'}
                </span>
              </div>
            </div>

            {/* 文章正文内容区域 */}
            <div className="content">
              <div className="content-html dg-html" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}></div>
              <div className="date">发布文章时间：{dayjs(article.pubdate).format('YYYY-MM-DD')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Article
