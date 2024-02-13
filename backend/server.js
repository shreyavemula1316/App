import express from 'express';
import dotenv from "dotenv";
import connectTOMongoDB from './db/connectToMongoDB.js';
import authRoutes from './routes/auth.routes.js';


const app = express();
const PORT = 5000;

dotenv.config();
app.use(express.json()); //to parse the incoming requests with Json payloads (from req.body)

app.use("/api/auth/",authRoutes);

app.listen(PORT ,() =>{
    connectTOMongoDB();
    console.log(`Server running on port ${PORT}`)
});
