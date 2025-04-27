import express from "express";
import { addCategory, deleteCategory, getAllCategory, showCategory, updateCategory } from "../controllers/Category.controller.js";


const categoryRoute = express.Router();

categoryRoute.post("/add", addCategory);
categoryRoute.put("/update/:categoryid", updateCategory);
categoryRoute.get("/show/:categoryid", showCategory);
categoryRoute.delete("/delete/:categoryid", deleteCategory);
categoryRoute.get("/all-category", getAllCategory);

export default categoryRoute; 
