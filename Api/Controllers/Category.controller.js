import { handleError } from '../Helpers/handleError.js'
import Category from '../Models/category.model.js'


export const addCategory = async (req, res, next) => {

    try {

        const {name,slug}=req.body
        const category = new Category({
            name,slug
        })

        await category.save()

        res.status(200).json({
            sccess:true,
            message: "Category added successfuly."
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}



export const showCategory = async (req, res, next) => {
    try {
        const {categoryid} = req.params
        const category = await Category.findById(categoryid)

        if (!category) {
            return next(handleError(404, "Category not found"))
        }

        res.status(200).json({
            category
        });
        
    } catch (error) {
        next(handleError(500, error.message))
    }
}


export const updateCategory = async (req, res, next) => {
    try {
        const {name,slug}=req.body
        const {categoryid} = req.params

        const category = await Category.findByIdAndUpdate(categoryid,
            {
                name,slug
            },
            { new: true } 
        ) 


        res.status(200).json({
            sccess:true,
            message: "Category updated successfuly.",
            category

        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}


export const deleteCategory = async (req, resizeBy, next) => {
    try {

    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const getAllCategory = async (req, res, next) => {
    try {
        const categories = await Category.find({}).sort({ name: 1 }).lean().exec();

        res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            categories
        });

    } catch (error) {
        next(handleError(500, error.message));
    }
};