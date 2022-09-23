import styles from './index.module.scss'
import { Drawer } from 'antd'
import Icon from '@/components/Icon'
import Textarea from '@/components/Textarea'
import { useState } from 'react'
import Input from '@/components/Input'
import { useAppSelector } from '@/store/hooks'
type EditInputProps = {
  open: boolean
  onClose: (visible: boolean) => void
  type: 'name' | 'intro'
  onBtnClick: (type: string, value: string | number) => void
}
export default function Editinput({ open, onClose, type, onBtnClick }: EditInputProps) {
  const defaultValue = useAppSelector((state) => state.profileSlice.userProfile[type])
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
              placeholder={type === 'intro' ? '请输入简介' : '请输入昵称'}
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
