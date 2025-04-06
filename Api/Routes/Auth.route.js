import express from 'express'
import {Register, Login} from '../Controllers/Auth.controller.js'

const AuthRoute= express.Router()

AuthRoute.post('/register',Register)
AuthRoute.post('/login',Login)

export default AuthRoute