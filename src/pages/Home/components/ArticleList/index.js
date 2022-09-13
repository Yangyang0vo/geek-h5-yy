import ArticleItem from '@/components/ArticleItem'
import { getArticleList } from '@/store/action/homeActions'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'
/**
 *
 * @param {String} props.chanelId 当前文章列表所对应的频道id
 * @param {String} props.aId 当前Tab栏选中的频道id
 * @returns
 */
export default function ArtcleList({ channelId, activeId }) {
  const dispatch = useDispatch()
  const current = useSelector((state) => state.homeSlice.articles[channelId])
  useEffect(() => {
    // 如果该频道文章 有数据 没必要一进来就发请求
    if (current) return
    // 如果当前频道id 和选中的频道id 相同 才发请求
    if (channelId === activeId) {
      dispatch(getArticleList({ channelId }))
    }
  }, [channelId, dispatch, activeId, current])
  // 如果不是当前频道没必要渲染 直接返回null 防止报错
  if (!current) return null
  return (
    <div className={styles.root}>
      <div className="articles">
        {current.list.map((item) => (
          <div className="article-item" key={item.art_id}>
            <ArticleItem article={item}></ArticleItem>
          </div>
        ))}
      </div>
    </div>
  )
}
