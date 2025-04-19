import exress from "express";
import dotenv, { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT;
const app = exress();

app.use(cookieParser());
app.use(exress.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGODB_CONN, { dbName: "Blog_Hub" })
  .then(() => console.log("Database Connected."))
  .catch((err) => console.log("Database connection failed.", err));

app.listen(PORT, () => {
  console.log("Server running on :", PORT);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal server error.'
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
});
