const mongoose =require("mongoose")


const survyRequestSchema = new mongoose.Schema({
    surveyid: 
        {
          type: mongoose.ObjectId,
          ref: "Survey",
        },
      userid: {
        type: mongoose.ObjectId,
        ref: "user",
      },
      status:{
        type:String,
        default:"approved"
      }
},{timestamps:true})

module.exports = mongoose.model("Surveyrequest",survyRequestSchema)