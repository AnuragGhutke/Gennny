import express, { Request, Response, Application } from 'express'
import dotenv from "dotenv";
import cors from 'cors'
import { connectDB } from './configs/db'
import { clerkMiddleware } from '@clerk/express';
import { connectCloudinary } from './configs/cloudinary';
import { aiRouter } from './routes/aiRoutes';

//load env variables
dotenv.config();

const app: Application = express()
const port: number = Number(process.env.PORT) || 3000

//middlewares
app.use(cors({
    origin:process.env.CLIENT_URL 
    || "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(clerkMiddleware())

//root route
app.get('/', (req: Request, res: Response) => {
    res.json({ success: true, msg: 'this is the root route...!' })
})

//AI routes
app.use("/api/ai", aiRouter);

//start server
const startServer = async () => {
    try {
        await connectDB()
        await connectCloudinary()
        console.log('cloudinary connected...')

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`)
        })
    } catch (err) {
        console.error("DB connection failed ❌", err);
        process.exit(1);
    }
}

startServer()



