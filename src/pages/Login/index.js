import React from 'react'
import NavBar from '@/components/NavBar'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import Input from '@/components/Input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'

import { Toast } from 'antd-mobile'
import { login, sendValidationCode } from '@/store/Action/loginActions'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const formik = useFormik({
    initialValues: {
      mobile: '13900001111',
      code: '246810'
    },
    onSubmit: async (values) => {
      await dispatch(login(values))
      // 判断是否重定向到此处 有无pathname 有则跳回去，无则跳转到首页
      const { state } = location
      if (state) {
        navigate(state)
      } else {
        navigate('/home/index')
      }
    },
    validationSchema: Yup.object({
      mobile: Yup.string()
        .trim()
        .matches(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, '手机号格式错误')
        .required('手机号不能为空'),
      code: Yup.string()
        .matches(/^\d{6}$/, '验证码格式错误')
        .required('验证码不能为空')
    })
  })
  const {
    values: { mobile, code },
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    isValid
  } = formik
  // 发送验证码
  const onExtraClick = async () => {
    if (!/^1[3-9]\d{9}$/.test(mobile)) {
      formik.setTouched({
        mobile: true
      })
      return
    }
    const res = await dispatch(sendValidationCode(mobile))
    if (res.meta.requestStatus === 'fulfilled') {
      Toast.show({
        icon: 'success',
        content: '成功',
        duration: 1000
      })
    }
    if (res.meta.requestStatus === 'rejected') {
      Toast.show({
        content: res.error.message,
        duration: 1000
      })
    }
  }
  return (
    <div className={styles.root}>
      {/* 标题 */}
      <NavBar onLeftClick={() => navigate(-1)}>登录</NavBar>
      {/* 内容 */}
      <div className="content">
        <h3>短信登录</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-item">
            <Input type="text" name="mobile" placeholder="请输入手机号" value={mobile} onChange={handleChange} onBlur={handleBlur} autoComplete="off" />
            {touched.mobile && errors.mobile ? <div className="validate">{errors.mobile}</div> : null}
          </div>
          <div className="input-item">
            <Input type="text" name="code" placeholder="请输入验证码" extra="获取验证码" onExtraClick={onExtraClick} onBlur={handleBlur} value={code} onChange={handleChange} autoComplete="off" />
            {touched.code && errors.code ? <div className="validate">验证码提示错误</div> : null}
          </div>
          <button type="submit" className={classnames('login-btn', isValid ? '' : 'disabled')} disabled={!isValid}>
            登录
          </button>
        </form>
      </div>
    </div>
  )
}
