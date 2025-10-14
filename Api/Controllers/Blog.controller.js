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
        return res.status(500).json({
          status: "error",
          message: "Failed to upload image"
        });
      }

      featureImage = uploadResult.secure_url;
    } else {
      return res.status(400).json({
        status: "error",
        message: "Feature image is required"
      });
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
    const { blogid } = req.params
    const blog = await Blog.findById(blogid).populate("category", "name")

    if (!blog) {
      return next(handleError(404, "Blog not found"))
    }

    res.status(200).json({
      blog
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params
    const data = JSON.parse(req.body.data);

    const blog = await Blog.findById(blogid)

    blog.category = data.category;
    blog.title = data.title;
    blog.slug = data.slug;
    blog.blogContent = encode(data.blogContent);

    let featureImage = blog.featureImage;

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
     }// else {
    //   return next(handleError(400, "Feature image is required"));
    // }

blog.featureImage = featureImage;
    await blog.save();

    res.status(201).json({
      status: "success",
      message: "Blog updated successfully",
    });

  } catch (error) {
    return next(handleError(500, error.message));
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params
    await Blog.findByIdAndDelete(blogid)

    res.status(200).json({
      success: true,
      message: "Blog deleted successfuly."
    })

  } catch (error) {
    return next(handleError(500, error.message));
  }
};

export const showAllBlog = async (req, res, next) => {
  try {
    const blog = await Blog.find()
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res.status(200).json({
      blog
    });

  } catch (error) {
    return next(handleError(500, error.message));
  }
};

export const showUsersBlog = async (req, res, next) => {
  try {
    const { userid } = req.params;

    if (!userid) {
      return next(handleError(400, "User ID is required"));
    }

    console.log("User ID received:", userid); // Debugging log

    const blogs = await Blog.find({ author: userid })
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    console.log("Blogs fetched for user:", blogs); // Debugging log

    if (!blogs || blogs.length === 0) {
      return res.status(200).json({
        success: true,
        blogs: [],
      });
    }

    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error("Error in showUsersBlog:", error.message);
    return next(handleError(500, error.message));
  }
};

export const getBlog = async (req, res, next) => {
  try
  {
    const {slug} = req.params

    const blog = await Blog.findOne({ slug }).populate("author", "name avatar role").populate("category", "name slug").lean().exec()

    res.status(200).json({
      blog
    })
  }
  catch (error) {
    return next(handleError(500, error.message));
  }

}



export const getRelatedBlog = async (req, res, next) => {
  try {
    const { category } = req.params;
    const categoryData = await Category.findOne({ slug: category });

    if (!categoryData) {
      return next(handleError(404, "Category not found"));
    }

    const categoryId = categoryData._id; 
    const blogs = await Blog.find({ category: categoryId }) 
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .lean()
      .exec();

    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};



export const getBlogByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const categoryData = await Category.findOne({ slug: category });

    if (!categoryData) {
      return next(handleError(404, "Category not found"));
    }

    const categoryId = categoryData._id; 
    const blog = await Blog.find({ category: categoryId }).populate("author", "name avatar role").populate("category", "name slug")
      .lean()
      .exec();

    res.status(200).json({
      success: true,
      blog,
      categoryData,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};


export const search = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) {
      return next(handleError(400, "Search query is required"));
    }

    const blog = await Blog.find({ 
      title: { $regex: q, $options: 'i' }
    })
    .populate("author", "name avatar role")
    .populate("category", "name slug")
    .lean()
    .exec();

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};