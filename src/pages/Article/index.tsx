import Icon from '@/components/Icon'
import NavBar from '@/components/NavBar'
import { getArticleDetail } from '@/store/action/articleActions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './index.module.scss'
import * as DOMPurify from 'dompurify'
const Article = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const article = useAppSelector((state) => state.articleSlice.detail)
  useEffect(() => {
    dispatch(getArticleDetail(id!))
  }, [dispatch, id])
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
        >
          文章详情
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

              <div className="author">
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
