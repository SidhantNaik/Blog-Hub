import express from 'express'
import { addBlog, editBlog, updateBlog,deleteBlog, showBlog, getBlog, getRelatedBlog } from '../Controllers/Blog.controller.js'
import upload from '../Config/multer.js'

const BlogRoute= express.Router()

BlogRoute.post('/add', upload.single('file') ,addBlog)
BlogRoute.get('/edit/:blogid',editBlog)
BlogRoute.put('/update/:blogid',upload.single('file'),updateBlog)
BlogRoute.delete('/delete/:blogid', deleteBlog);
BlogRoute.get('/get-all', showBlog)
BlogRoute.get('/get-blog/:slug',getBlog)
BlogRoute.get('/get-related-blog/:category',getRelatedBlog)

export default BlogRoute