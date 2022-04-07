const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors= require("cors")
const helmet= require("helmet")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(helmet())
app.use(cors())
app.use('/user',require("./routes/user"))

app.get("/",(req,res)=>{
    res.send("Welcome to the Capstone")
})

app.listen(3000,(e)=>{
    console.log("Connected")

    mongoose.connect("mongodb://localhost/capstone").then((result)=>{
        console.log("Database connected")
    }).catch((err)=>{
        console.log("Database connection denied !!")
        console.log(err)
    })
})