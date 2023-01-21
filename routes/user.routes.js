const express = require("express");
const User = require("../models/user.model");
const argon2 = require("argon2");
const app = express.Router();
app.post("/register", async(req, res)=>{
    const {email, password, name} = req.body;
    console.log(email, password)
    const hash = await argon2.hash(password);
    try{
        let existingUser = await User.findOne({email})
        if(existingUser){
            res.status(404).send(`cannot create a user with existing email id`)
        }else{
        let user = await User.create({
            name,
            email, 
            password: hash
          
        })
        res.send({ message: "SignUp Success" })
        }
    }catch(e){
        res.status(404).send(e.message);
    }
})


app.post("/login", async(req, res)=>{
    const {email, password} = req.body;
    console.log(email, password)
   try{
    let user = await User.findOne({email});  // User is from model;
    console.log(user)
    if(user){
        if (await argon2.verify(user.password, password)){
       return res.send({
             token: `${email}_#_${password}`,
            "message":"Login Successfull"
         })
        }else{
         res.status(401).send(`Authentication failed, incorrect password`)
        }
    }else{
     res.status(401).send(`User with email: ${email} not found`);
    }
 }catch(e){
     res.status(404).send(e.message);
 }
 })

 app.get("/getProfile", async(req, res)=>{
    const token = req.headers.authorization
    console.log("token", token);
    let t = token
    console.log("t", t);
    
    if(!token){
        return  res.send("missing token");
      }
      let [email, password] = token.split("_#_");
      console.log("email", email);
      email = email.slice(1);
      console.log('e', email);
      

      try{
        let user = await User.findOne({email});  // User is from model;
        console.log(user)
        if(user){
             return res.send(user)
            }else{
             res.status(401).send(`Authentication failed, incorrect password`)
            }
        }catch(e){
         res.status(404).send("no value");
     }
 })


module.exports = app;