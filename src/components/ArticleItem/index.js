import classnames from 'classnames'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Img from '@/components/Image'
import { useDispatch, useSelector } from 'react-redux'
import { setMoreActionVisible } from '@/store/reducers/home'
// 扩展dayjs
dayjs.extend(relativeTime)
// 导入中文包
require('dayjs/locale/zh-cn')
// 全局使用简体中文
dayjs.locale('zh-cn')

const ArticleItem = ({ article, channelId }) => {
  const {
    cover: { type, images },
    title,
    aut_name,
    comm_count,
    pubdate
  } = article
  const isLogin = useSelector((state) => !!state.loginSlice.token)
  const dispatch = useDispatch()
  return (
    <div className={styles.root}>
      {/* t3 三图 none-mt 无图 */}
      <div className={classnames('article-content', type === 3 ? 't3' : '', type === 0 ? 'none-mt' : '')}>
        <h3>{title}</h3>
        {type !== 0 && (
          <div className="article-imgs">
            {images.map((item, i) => {
              return (
                <div className="article-img-wrapper" key={i}>
                  <Img src={item} alt="" />
                </div>
              )
            })}
          </div>
        )}
      </div>
      <div className={classnames('article-info', type === 0 ? 'none-mt' : '')}>
        <span>{aut_name}</span>
        <span>{comm_count} 评论</span>
        <span>{dayjs(pubdate).fromNow()}</span>
        <span className="close">
          {isLogin && (
            <Icon
              type="iconbtn_essay_close"
              onClick={() =>
                dispatch(
                  setMoreActionVisible({
                    visible: true,
                    articleId: article.art_id,
                    channelId: channelId
                  })
                )
              }
            />
          )}
        </span>
      </div>
    </div>
  )
}

export default ArticleItem
