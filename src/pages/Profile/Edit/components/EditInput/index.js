import styles from './index.module.scss'
import { Drawer } from 'antd'
import Icon from '@/components/Icon'
import Textarea from '@/components/Textarea'
import { useState } from 'react'
import Input from '@/components/Input'
import { useSelector } from 'react-redux'
export default function Editinput({ open, onClose, type, onBtnClick }) {
  const defaultValue = useSelector((state) => state.profileSlice.userProfile[type])
  const [value, setValue] = useState(defaultValue || '')
  return (
    <div className={styles.root}>
      <Drawer
        className="drawer"
        closeIcon={<Icon type={'iconfanhui'} />}
        title={<p className="header-text">{type === 'name' ? '编辑昵称' : '编辑简介'}</p>}
        placement={'right'}
        open={open}
        onClose={() => onClose(false)}
        extra={
          <button onClick={() => onBtnClick(type, value)} className="commit-btn">
            {'提交'}
          </button>
        }
        getContainer={false}
      >
        <div className="content">
          <h3>{type === 'name' ? '昵称' : '简介'}</h3>
          {/* 回显 */}
          {type === 'name' ? (
            <Input autoFocus className="input-wrap " value={value} onChange={(e) => setValue(e.target.value)}></Input>
          ) : (
            <Textarea
              placeholder={type === 'name' ? '请输入昵称' : '请输入简介'}
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
              }}
            ></Textarea>
          )}
        </div>
      </Drawer>
    </div>
  )
}
