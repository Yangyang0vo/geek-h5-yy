import React from 'react'
import classNames from 'classnames'

type Props = {
  type:
    | 'iconphoto-fail'
    | 'iconphoto'
    | 'iconbtn_right'
    | 'icon_unenjoy1'
    | 'icon_feedback'
    | 'icon_upload'
    | 'iconbianji'
    | 'icongengduo'
    | 'iconfanhui'
    | 'iconbtn_history1'
    | 'iconbtn_readingtime'
    | 'iconbtn_like2'
    | 'iconbtn_pic'
    | 'iconbtn_mine'
    | 'iconbtn_channel'
    | 'iconbtn_channel_close'
    | 'iconbtn_comment'
    | 'iconbtn_home_sel'
    | 'iconbtn_collect_sel'
    | 'iconbtn_mine_sel'
    | 'iconbtn_collect'
    | 'iconbtn_qa_sel'
    | 'iconbtn_like_sel'
    | 'iconbtn_feedback'
    | 'iconbtn_del'
    | 'iconbtn_tag_close'
    | 'iconbtn_essay_close'
    | 'iconbtn_qa'
    | 'iconbtn_myworks'
    | 'iconicon_blacklist'
    | 'iconbtn_mycollect'
    | 'iconbtn_video_sel'
    | 'iconbtn_share'
    | 'iconbtn_mymessages'
    | 'iconbtn_search'
    | 'iconbtn_like'
    | 'iconbtn_xiaozhitongxue'
    | 'iconbtn_video'
    | 'iconbtn_home'
    | string
  className?: string
  rest?: any
  onClick?: () => void
}
export default function Icon({ type, className, ...rest }: Props) {
  return (
    <svg className={classNames('icon', className)} aria-hidden="true" {...rest}>
      <use xlinkHref={`#${type}`}></use>
    </svg>
  )
}
