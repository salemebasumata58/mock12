const express = require("express");
require("dotenv").config();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const connect = require("./config/db");
const app = express();


app.use(express.json());
app.use(cors());

app.get("/", (req,res)=>{
    return res.send("hello")
})
app.listen(8083, async()=>{
    await connect();
    console.log(`listening to 8083`);
})