import React from 'react'
import LoginComponent from '../../components/auth/LoginComponent'
import "../../index.css"

const Login = () => {
  return (
    <div className=' relative grid lg:grid-cols-2 gap-14 h-screen bg-stone-50 sm:bg-gradient-to-r sm:from-primary sm:to-blue-600 px-6 sm:px-10 md:px-12 lg:px-6 xl:px-16 2xl:px-24' id='login'>
        <LoginComponent />
    </div>
  )
}

export default Login