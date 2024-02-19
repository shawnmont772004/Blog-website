import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import  userRouter  from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
dotenv.config();

const app = express();

app.use(express.json());

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

app.get('/test',(req,res)=>{
    res.json({message:"Hello world!"})
})

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });