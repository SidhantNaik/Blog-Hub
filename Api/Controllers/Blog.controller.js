import { handleError } from "../Helpers/handleError.js";
import Blog from "../Models/blog.model.js";
import cloudinary from "cloudinary";
import { encode } from 'entities';

export const addBlog = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    let featureImage = '';

    if (req.file) {
      // Upload an image
      const uploadResult = await cloudinary.uploader
        .upload(
          req.file.path,
          { folder: 'Blog-Hub', resource_type: 'auto' }
        );

      if (!uploadResult) {
        return next(handleError(500, "Failed to upload image"));
      }

      featureImage = uploadResult.secure_url;
    } else {
      return next(handleError(400, "Feature image is required"));
    }

    const blog = new Blog({
      author: data.author,
      category: data.category,
      title: data.title,
      slug: data.slug,
      featureImage: featureImage,
      blogContent: encode(data.blogContent),
    });

    await blog.save();

    res.status(201).json({
      status: "success",
      message: "Blog created successfully",
    });

  } catch (error) {
    // Send error response instead of passing to next
    res.status(500).json({
      status: "error",
      message: error.message || "Internal server error"
    });
  }
};

export const editBlog = async (req, res, next) => {
  try {
  } catch (error) {
    return next(handleError(500, error.message));
  }
};

export const updateBlog = async (req, res, next) => {
  try {
  } catch (error) {
    return next(handleError(500, error.message));
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
  } catch (error) {
    return next(handleError(500, error.message));
  }
};

export const showBlog = async (req, res, next) => {
  try {
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
