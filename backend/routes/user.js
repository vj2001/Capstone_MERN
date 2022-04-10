const express = require("express");
const mongoose = require("mongoose");
const UserSchema = require("../models/User");
const router = express.Router();
const UserService = require("../services/UserService");
const auth = require("./auth")

const userServiceObj = new UserService();

router.get("/", auth.required, async (req,res)=>{
   const result = await userServiceObj.getUser();
    res.send(result);
})

router.get("/:id", auth.required, async (req,res)=>{
    const result = await userServiceObj.getUserById(req.params.id);
     res.send(result);
 })

router.post("/", auth.required, async (req,res)=>{
    const result = await userServiceObj.setUser(req.body);
    res.send(result);
})

router.delete("/:id", auth.required, async (req, res)=>{
    const result = await userServiceObj.removeUser(req.params.id);
    res.send(result)
})

router.post("/login", async (req,res)=>{

    let loginResult = await userServiceObj.loginUser(req.body);
    res.send(loginResult);
})

module.exports = router;