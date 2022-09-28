import Icon from '@/components/Icon'
import NavBar from '@/components/NavBar'
import { getArticleDetail, getCommentList, getMoreCommentList } from '@/store/action/articleActions'
import { useAppDispatch, useAppSelector, useHistory } from '@/store/hooks'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './index.module.scss'
import * as DOMPurify from 'dompurify'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai.css'
import throttle from 'lodash/throttle'
import NoComment from '@/components/NoneComment'
import CommentItem from './components/CommentItem'
import CommentFooter from './components/CommentFooter'
import { InfiniteScroll } from 'antd-mobile'

const Article = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useAppDispatch()
  // 使用自定义的history hook
  useHistory()
  const { detail: article, comments } = useAppSelector((state) => state.articleSlice)
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
    const onScroll = throttle(() => {
      const rect = authorRef.current?.getBoundingClientRect()!
      if (rect?.top <= 0) {
        setIsShowTop(true)
      } else {
        setIsShowTop(false)
      }
    }, 300)

    document.addEventListener('scroll', onScroll)
    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  }, [])
  // 拿评论数据
  useEffect(() => {
    dispatch(getCommentList(id as string))
  }, [dispatch, id])
  const hasMore = comments.end_id !== comments.last_id
  const loadMore = async () => {
    await dispatch(
      getMoreCommentList({
        id: id as string,
        offset: comments.last_id
      })
    )
  }
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
                <span>{article.comm_count} 评论</span>
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
          <div className="comment">
            {/* 评论总览信息 */}
            <div className="comment-header">
              <span>全部评论（{article.comm_count}）</span>
              <span>{article.like_count} 点赞</span>
            </div>

            {article.comm_count === 0 ? (
              // 没有评论时显示的界面
              <NoComment />
            ) : (
              // 有评论时显示的评论列表
              <div className="comment-list">
                {comments.results?.map((item) => {
                  return <CommentItem key={item.com_id} comment={item} />
                })}
                <InfiniteScroll hasMore={hasMore} loadMore={loadMore}></InfiniteScroll>
              </div>
            )}
          </div>
          {/* 评论工具栏 */}
          <CommentFooter />
        </div>
      </div>
    </div>
  )
}

export default Article
