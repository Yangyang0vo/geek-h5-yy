import http from '@/utils/http'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { saveUser } from '../reducers/profile'
import { SaveUser } from '../types'
/**
 * 获取用户基本信息
 * @returns thunk
 */
export const getUser = createAsyncThunk('profile/getUser', async () => {
  const res = await http('/user')
  return res.data
})

/**
 * 获取用户详情
 * @returns thunk
 */
export const getUserProfile = createAsyncThunk('profile/getUserProfile', async () => {
  const res = await http.get('/user/profile')
  return res.data
})

/**
 * 修改 昵称、简介、生日、性别 个人资料信息
 * @param {属性名} name 要修改的属性名称
 * @param {属性值} value 要修改的属性值
 * @returns thunk
 */
type UpdateProfile = {
  name: string
  value: number | string
}
export const updateUserProfile = createAsyncThunk('profile/updateUserProfile', async ({ name, value }: UpdateProfile, { dispatch }) => {
  await http.patch('/user/profile', {
    [name]: value
  })
  dispatch(saveUser({ [name]: value } as SaveUser))
})

export const updatePhoto = createAsyncThunk('profile/updatePhoto', async (file: File, { dispatch }) => {
  const formData = new FormData()
  formData.append('photo', file)
  const res = await http.patch('/user/photo', formData)
  dispatch(saveUser({ photo: res.data.photo }))
})
