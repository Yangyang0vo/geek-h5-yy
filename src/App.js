// @ts-nocheck
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React, { Suspense } from 'react'
// 路由懒加载
const Login = React.lazy(() => import('@/pages/Login'))
const TabBarLayout = React.lazy(() => import('@/layouts/TabBarLayout'))
export default function App() {
  return (
    <Router>
      <div className="app">
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            <Route path="/home/*" element={<TabBarLayout />} />
            {/* <Route path="*" element={<TabBarLayout />}></Route> */}
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </Suspense>
      </div>
    </Router>
  )
}
