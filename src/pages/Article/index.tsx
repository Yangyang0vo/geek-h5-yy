import Icon from '@/components/Icon'
import NavBar from '@/components/NavBar'
import { followAuthor, getArticleDetail, getCommentList, getMoreCommentList, likeComment } from '@/store/action/articleActions'
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
import { InfiniteScroll, Toast } from 'antd-mobile'
import { Dialog } from 'antd-mobile'
import Sticky from '@/components/Sticky'
import { Drawer } from 'antd'
import Share from './components/Share'
import CommentInput from './components/CommentInput'
import { Comment } from '@/store/types'
import CommentReply from './components/Reply'
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
    // 滚动到一定位置，显示顶部信息
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
  // 是否有更多评论
  const hasMore = comments.end_id !== comments.last_id
  // 加载更多评论
  const loadMore = async () => {
    await dispatch(
      getMoreCommentList({
        id: id as string,
        offset: comments.last_id
      })
    )
  }
  // 关注作者
  const follow = async () => {
    if (article.is_followed) {
      Dialog.confirm({
        content: '已关注，确定取消关注吗？',
        onConfirm: async () => {
          await dispatch(followAuthor({ id: article.aut_id, is_followed: article.is_followed }))
          Toast.show({
            icon: 'success',
            content: '取消关注成功',
            duration: 1000
          })
        }
      })
    } else {
      await dispatch(followAuthor({ id: article.aut_id, is_followed: article.is_followed }))
      Toast.show({
        icon: 'success',
        content: '关注成功!',
        duration: 1000
      })
    }
  }
  const commentRef = useRef<HTMLDivElement>(null)
  const isCommennt = useRef(false)
  // 跳转到评论
  const goComment = () => {
    if (isCommennt.current) {
      window.scrollTo(0, 0)
    } else {
      window.scrollTo(0, commentRef.current?.offsetTop!)
    }
    isCommennt.current = !isCommennt.current
  }
  // 分享抽屉状态
  const [shareDrawerStatus, setShareDrawerStatus] = useState(false)

  // 打开分享抽屉
  const onOpenShare = () => {
    setShareDrawerStatus(true)
  }
  // 关闭分享抽屉
  const onCloseShare = () => {
    setShareDrawerStatus(false)
  }
  // 评论抽屉状态
  const [commentDrawerStatus, setCommentDrawerStatus] = useState({
    visible: false,
    id: ''
  })
  // 关闭评论抽屉表单
  const onCloseComment = () => {
    setCommentDrawerStatus({
      visible: false,
      id: ''
    })
  }
  // 点击评论工具栏“输入框”，打开评论抽屉表单
  const onComment = () => {
    setCommentDrawerStatus({
      visible: true,
      id: article.art_id
    })
  }
  //回复评论的抽屉
  const [replyDrawerStatus, setReplyDrawerStatus] = useState({
    visible: false,
    // 原始评论
    originComment: {} as Comment
  })
  // 关闭回复评论抽屉
  const onCloseReply = () => {
    setReplyDrawerStatus({
      visible: false,
      originComment: {} as Comment
    })
  }
  const onOpenReply = (comment: Comment) => {
    setReplyDrawerStatus({
      visible: true,
      originComment: comment
    })
  }
  // 给评论点赞
  const onThumbsUp = (comment: Comment) => {
    dispatch(
      likeComment({
        id: comment.com_id,
        isLiking: comment.is_liking
      })
    )
  }
  // const comment_like_count = useAppSelector((state) => state.articleSlice.comments.results?.map((item) => item.like_count).reduce((a, b) => a + b, 0))
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
              <span className={classNames('follow', article.is_followed ? 'followed' : '')} onClick={follow}>
                {article.is_followed ? '已关注' : '关注'}
              </span>
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
                    followed: article.is_followed
                  })}
                  onClick={follow}
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
            <Sticky top={46}>
              <div className="comment-header" ref={commentRef}>
                <span>全部评论（{article.comm_count}）</span>
                <span>{article.like_count} 点赞</span>
              </div>
            </Sticky>

            {article.comm_count === 0 ? (
              // 没有评论时显示的界面
              <NoComment />
            ) : (
              // 有评论时显示的评论列表
              <div className="comment-list">
                {comments.results?.map((item) => {
                  return <CommentItem onThumbsUp={onThumbsUp} hasReply key={item.com_id} comment={item} onOpenReply={onOpenReply} />
                })}
                <InfiniteScroll hasMore={hasMore} loadMore={loadMore}></InfiniteScroll>
              </div>
            )}
          </div>
          {/* 评论工具栏 */}
          <CommentFooter goComment={goComment} onShare={onOpenShare} onComment={onComment} />
        </div>
        {/* 应用分享抽屉 */}
        <Drawer className="share" placement="bottom" closable={false} open={shareDrawerStatus} onClose={onCloseShare} bodyStyle={{ padding: 0 }}>
          {shareDrawerStatus && <Share onClose={onCloseShare}></Share>}
        </Drawer>
        {/* 发表评论抽屉 */}
        <Drawer className="comment" placement="bottom" closable={false} open={commentDrawerStatus.visible}>
          {commentDrawerStatus.visible && <CommentInput articleId={article.art_id} onClose={onCloseComment}></CommentInput>}
        </Drawer>
        {/* 回复评论的抽屉 */}
        <Drawer className="comment" placement="bottom" closable={false} open={replyDrawerStatus.visible}>
          {replyDrawerStatus.visible && <CommentReply onClose={onCloseReply} originComment={replyDrawerStatus.originComment} articleId={article.art_id}></CommentReply>}
        </Drawer>
      </div>
    </div>
  )
}

export default Article
