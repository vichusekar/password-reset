import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './components/SignUp'
import Home from './components/Home'
import SignIn from './components/SignIn'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import Loading from './components/Loading'
import Main from './components/Main'


function App() {

  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='*' element={<Home />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:id' element={<ResetPassword />} />
        <Route path='/loading' element={<Loading />} />
        <Route path='/main' element={<Main />} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App
