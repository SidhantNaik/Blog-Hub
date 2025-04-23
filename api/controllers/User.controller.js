import { handleError } from "../helpers/handleError.js";
import User from "../models/user.model.js";
export const getUser = async (req, res, next) => {
  try {
    const { userid } = req.params;
    const user = await User.findOne({ _id: userid }).lean().exec();
    if (!user) {
      next(handleError(404, "User not found."));
    }
    res.status(200).json({
      success: true,
      message: "User data found.",
      user,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};


export const updateUser = async (req, res, next) => {
     try {
         console.log(req.file)
         res.status(200).json({
           success: true,
           message: "Data Updated.",
           
         });
     } catch (error) {
       next(handleError(500, error.message));
     }
}