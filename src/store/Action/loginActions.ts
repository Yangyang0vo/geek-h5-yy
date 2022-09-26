import http from '@/utils/http'
import { setTokenInfo } from '@/utils/storage'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { saveToken } from '../reducers/login'

/**
 * 发送验证码
 * @param {string} mobile 手机号
 * @returns
 */
export const sendValidationCode = createAsyncThunk('login/sendValidationCode', async (mobile: string) => {
  await http.get(`/sms/codes/${mobile}`)
})

/**
 * 登录
 * @param {{ mobile, code }} values 登录信息
 * @returns tokenInfo
 */

type LoginParams = {
  mobile: string
  code: string
}
export const login = createAsyncThunk('login/login', async (params: LoginParams, { dispatch }) => {
  const res = await http.post('/authorizations', params)
  const tokenInfo = res.data
  // 保存 Token 到 Redux 中
  dispatch(saveToken(tokenInfo))
  //  保存 Token 到本地缓存中
  setTokenInfo(tokenInfo)
})
