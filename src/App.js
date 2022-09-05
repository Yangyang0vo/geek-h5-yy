// @ts-nocheck
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React, { Suspense } from 'react'
const Login = React.lazy(() => import('@/pages/Login'))
const Home = React.lazy(() => import('@/pages/Home'))
export default function App() {
  return (
    <Router>
      <div className="app">
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/home" element={<Home />}></Route>
          </Routes>
        </Suspense>
      </div>
    </Router>
  )
}
