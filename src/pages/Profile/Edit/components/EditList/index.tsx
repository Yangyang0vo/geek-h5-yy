import { ActionSheet } from 'antd-mobile'
type EditListProps = {
  show: boolean
  onClose: () => void
  type: 'photo' | 'gender'
  config: {
    photo: {
      text: string
      key: number
      onClick: () => void
    }[]
    gender: {
      text: string
      key: number
      onClick: () => void
    }[]
  }
}
export default function EditList({ show, onClose, type, config }: EditListProps) {
  return (
    <div>
      <ActionSheet visible={show} actions={config[type]} onClose={onClose}></ActionSheet>
    </div>
  )
}
