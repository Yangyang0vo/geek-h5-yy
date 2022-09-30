import NavBar from '@/components/NavBar'
import NoComment from '@/components/NoneComment'
import http from '@/utils/http'
import { Drawer } from 'antd'
import { useEffect, useState } from 'react'
import CommentFooter from '../CommentFooter'
import CommentInput from '../CommentInput'
import CommentItem from '../CommentItem'
import styles from './index.module.scss'
import { Comment, CommentType } from '@/store/types'
import { InfiniteScroll } from 'antd-mobile'
import { useAppDispatch } from '@/store/hooks'
import { updateComment } from '@/store/reducers/article'
import { likeComment } from '@/store/action/articleActions'
/**
 * 回复评论界面组件
 * @param {Object} props.originComment 原评论数据
 * @param {String} props.articleId 文章ID
 * @param {Function} props.onClose 关闭抽屉的回调函数
 */

type Props = {
  articleId?: string
  onClose?: () => void
  originComment: Comment
  // 接收传过来的点赞回调函数 传给子组件
  // onThumbsUp: (comment: any) => void
}
const CommentReply = ({ articleId, onClose, originComment }: Props) => {
  const [replyList, setReplyList] = useState<CommentType>()
  const dispatch = useAppDispatch()
  //获取文章回复
  useEffect(() => {
    const fetchReplyList = async () => {
      const res = await http.get<CommentType>(`/comments/`, {
        params: {
          type: 'c',
          source: originComment.com_id
        }
      })
      setReplyList(res.data)
    }
    fetchReplyList()
  }, [originComment.com_id])
  //   判断是否还有更多评论
  const hasMore = replyList?.last_id !== replyList?.end_id
  const loadMore = async () => {
    const res = await http.get<CommentType>(`/comments/`, {
      params: {
        type: 'c',
        source: originComment.com_id,
        offset: replyList?.last_id
      }
    })
    setReplyList({
      ...res.data,
      results: [...replyList?.results!, ...res.data.results]
    })
  }
  // 回复评论的抽屉
  const [replyInputVisible, setReplyInputVisible] = useState(false)
  const onCloseCommentInput = () => {
    setReplyInputVisible(false)
  }
  // 添加回复
  const onAddReply = async (content: string) => {
    const res = await http.post('comments', {
      target: originComment.com_id,
      content,
      art_id: articleId
    })
    setReplyList({
      ...replyList!,
      total_count: replyList?.total_count! + 1,
      results: [res.data.new_obj, ...replyList?.results!]
    })
    // 更新评论数量
    dispatch(
      updateComment({
        ...originComment,
        reply_count: originComment.reply_count + 1
      })
    )
  }
  const onThumbsUp = ({ id, isLiking }: { id: string; isLiking: boolean }) => {
    dispatch(
      likeComment({
        id,
        isLiking
      })
    )
    // 更新state 中的评论点赞状态
    setReplyList({
      ...replyList!,
      results: replyList?.results?.map((item) => {
        if (item.com_id === id) {
          if (isLiking) {
            return {
              ...item,
              is_liking: !isLiking,
              like_count: item.like_count - 1
            }
          } else {
            return {
              ...item,
              is_liking: !isLiking,
              like_count: item.like_count + 1
            }
          }
        }
        return item
      })!
    })
  }
  return (
    <div className={styles.root}>
      <div className="reply-wrapper">
        {/* 顶部导航栏 */}
        <NavBar className="transparent-navbar" onLeftClick={onClose}>
          {replyList?.total_count + '条回复'}
        </NavBar>

        {/* 原评论信息 */}
        <div className="origin-comment">{originComment && <CommentItem type="reply" comment={originComment}></CommentItem>}</div>

        {/* 回复评论的列表 */}
        <div className="reply-list">
          <div className="reply-header">全部回复</div>
          {originComment.reply_count === 0 ? (
            <NoComment />
          ) : (
            replyList?.results.map((item) => (
              <CommentItem
                type="normal"
                comment={item}
                key={item.com_id}
                onThumbsUp={() =>
                  onThumbsUp({
                    id: item.com_id,
                    isLiking: item.is_liking
                  })
                }
              ></CommentItem>
            ))
          )}
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore}></InfiniteScroll>
        </div>

        {/* 评论工具栏，设置 type="reply" 不显示评论和点赞按钮 */}
        <CommentFooter type="reply" onComment={() => setReplyInputVisible(true)} />
      </div>

      {/* 评论回复表单抽屉 */}
      <Drawer className="drawer" placement="bottom" open={replyInputVisible} closable={false}>
        {replyInputVisible && <CommentInput name={originComment.aut_name} onClose={onCloseCommentInput} articleId={articleId as string} onAddReply={onAddReply}></CommentInput>}
      </Drawer>
    </div>
  )
}

export default CommentReply
