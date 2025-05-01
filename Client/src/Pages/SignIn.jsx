import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import LableText from '../Components/LableText'
import InputText from '../Components/InputText'
import Button from '../Components/Button'
import { RouteIndex, RouteSignIn, RouteSignUp } from '../Helpers/RouteNames'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { getEnv } from '../Helpers/getEnv'
import { showToast } from '../Helpers/showToast'
import GoogleLogin from '../Components/GoogleLogin'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/user/user.slice'

const SignIn = () => {

  const dispath = useDispatch()
  const navigate = useNavigate()

  const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(3, "Wrong password.")
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  async function onSubmit(values) {
    try {
      const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/login`, {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(values)
      })

      const data = await response.json()
      if (!response.ok) {
        return showToast('error', data.message)
      }

      dispath(setUser({ ...data.user, isLoggedIn: true }))  // Add isLoggedIn flag
      navigate(RouteIndex)
      showToast('success', data.message)

    }
    catch (error) {
      showToast('error', error.message)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
      <form className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8" onSubmit={handleSubmit(onSubmit)}>
        <button
          type="button"
          onClick={() => navigate(RouteIndex)}
          className="mb-4 flex items-center text-purple-600 border p-3 rounded-2xl hover:shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out"
        >
          <FiArrowLeft className="h-5 w-5 mr-1" />
          Back
        </button>
        <h2 className="text-center mb-6 text-2xl font-bold text-purple-700">Login Into Account</h2>

        <GoogleLogin />

        <div className="mb-4">
          <LableText labels="Email" />
          <InputText
            placeholder="Enter your email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
        </div>

        <div className="mb-4">
          <LableText labels="Password" />
          <InputText
            placeholder="Enter your Password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
        </div>

        <div className="flex justify-center mt-6 mb-4">
          <Button title="Submit" type="submit" />
        </div>

        <p className="text-center text-sm">
          Don't have an account?
          <Link to={RouteSignUp} className="text-blue-500 ml-1">Sign up</Link>
        </p>
      </form>
    </div>
  )
}

export default SignIn