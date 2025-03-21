import React from 'react'
import LableText from '../Components/LableText'
import InputText from '../Components/InputText'
import Button from '../Components/Button'

const SignIn = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <form onSubmit={""}>


        <h2 className="text-center mb-3 font-bold scale-150">Login Into Account </h2>
        <div className="border-2 max-w-fit p-20 space-y-3 rounded-lg shadow-2xl">
         
          <LableText labels={"Email"} />
          <br />
          <InputText placeholder={"Enter your email"} type={"email"} />

          <br /><br />
          <LableText labels={"Password"} />
          <br />
          <InputText placeholder={"Enter your Password"} type={"password"} />

          <br /> <br />
          <Button title={"Submit"} />

          <br />
          <p className="text-center">Don't have an account? <a href="sign-up" className='text-blue-500'>Sign up</a></p>
        </div>
      </form>
    </div>
  )
}

export default SignIn
