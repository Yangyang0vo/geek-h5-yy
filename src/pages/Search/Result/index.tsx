import ArticleItem from '@/components/ArticleItem'
import NavBar from '@/components/NavBar'
import { getSearchReslts } from '@/store/action/searchActions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './index.module.scss'

const SearchResult = () => {
  const navigate = useNavigate()
  // const location = useLocation()
  const dispatch = useAppDispatch()
  let searchParams = useSearchParams()
  const k = searchParams[0].get('q')!
  const article = useAppSelector((state) => state.SearchSlice.searchResults)
  useEffect(() => {
    dispatch(getSearchReslts({ keyword: k }))
  }, [dispatch, k])
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar onLeftClick={() => navigate(-1)}>搜索结果</NavBar>
      <div className="article-list">
        {article.map((item) => (
          <ArticleItem article={item} channelId={0} key={item.art_id}></ArticleItem>
        ))}
      </div>
    </div>
  )
}

export default SearchResult
