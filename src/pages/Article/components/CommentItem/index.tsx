import Icon from '@/components/Icon'
import { Comment } from '@/store/types'
import classnames from 'classnames'
import dayjs from 'dayjs'
import styles from './index.module.scss'

/**
 * 评论项组件
 * @param {Function} props.onThumbsUp 点赞后的回调函数
 * @param {Function} props.onOpenReply 点击“回复”按钮后的回调函数
 * @param {String} props.type normal 普通 | origin 回复评论的原始评论 | reply 回复评论
 */
type Props = {
  comment: Comment
  type?: 'normal' | 'origin' | 'reply'
  onThumbsUp?: (val: any) => void
  onOpenReply?: (comment: Comment) => void
  hasReply?: boolean
}
const CommentItem = ({ comment, type = 'normal', onThumbsUp, onOpenReply, hasReply }: Props) => {
  return (
    <div className={styles.root}>
      {/* 评论者头像 */}
      <div className="avatar">
        <img src={comment.aut_photo} alt="" />
      </div>

      <div className="comment-info">
        {/* 评论者名字 */}
        <div className="comment-info-header">
          <span className="name">{comment.aut_name}</span>

          {/* 关注或点赞按钮 */}
          {type === 'normal' ? (
            <span className="thumbs-up" onClick={() => onThumbsUp && onThumbsUp(comment)}>
              {comment.like_count} <Icon type={comment.is_liking ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
            </span>
          ) : (
            <span className={classnames('follow', comment.is_followed ? 'followed' : '')}>{comment.is_followed ? '已关注' : '关注'}</span>
          )}
        </div>

        {/* 评论内容 */}
        <div className="comment-content">{comment.content}</div>

        <div className="comment-footer">
          {/* 回复按钮 */}
          {type === 'normal' && hasReply ? (
            <span className="replay" onClick={() => onOpenReply && onOpenReply(comment)}>
              {comment.reply_count === 0 ? '' : comment.reply_count}回复 <Icon type="iconbtn_right" />
            </span>
          ) : null}

          {/* 评论日期 */}
          <span className="comment-time">{dayjs(comment.pubdate).fromNow()}</span>
        </div>
      </div>
    </div>
  )
}

export default CommentItem
