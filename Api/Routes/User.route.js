import express from 'express'
import {deleteUser, getAllUsers, getUser,updateUser} from '../Controllers/User.controller.js'
import upload from '../Config/multer.js'

const UserRoute= express.Router()

UserRoute.get('/get-user/:userid',getUser)
UserRoute.put('/update-user/:userid',upload.single('file'),updateUser)
UserRoute.get('/get-all-user',getAllUsers)
UserRoute.delete('/delete/:userid',deleteUser)

export default UserRoute