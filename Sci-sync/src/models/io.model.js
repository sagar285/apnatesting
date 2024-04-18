const mongoose = require('mongoose');


const IOSchema = new mongoose.Schema({
    surveyid: 
    {
      type: mongoose.ObjectId,
      ref: "Survey",
    },
    userid: {
        type: mongoose.ObjectId,
        ref: "user",
      },
    input:{
        type:String,
        required:true
    },
    output:{
        type:String,
        required:true
    },
})

module.exports = mongoose.model("inputoutput",IOSchema);