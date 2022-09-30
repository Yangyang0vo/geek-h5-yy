import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import React, { Suspense } from 'react'
import AuthRoute from './components/AuthRoute'

// 路由懒加载
const Login = React.lazy(() => import('@/pages/Login'))
const Home = React.lazy(() => import('@/layouts/TabBarLayout'))
const Article = React.lazy(() => import('@/pages/Article'))
const Chat = React.lazy(() => import('@/pages/Profile/Chat'))
const ProfileEdit = React.lazy(() => import('@/pages/Profile/Edit'))
const Feedback = React.lazy(() => import('@/pages/Profile/Feedback'))
const Search = React.lazy(() => import('@/pages/Search'))
const SearchResult = React.lazy(() => import('@/pages/Search/Result'))
const NotFound = React.lazy(() => import('@/pages/NotFound'))

export default function App() {
  return (
    <Router>
      <div className="app">
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            {/* 使用tab布局的页面 */}
            <Route path="/" element={<Navigate to={'/home/index'} />} />
            <Route path="/home/*" element={<Home />} />

            {/* 不使用tab布局的页面 */}
            {/* <Route path="*" element={<TabBarLayout />}></Route> */}
            <Route path="/login" element={<Login />}></Route>
            <Route path="/search" element={<Search />}></Route>
            <Route path="/search/result" element={<SearchResult />}></Route>
            <Route path="/article/:id" element={<Article />}></Route>
            {/* 需要登录才能访问 */}
            <Route
              path="/profile/edit"
              element={
                <AuthRoute>
                  <ProfileEdit />
                </AuthRoute>
              }
            />
            <Route
              path="/profile/feedback"
              element={
                <AuthRoute>
                  <Feedback />
                </AuthRoute>
              }
            />
            <Route
              path="/profile/chat"
              element={
                <AuthRoute>
                  <Chat />
                </AuthRoute>
              }
            />
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Suspense>
      </div>
    </Router>
  )
}
