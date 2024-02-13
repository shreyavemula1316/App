import mongoose from "mongoose";

const connectTOMongoDB = async () =>{
    try {
        await mongoose.connect("mongodb://localhost:27017/testDb")
        console.log("Connected to MongoDb")
    } catch (error) {
        console.log("Error connecting to MongoDb", error.message)
    }
}

export default connectTOMongoDB;