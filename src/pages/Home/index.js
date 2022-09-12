import React from 'react'
import styles from './index.module.scss'
import Tabs from '@/components/Tabs'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserChannels } from '@/store/action/homeActions'

export default function Home() {
  const dispatch = useDispatch()
  const tabs = useSelector((state) => state.homeSlice.userChannels)
  useEffect(() => {
    dispatch(getUserChannels())
  }, [dispatch])
  return (
    <div className={styles.root}>
      <Tabs tabs={tabs || []}></Tabs>
    </div>
  )
}
