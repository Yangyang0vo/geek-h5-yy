import NavBar from '@/components/NavBar'
import { ImageUploader, Input } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

const ProfileFeedback = () => {
  const navigate = useNavigate()
  const mockUpload = async (file: File) => {
    await 3000
    return {
      url: ''
    }
  }
  return (
    <div className={styles.root}>
      <NavBar onLeftClick={() => navigate(-1)}>意见反馈</NavBar>

      <div className="wrapper">
        <div className="feedback-item">
          <p className="title">简介</p>
          <div className="textarea-wrap">
            <textarea className="textarea" placeholder="请输入" style={{ resize: 'none' }}></textarea>
            <div className="count">0/100</div>
          </div>
          <ImageUploader upload={mockUpload} multiple />
          <p className="image-picker-desc">最多6张，单个图片不超过20M。</p>
        </div>

        <div className="feedback-item">
          <p className="title">联系方式</p>
          <Input placeholder="请输入手机号码便于联系（非必填）" />
        </div>

        <div className="feedback-item feedback-submit">
          <button>提交反馈</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileFeedback
