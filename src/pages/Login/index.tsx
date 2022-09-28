import { useRef, useState } from 'react'
import NavBar from '@/components/NavBar'
import { NavigateProps, useLocation, useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import Input from '@/components/Input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import classnames from 'classnames'
import { Toast } from 'antd-mobile'
import { login, sendValidationCode } from '@/store/action/loginActions'
import { useAppDispatch } from '@/store/hooks'
export default function Login() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation()
  const [time, setTime] = useState(0)
  const timeRef = useRef(0)
  const formik = useFormik({
    // 初始值
    initialValues: {
      mobile: '13900001111',
      code: '246810'
    },
    // 登录
    onSubmit: async (values) => {
      const res = await dispatch(login(values))
      // 判断是否重定向到此处 有无pathname 有则跳回去，无则跳转到首页
      const state = location.state as NavigateProps['state']
      // 登录失败 return
      if (res.meta.requestStatus === 'rejected') return
      // 成功之后判断是否有重定向
      Toast.show({
        icon: 'success',
        content: '登录成功',
        duration: 1000
      })
      if (state) {
        navigate(state.from, { replace: true })
      } else {
        navigate('/home/index', { replace: true })
      }
    },
    // 校验表单
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
    // 倒计时开始的时候不让重复点击发送短信
    if (time > 0) return
    if (!/^1[3-9]\d{9}$/.test(mobile)) {
      formik.setTouched({
        mobile: true
      })
      return
    }
    await dispatch(sendValidationCode(mobile))
    Toast.show({
      icon: 'success',
      content: '验证码获取成功',
      duration: 1000
    })
    // 倒计时
    setTime(60)
    let timeId = setInterval(() => {
      // 当我们每次都想要访问到最新的状态 需要写成 剪头函数的形式
      setTime((time) => {
        // 方式1 写到函数里 进行判断
        // if (time === 1) {
        //   clearInterval(timeId)
        // }
        // 方式2 把更新后的time 存到ref里
        timeRef.current = time - 1
        return time - 1
      })
      // 然后同理 进行判断
      if (timeRef.current === 1) {
        clearInterval(timeId)
      }
    }, 1000)
  }
  const back = () => {
    const state = location.state as NavigateProps['state']
    // 进入需要访问权限的页面 被AuthRoute拦截到此处时 点左上角返回 则默认跳转到首页
    if (state.from === '/home/profile' || state.from === '/profile/edit' || state.from === '/profile/chat') {
      navigate('/home/index', { replace: true })
    } else {
      // 不需要访问权限的页面 因发送请求等需要登录的操作而拦截过来 直接返回上一页
      navigate(state.from, { replace: true })
    }
  }
  return (
    <div className={styles.root}>
      {/* 标题 */}
      <NavBar onLeftClick={back}>登录</NavBar>
      {/* 内容 */}
      <div className="content">
        <h3>短信登录</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-item">
            <Input type="text" name="mobile" placeholder="请输入手机号" value={mobile} onChange={handleChange} onBlur={handleBlur} autoComplete="off" />
            {touched.mobile && errors.mobile ? <div className="validate">{errors.mobile}</div> : null}
          </div>
          <div className="input-item">
            <Input type="text" name="code" placeholder="请输入验证码" extra={time === 0 ? '获取验证码' : time + 's后获取'} onExtraClick={onExtraClick} onBlur={handleBlur} value={code} onChange={handleChange} autoComplete="off" />
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
