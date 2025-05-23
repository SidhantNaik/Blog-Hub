import { handleError } from '../Helpers/handleError.js'
import Comment from '../Models/comment.model.js'

export const addComment = async (req, res, next)=>{
    try
    {
        const {author,blogid,comment} = req.body

        const newComment = new Comment({
            author:author,
            blogid:blogid,
            comment:comment
        })

        await newComment.save()
        res.status(200).json(
            {
                success:true,
                message:"Comment submited",
                comment:newComment
            })
            
    }catch(error)
    {
        next(handleError(500,error.message))
    }
}



export const getComments = async (req, res, next)=>{
    try {
        const {blogid} = req.params

        const comments = await Comment.find({blogid})
            .populate('author', 'name avatar') 
            .sort({createdAt:-1})
            .lean()
            .exec()

        res.status(200).json({
            success: true,
            comments 
        })
            
    } catch(error) {
        next(handleError(500,error.message))
    }
}


export const getAllComments = async (req, res, next)=>{
    try {
        const comments = await Comment.find()
            .populate('blogid', 'title')  
            .populate('author', 'name')  
            .sort({ createdAt: -1 })     
            .lean()
            .exec();

        res.status(200).json({
            success: true,
            comments 
        })
            
    } catch(error) {
        next(handleError(500,error.message))
    }
}


export const getUserComments = async (req, res, next) => {
    try {
        const { userid } = req.params;

        console.log("Fetching comments for userid:", userid); // Debug log

        if (!userid) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        const comments = await Comment.find({ author: userid })
            .populate('blogid', 'title')  
            .populate('author', 'name')  
            .sort({ createdAt: -1 })
            .lean()
            .exec();

        console.log("Fetched comments:", comments); // Debug log

        res.status(200).json({
            success: true,
            comments
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
}

export const deleteComment = async (req, res, next)=>{
    try {
        const {commentid} = req.params

        await Comment.findByIdAndDelete(commentid)

        res.status(200).json({
            success: true,
            message: "Comment deleted successfully"
        })
            
    } catch(error) {
        next(handleError(500,error.message))
    }
}