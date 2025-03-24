import React from 'react'
import LableText from '../Components/LableText'
import InputText from '../Components/InputText'
import Button from '../Components/Button'


const SignUp = () => {
  return (
    <div className="flex justify-center items-center h-screen  ">
      
      <form action="" className="border-1 p-10 rounded-md shadow-2xl">
        
      <h2   className="text-center mb-3 font-bold scale-150">Create Account</h2>

      <div className="border-2 p-2 m-3">G Continue With Google</div>

      <div className="flex justify-between">
        <hr />
        <p>OR</p>
        <hr />
      </div>

      <div>
        <LableText labels={"Name"}/>
        <br />
        <InputText placeholder={"Enter your name"} type={"text"}/>
        <br />

        <LableText labels={"Email"}/>
        <br />
        <InputText placeholder={"Enter your email"} type={"email"}/>
        <br />

        <LableText labels={"Password"}/>
        <br />
        <InputText placeholder={"Enter your password"} type={"password"}/>
        <br />

        <LableText labels={"Confirm Password"}/>
        <br />
        <InputText placeholder={"Confirm your password"} type={"password"}/>
        <br /><br />

        <Button title={"Submit"} />

        <p className="text-center">Already have an account? <a href="sign-in" className='text-blue-500'>Login</a></p>
      </div>
      </form>

    </div>
  )
}

export default SignUp
