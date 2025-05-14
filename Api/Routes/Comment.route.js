import express from 'express'
import {addComment,getComments,getAllComments, deleteComment, getUserComments} from '../Controllers/Comment.controller.js'

const CommentRoute = express.Router()

CommentRoute.post('/add',addComment)
CommentRoute.get('/get/:blogid',getComments)
CommentRoute.get('/get-all-comments',getAllComments)
CommentRoute.get('/get-user-comments/:userid', getUserComments)
CommentRoute.delete('/delete/:commentid',deleteComment)

export default CommentRoute