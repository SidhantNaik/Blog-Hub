import express from 'express'
import {getUser} from '../Controllers/User.controller.js'

const UserRoute= express.Router()

UserRoute.get('/get-user',getUser)

export default UserRoute