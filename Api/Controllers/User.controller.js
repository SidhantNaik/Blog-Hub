import User from '../Models/user.model.js'
import { handleError } from '../Helpers/handleError.js'
import bcryptjs from 'bcryptjs'
import cloudinary from '../Config/cloudinary.js'


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


export const updateUser = async (req, res, next) => {
    try {

        const data = JSON.parse(req.body.data)
        const { userid } = req.params

        const user = await User.findById(userid)
        user.name = data.name
        user.email = data.email
        user.bio = data.bio

        if (data.password && data.password.length >= 8) {
            const hashedPassword = await bcryptjs.hash(data.password)
            user.password = hashedPassword
        }

        if (req.file) {
            // Upload an image
            const uploadResult = await cloudinary.uploader
                .upload(
                    req.file.path,
                    { folder: 'Blog-Hub',resource_type: 'auto' }
                    
                )
                .catch((error) => {
                    next(handleError(500, error.message))
                });

                user.avatar = uploadResult.secure_url
        }


        await user.save()

        const newUser = user.toObject({ getters: true })
        delete newUser.password

        res.status(200).json({
            success: true,
            message: "Data updated.",
            user: newUser
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}


export const getAllUsers = async (req, res, next) => {
    try {
        const user = await User.find()
            .select('-password')
            .sort({ createdAt: -1 })
            .lean()
            .exec();

        console.log('User data with timestamps:', user); // Add this to debug

        res.status(200).json({
            success: true,
            user
        })
        
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const { userid } = req.params

      await User.findByIdAndDelete(userid)
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })
            
    } catch(error) {
        next(handleError(500,error.message))
    }
}