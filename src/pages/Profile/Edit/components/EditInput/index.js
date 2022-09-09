import styles from './index.module.scss'
import { Drawer } from 'antd'
import Icon from '@/components/Icon'
export default function Editinput({ open, onClose, type }) {
  return (
    <div className={styles.root}>
      <Drawer className="drawer" closeIcon={<Icon type={'iconfanhui'} />} title={<p className="header-text">{type === 'name' ? '编辑昵称' : '编辑简介'}</p>} placement={'right'} open={open} onClose={() => onClose(false)} extra={<button className="commit-btn">{'提交'}</button>} getContainer={false}>
        <div className="content">
          <h3>编辑{type === 'name' ? '昵称' : '简介'}</h3>
        </div>
      </Drawer>
    </div>
  )
}
