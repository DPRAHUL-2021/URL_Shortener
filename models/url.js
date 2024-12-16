const mongoose = require("mongoose");

const URLSchema = mongoose.Schema({
    shortID:{
        type:String,
        required:true,
        unique:true,
    },
    redirectURL:{
        type:String,
        required:true,
    },
    clickHistory:[{timestamp : {type:Number}}]
} , {timestamps : true});

const URL = mongoose.model("url",URLSchema)

module.exports = URL;