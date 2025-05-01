import React from 'react'
import LableText from '../Components/LableText'
import InputText from '../Components/InputText'
import Button from '../Components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { RouteSignIn, RouteIndex } from '../Helpers/RouteNames'
import GoogleLogin from '../Components/GoogleLogin'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { getEnv } from '../Helpers/getEnv'
import { showToast } from '../Helpers/showToast'
import { FiArrowLeft } from 'react-icons/fi'

const SignUp = () => {

  const navigate = useNavigate()

  const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be 8 characters long"),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  async function onSubmit(values) {
    try {
      const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/register`, {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(values)
      })

      const data = await response.json()
      if (!response.ok) {
        return showToast('error', data.message)
      }

      navigate(RouteSignIn)
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
        <h2 className="text-center mb-6 text-2xl font-bold text-purple-700">Create Account</h2>

        <GoogleLogin />

        <div className="space-y-4">
          <div>
            <LableText labels="Name" />
            <InputText
              placeholder="Enter your name"
              type="text"
              {...register('name')}
              error={errors.name?.message}
            />
          </div>

          <div>
            <LableText labels="Email" />
            <InputText
              placeholder="Enter your email"
              type="email"
              {...register('email')}
              error={errors.email?.message}
            />
          </div>

          <div>
            <LableText labels="Password" />
            <InputText
              placeholder="Enter your password"
              type="password"
              {...register('password')}
              error={errors.password?.message}
            />
          </div>

          <div>
            <LableText labels="Confirm Password" />
            <InputText
              placeholder="Confirm your password"
              type="password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
          </div>

          <div className="flex justify-center mt-6 mb-4">
            <Button title="Submit" type="submit" />
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