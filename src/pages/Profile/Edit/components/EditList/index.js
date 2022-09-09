import React, { useState } from 'react'
import { ActionSheet } from 'antd-mobile'
export default function EditList({ show, setShow }) {
  return (
    <div>
      <ActionSheet
        visible={show}
        actions={[
          { text: '男', key: 0 },
          { text: '女', key: 1 }
        ]}
        onClose={setShow}
      ></ActionSheet>
    </div>
  )
}
