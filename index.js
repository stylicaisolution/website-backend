import express from "express"
import dotenv from "dotenv"

//importing mongoose
import mongoose from "mongoose"

import cors from 'cors'

import cookieParser from "cookie-parser"

//import routers
import contactRoute from './routes/contact.js'
import emailRoute from './routes/email.js'
import mailRoute from './routes/mail.js'

//app configure 
const port = process.env.PORT || 8000

const app=express()
dotenv.config()

// CORS options
const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            "http://localhost:3000",
            "http://localhost:5173",
            "https://stylic.ai",
            "https://www.stylic.ai",
        ];
        // Allow requests with no origin (like mobile apps or CURL)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"], // Add OPTIONS
    credentials: true,
};


// Preflight request handling for OPTIONS
app.options("*", cors(corsOptions)); // Allow OPTIONS for all routes


//middleware for using cors
app.use(cors(corsOptions));

//this middleware for authentication
app.use(cookieParser())
//using json middleware where we can easily get our json data
app.use(express.json())


//connecting with mongodb atlas

const connect=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("connected to mongodb!")
    }catch(err){
        throw err
    }
}
mongoose.connection.on("disconnected",()=>{
   console.log("mongodb disconnected")
})
mongoose.connection.on("connected",()=>{
    console.log("mongodb connected")
})


//middlewares
app.use('/api/contact',contactRoute)
app.use('/api/email',emailRoute)
app.use('/api/mail',mailRoute)

app.get('/', (req, res) => {
    res.send("Bahut maja ara hai bhai🐱")
})



//middleware for error handeling
app.use((err,req,res,next)=>{
    const errStatus=err.status || 500
    const errmsg=err.message || "Something went wrong"
    return res.status(errStatus).json({
        success:false,
        status:errStatus,
        message:errmsg,
        stack:err.stack

    })
})


app.listen(port,()=>{
    connect()
    console.log("connected on port:8000 to backend!")
})