import React from 'react'
import LableText from '../Components/LableText'
import InputText from '../Components/InputText'
import Button from '../Components/Button'
import { Link } from 'react-router-dom'
import { RouteSignIn } from '../Helpers/RouteNames'
import { FcGoogle } from 'react-icons/fc'

const SignUp = () => {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <form className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <h2 className="text-center mb-6 text-2xl font-bold text-purple-700">Create Account</h2>

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

        <div className="space-y-4">
          <div>
            <LableText labels="Name" />
            <InputText placeholder="Enter your name" type="text" />
          </div>

          <div>
            <LableText labels="Email" />
            <InputText placeholder="Enter your email" type="email" />
          </div>

          <div>
            <LableText labels="Password" />
            <InputText placeholder="Enter your password" type="password" />
          </div>

          <div>
            <LableText labels="Confirm Password" />
            <InputText placeholder="Confirm your password" type="password" />
          </div>

          <div className="flex justify-center mt-6 mb-4">
            <Button title="Submit" />
          </div>

          <p className="text-center text-sm">
            Already have an account? 
            <Link to={RouteSignIn} className="text-blue-500 ml-1">Login</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SignUp