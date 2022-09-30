import Icon from '@/components/Icon'
import { collectArticle, likeArticle } from '@/store/action/articleActions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import styles from './index.module.scss'

/**
 * 评论工具栏组件
 * @param {Function} props.onComment 点击输入框的回调函数
 * @param {Function} props.onShowComment 点击”评论”按钮的回调函数
 * @param {Function} props.onShare 点击”分享”按钮的回调函数
 * @param {String} props.type  评论类型：normal 普通评论 | reply 回复评论
 */
type Props = {
  goComment?: () => void
  onShare?: () => void
  onComment?: () => void
  type?: 'normal' | 'reply'
}
const CommentFooter = ({ goComment, onShare, onComment, type = 'normal' }: Props) => {
  const dispatch = useAppDispatch()
  const { detail: article } = useAppSelector((state) => state.articleSlice)
  // 点赞
  const onLike = () => {
    dispatch(likeArticle({ id: article.art_id, attitude: article.attitude }))
  }
  // 收藏
  const collect = () => {
    dispatch(collectArticle({ id: article.art_id, collected: article.is_collected }))
  }

  return (
    <div className={styles.root}>
      {/* 输入框（是个假的输入框，其实就是个按钮） */}
      <div className="input-btn" onClick={onComment}>
        <Icon type="iconbianji" />
        <span>{'去评论'}</span>
      </div>

      {type === 'normal' && (
        <>
          {/* 评论按钮 */}
          <div className="action-item" onClick={goComment}>
            <Icon type="iconbtn_comment" />
            <p>评论</p>
            {article.comm_count !== 0 && <span className="bage">{article.comm_count}</span>}
          </div>

          {/* 点赞按钮 */}
          <div className="action-item" onClick={onLike}>
            <Icon type={article.attitude === 1 ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
            <p>点赞</p>
          </div>
        </>
      )}

      {/* 收藏按钮 */}
      <div className="action-item" onClick={collect}>
        <Icon type={article.is_collected ? 'iconbtn_collect_sel' : 'iconbtn_collect'} />
        <p>收藏</p>
      </div>

      {/* 分享按钮 */}
      <div className="action-item" onClick={onShare}>
        <Icon type="iconbtn_share" />
        <p>分享</p>
      </div>
    </div>
  )
}

export default CommentFooter
