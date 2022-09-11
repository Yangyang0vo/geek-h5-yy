import React from 'react'
import { ActionSheet } from 'antd-mobile'
export default function EditList({ show, onClose, type, config }) {
  return (
    <div>
      <ActionSheet visible={show} actions={config[type]} onClose={onClose}></ActionSheet>
    </div>
  )
}
