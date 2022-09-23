import { Modal, Toast } from 'antd-mobile'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useState } from 'react'
import { setMoreActionVisible } from '@/store/reducers/home'
import { reportArticle, unLikeArticle } from '@/store/action/homeActions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

const list = [
  { id: 0, title: '其他问题' },
  { id: 1, title: '标题夸张' },
  { id: 2, title: '低俗色情' },
  { id: 3, title: '错别字多' },
  { id: 4, title: '旧闻重复' },
  { id: 5, title: '广告软文' },
  { id: 6, title: '内容不实' },
  { id: 7, title: '涉嫌违法犯罪' },
  { id: 8, title: '侵权' }
]
const MoreAction = () => {
  // 举报类型 normal 不感兴趣或拉黑作者  junk 垃圾内容
  const [feedbackType, setFeedbackType] = useState('normal')

  const dispatch = useAppDispatch()
  const onClose = () => {
    setFeedbackType('normal')
    dispatch(setMoreActionVisible({ visible: false, articleId: '', channelId: '' }))
  }
  const moreAction = useAppSelector((state) => state.homeSlice.moreAction)
  const unLike = async () => {
    await dispatch(unLikeArticle(moreAction.articleId))
    // 关闭弹窗
    onClose()
    Toast.show({
      content: '已不感兴趣',
      duration: 1000
    })
  }
  const report = async (id: number) => {
    await dispatch(reportArticle({ articleId: moreAction.articleId, type: id }))
    // 关闭弹窗
    onClose()
    Toast.show({
      content: '举报成功',
      duration: 1000
    })
  }
  return (
    <div className={styles.root}>
      <Modal
        visible={moreAction.visible}
        onClose={onClose}
        className="more-action-modal"
        bodyClassName="more-action"
        closeOnMaskClick={true}
        content={
          <div className="more-action">
            {feedbackType === 'normal' ? (
              <>
                <div className="action-item" onClick={unLike}>
                  <Icon type="iconicon_unenjoy1" />
                  不感兴趣
                </div>
                <div className="action-item" onClick={() => setFeedbackType('junk')}>
                  <Icon type="iconicon_feedback1" />
                  <span className="text">反馈垃圾内容</span>
                  <Icon type="iconbtn_right" />
                </div>
                <div className="action-item">
                  <Icon type="iconicon_blacklist" />
                  拉黑作者
                </div>
              </>
            ) : (
              <>
                <div className="action-item" onClick={() => setFeedbackType('normal')}>
                  <Icon type="iconfanhui" />
                  <span className="back-text">反馈垃圾内容</span>
                </div>
                {list.map((item) => (
                  <div className="action-item" key={item.id} onClick={() => report(item.id)}>
                    <span>{item.title}</span>
                  </div>
                ))}
                {/* <div className="action-item">
                  <span className="text">其他问题</span>
                  <Icon type="iconbtn_right" />
                </div> */}
              </>
            )}
          </div>
        }
      ></Modal>
    </div>
  )
}

export default MoreAction
