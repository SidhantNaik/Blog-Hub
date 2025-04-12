import express from 'express'
import {GoogleLogin,Register, Login,Logout} from '../Controllers/Auth.controller.js'

const AuthRoute= express.Router()

AuthRoute.post('/register',Register)
AuthRoute.post('/login',Login)
AuthRoute.post('/google-login', GoogleLogin)
AuthRoute.post('/logout', Logout)

export default AuthRoute