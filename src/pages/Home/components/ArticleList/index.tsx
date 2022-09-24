import ArticleItem from '@/components/ArticleItem'
import { getArticleList } from '@/store/action/homeActions'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { PullToRefresh, InfiniteScroll } from 'antd-mobile'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
require('default-passive-events')
/**
 *
 * @param {String} props.chanelId 当前文章列表所对应的频道id
 * @param {String} props.aId 当前Tab栏选中的频道id
 * @returns
 */
type ArtcleListProps = {
  channelId: number
  activeId: number
}
export default function ArtcleList({ channelId, activeId }: ArtcleListProps) {
  const dispatch = useAppDispatch()
  const current = useAppSelector((state) => state.homeSlice.articles[channelId])
  useEffect(() => {
    // 如果该频道文章 有数据 没必要一进来就发请求
    if (current) return
    // 如果当前频道id 和选中的频道id 相同 才发请求
    if (channelId === activeId) {
      dispatch(getArticleList({ channelId, timestamp: Date.now() + '' }))
    }
  }, [channelId, dispatch, activeId, current])

  //下啦刷新
  const onRefresh = async () => {
    // 拿最新数据
    await dispatch(getArticleList({ channelId, timestamp: Date.now() + '' }))
    // 重制更多数据
    setHasMore(true)
    // setLoading(false)
  }
  // 是否有更多数据
  const [hasMore, setHasMore] = useState(true)
  // 是否正在加载
  const [loading, setLoading] = useState(false)
  const loadMore = async () => {
    // 如果正在加载中 就不要再次发请求了

    if (loading) return
    // 如果 频道id和当前选中的id不同  不需要加载
    if (channelId !== activeId) return
    // 如果没有时间戳
    if (!current.timestamp) {
      setHasMore(false)
      // 没有更多数据不需要发送请求
      return
    }
    setLoading(true)
    // 无论成功还是 失败 都需要关闭loading
    try {
      await dispatch(getArticleList({ channelId, timestamp: current.timestamp, loadMore: true }))
    } finally {
      setLoading(false)
    }
  }
  // 如果不是当前频道没必要渲染 直接返回null 防止报错
  if (!current) return null
  return (
    <div className={styles.root}>
      <div className="articles">
        {/* 下啦刷新 */}
        <PullToRefresh onRefresh={onRefresh}>
          {current.list.map((item) => (
            <div className="article-item" key={item.art_id}>
              <ArticleItem article={item} channelId={channelId}></ArticleItem>
            </div>
          ))}
          {/* 上拉加载更多 */}
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore}></InfiniteScroll>
        </PullToRefresh>
      </div>
    </div>
  )
}
