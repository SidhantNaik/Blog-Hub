import express from 'express'
import {getUser,updateUser} from '../Controllers/User.controller.js'
import upload from '../Config/multer.js'

const UserRoute= express.Router()

UserRoute.get('/get-user/:userid',getUser)
UserRoute.put('/update-user/:userid',upload.single('file'),updateUser)


export default UserRoute