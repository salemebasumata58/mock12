const express = require("express");
const app = express.Router();
const Investment = require("../models/investment.model")

app.post("/calculate",async (req,res)=>{
    let {ammount, rates, years } = req.body;
    console.log( ammount)
   
    // let invest = await Investment.find()
    console.log(ammount, rates, years);
    rates=rates/100
    console.log(rates)
    let newrate = ((1+rates)**years)-1;
    console.log(newrate)
    let Total_Maturity = ammount*(newrate/rates)
    console.log(Total_Maturity)
    let Total_investment = ammount*years
    console.log(Total_investment);
    let interse_gained = Total_Maturity - Total_investment;
    console.log(interse_gained)

    return res.send({"Total_Maturity": Total_Maturity.toFixed(2), "Total_investment": Total_investment.toFixed(2), "interse_gained": interse_gained.toFixed(2)})
})

module.exports = app