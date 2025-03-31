import React from 'react'
import LableText from '../Components/LableText'
import InputText from '../Components/InputText'
import Button from '../Components/Button'
import { Link } from 'react-router-dom'
import { RouteSignUp } from '../Helpers/RouteNames'
import { FcGoogle } from 'react-icons/fc'

//npm i zod
const SignIn = () => {



  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <form className="w-full max-w-md">
        <h2 className="text-center mb-6 text-2xl font-bold text-purple-700">Login Into Account</h2>


        <div className="bg-white border-2 rounded-lg shadow-lg p-6 sm:p-10">

          <button
            type="button"
            className="flex items-center justify-center w-full gap-2 border-2 border-gray-300 rounded-lg p-3 mb-4 hover:bg-gray-50 transition-colors"
          >
            <FcGoogle className="text-xl" />
            <span>Continue With Google</span>
          </button>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>


          <div className="mb-4">
            <LableText labels="Email" />
            <InputText placeholder="Enter your email" type="email" name='email' />
          </div>

          <div className="mb-4">
            <LableText labels="Password" />
            <InputText placeholder="Enter your Password" type="password" name='password' />
          </div>

          <div className="flex justify-center mt-6 mb-4">
            <Button title="Submit" />
          </div>

          <p className="text-center text-sm">
            Don't have an account?
            <Link to={RouteSignUp} className="text-blue-500 ml-1">Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SignIn