import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        
        name: {
            type: String,
            required: true,
            trim: true
        },

        slug: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },

        
    }
)


const Category = mongoose.models.Category || mongoose.model('Category', categorySchema, 'categorys')

export default Category
