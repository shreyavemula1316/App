import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import connectTOMongoDB from './db/connectToMongoDB.js';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';


const app = express();
const PORT = 5000;

dotenv.config();
app.use(express.json()); //to parse the incoming requests with Json payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth/",authRoutes);
app.use("/api/messages",messageRoutes);

app.listen(PORT ,() =>{
    connectTOMongoDB();
    console.log(`Server running on port ${PORT}`)
});

