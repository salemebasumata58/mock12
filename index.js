const express = require("express");
require("dotenv").config();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const connect = require("./config/db");
const app = express();
const userRouter = require("./routes/user.routes");
// const Investment = require("./models/investment.model");

const investmentRouter = require("./routes/invest.route")


app.use(express.json());
app.use(cors());
app.use("/users", userRouter );
app.use("/", investmentRouter);

app.get("/", (req,res)=>{
    return res.send("hello")
})
app.listen(8083, async()=>{
    await connect();
    console.log(`listening to 8083`);
})