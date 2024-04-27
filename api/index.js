import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"

const app = express()
dotenv.config()


//Database connection
const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to mongo database.")
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected" ,()=>{
    console.log("Mongo Database disconnected")
})



//Middlewares

app.use(express.json())

app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);

//Error handler
app.use((err,req,res,next)=>{
    const errorStatus = err.status|| 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    });
});

//Server Up
app.listen(8800,()=>{
    connect()
    console.log("connected to backend on port 8800.")
});
