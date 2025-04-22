import { handleError } from "../../utils/handleError.js";
import cloudinary from "cloudinary";
import {encode} from 'entities'


export const addBlog = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    let featureImage = ''


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
                    featureImage = uploadResult.secure_url
            }

    const blog = new Blog({
        author : req.author,
      category: data.category,
      title: data.title,
      slug: data.slug,
      featureImage: featureImage,
      blogContent: encode(data.blogContent) ,
    });

    await blog.save();

    res.status(201).json({
      status: "success",
      message: "Blog created successfully",
    });

  } catch (error) {
    handleError(500, error.message);
  }
};

export const editBlog = async (req, res, next) => {
  try {
  } catch (error) {
    handleError(500, error.message);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
  } catch (error) {
    handleError(500, error.message);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
  } catch (error) {
    handleError(500, error.message);
  }
};

export const showBlog = async (req, res, next) => {
  try {
  } catch (error) {
    handleError(500, error.message);
  }
};
