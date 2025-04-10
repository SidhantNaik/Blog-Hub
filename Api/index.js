import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import AuthRoute from './Routes/Auth.route.js';

dotenv.config()

const PORT = process.env.PORT;
const app = express();

app.use(cookieParser())
app.use(express.json())
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
))


// rooute setup
app.use('/Api/auth',AuthRoute)


mongoose.connect(process.env.MONGODB_CONN, { dbName: 'Blog-Hub-DB' })
    .then(() => console.log("Database connected"))
    .catch((err) => console.log("Database not connected", err))


app.listen(PORT,
    () => console.log(`Server is running on port ${PORT}`)
)


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server error."

    res.status(statusCode).json(
        {
            success: false,
            statusCode,
            message
        }
    )
})