const mongoose = require("mongoose");

const investMentSchema = new mongoose.Schema({
ammount: {type:Number, required: true},
    rates: {type: Number, required:true},
    years:{type: Number, required: true}
   
},{
    versionKey: false,
    timestamps:true
});

const Investment = mongoose.model("investment", investMentSchema);

module.exports = Investment;