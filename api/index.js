import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
    console.log("Connected to MongoDB")
    })
    .catch((err)=>{
    console.log("Couldn't connect to database");
    })

app.listen(3000, () => {
    console.log("Server running at local host:3000!!!")
})