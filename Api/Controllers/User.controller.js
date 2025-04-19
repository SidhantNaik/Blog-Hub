import User from '../Models/user.model.js'
import { handleError } from '../Helpers/handleError.js'
import cors from 'cors'

export const getUser = async (req, res, next) => {
    try {
        const { userid } = req.params
        const user = await User.findOne({ _id: userid }).lean().exec()

        if (!user) {
            next(handleError(404, "User not found."))
            return
        }

        res.status(200).json({
            success: true,
            message: "User data found.",
            user
        })

    }
    catch (error) {
        next(handleError(500, error.message))
    }
}


export const updateUser= async (req,res,next)=>
{
    try {
        console.log( req.file);
        
        res.status(200).json({
            success: true,
            message: "Data updated.",
            
        })
    } catch (error) {
        next (handleError(500, error.message))
    }
}
