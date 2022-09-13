import ArticleItem from '@/components/ArticleItem'
import { getArticleList } from '@/store/action/homeActions'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styles from './index.module.scss'
/**
 *
 * @param {String} props.chanelId 当前文章列表所对应的频道id
 * @param {String} props.aId 当前Tab栏选中的频道id
 * @returns
 */
export default function ArtcleList({ channelId, aid }) {
  const dispatch = useDispatch()
  const list = []
  useEffect(() => {
    if (channelId === aid) {
      dispatch(getArticleList({ channelId }))
    }
  }, [channelId, dispatch, aid])
  return (
    <div className={styles.root}>
      <div className="articles">
        {list.map((item) => (
          <div className="article-item" key={item.art_id}>
            <ArticleItem article={item}></ArticleItem>
          </div>
        ))}
      </div>
    </div>
  )
}
