import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './index'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import history from '@/utils/history'
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// 自定义监听路由变化的hook
// 起因1.因为在使用navigate 时 history 里面的pathname 和 navigate的pathname不一致 导致
// 导致被拦截到登录页时 from 的属性不是上一次访问的页面 而是上上次的页面 登录成功后没有跳到对应的页面 用户体验不好
// 2.还有一种情况 是在使用history.push 等方法时 url 变了 但页面并没有重新渲染 手动使用navigate跳转一下
export function useHistory() {
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    history.listen(() => {
      navigate(history.location.pathname, { state: { from: location.pathname }, replace: true })
    })
  }, [navigate, location.pathname])
}
