import Icon from '@/components/Icon'
import { comment } from '@/store/types'
import classnames from 'classnames'
import dayjs from 'dayjs'
import styles from './index.module.scss'

/**
 * 评论项组件
 * @param {String} props.commentId 评论ID
 * @param {String} props.authorPhoto 评论者头像
 * @param {String} props.authorName 评论者名字
 * @param {Number} props.likeCount 喜欢数量
 * @param {Boolean} props.isFollowed 是否已关注该作者
 * @param {Boolean} props.isLiking 是否已点赞该评论
 * @param {String} props.content 评论内容
 * @param {Number} props.replyCount 回复数
 * @param {String} props.publishDate 发布日期
 * @param {Function} props.onThumbsUp 点赞后的回调函数
 * @param {Function} props.onOpenReply 点击“回复”按钮后的回调函数
 * @param {String} props.type normal 普通 | origin 回复评论的原始评论 | reply 回复评论
 */
type Props = {
  comment: comment
  type?: string
  onThumbsUp?: () => void
  onOpenReply?: (id: string) => void
}
const CommentItem = ({ comment, type = 'normal', onThumbsUp, onOpenReply = () => {} }: Props) => {
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
            <span className="thumbs-up" onClick={onThumbsUp}>
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
          {type === 'normal' && (
            <span className="replay" onClick={() => onOpenReply(comment.com_id)}>
              {comment.reply_count === 0 ? '' : comment.reply_count}回复 <Icon type="iconbtn_right" />
            </span>
          )}

          {/* 评论日期 */}
          <span className="comment-time">{dayjs(comment.pubdate).fromNow()}</span>
        </div>
      </div>
    </div>
  )
}

export default CommentItem
