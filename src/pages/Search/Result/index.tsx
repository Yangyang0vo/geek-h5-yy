import ArticleItem from '@/components/ArticleItem'
import NavBar from '@/components/NavBar'
import { getSearchReslts } from '@/store/action/searchActions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { InfiniteScroll } from 'antd-mobile'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './index.module.scss'

const SearchResult = () => {
  const navigate = useNavigate()
  // const location = useLocation()
  const dispatch = useAppDispatch()
  // 获取路由参数
  let searchParams = useSearchParams()
  const k = searchParams[0].get('q')!
  // 是否加载中
  const [isLoading, setIsLoading] = useState(false)
  // 是否还有更多数据
  const [hasMore, setHasMore] = useState(true)
  const { results: article, page, total_count, per_page } = useAppSelector((state) => state.SearchSlice.searchResults)

  const loadMore = async () => {
    setIsLoading(true)
    if (isLoading) return
    if (total_count !== 0 && page * per_page >= total_count) {
      setHasMore(false)
      return
    }
    await dispatch(getSearchReslts({ keyword: k, page: page + 1 }))
    setIsLoading(false)
  }

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar onLeftClick={() => navigate(-1)} className="navbar">
        搜索结果
      </NavBar>
      <div className="article-list">
        {article.map((item) => (
          <ArticleItem article={item} channelId={-1} key={item.art_id}></ArticleItem>
        ))}
      </div>
      {/* 上拉加载更多 */}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore}></InfiniteScroll>
    </div>
  )
}

export default SearchResult
