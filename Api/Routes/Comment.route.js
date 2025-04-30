import express from 'express'
import {addComment,getComments,getAllComments, deleteComment} from '../Controllers/Comment.controller.js'

const CommentRoute = express.Router()

CommentRoute.post('/add',addComment)
CommentRoute.get('/get/:blogid',getComments)
CommentRoute.get('/get-all-comments',getAllComments)
CommentRoute.delete('/delete/:commentid',deleteComment)

export default CommentRoute