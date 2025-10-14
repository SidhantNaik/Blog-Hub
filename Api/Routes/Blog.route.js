import express from 'express'
import { addBlog, editBlog, updateBlog,deleteBlog, showAllBlog, getBlog, getRelatedBlog, getBlogByCategory, search, showUsersBlog } from '../Controllers/Blog.controller.js'
import upload from '../Config/multer.js'

const BlogRoute= express.Router()

BlogRoute.post('/add', upload.single('file') ,addBlog)
BlogRoute.get('/edit/:blogid',editBlog)
BlogRoute.put('/update/:blogid',upload.single('file'),updateBlog)
BlogRoute.delete('/delete/:blogid', deleteBlog);
BlogRoute.get('/get-all', showAllBlog)
BlogRoute.get('/get-user-blog/:userid', showUsersBlog)
BlogRoute.get('/get-blog/:slug',getBlog)
BlogRoute.get('/get-related-blog/:category',getRelatedBlog)
BlogRoute.get('/get-blog-by-category/:category',getBlogByCategory)
BlogRoute.get('/search',search)

export default BlogRoute