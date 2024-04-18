const mongoose = require('mongoose');


const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  instructions: {
    type: String,
    required: [true, 'Instructions are required'],
    trim: true
  },
  pay: {
    type: Number,
    required: [true, 'Pay is required']
  },
  qualification:{
    type:String,
    required:true,
  },
  input:{
    type:String,
    required:true,
  },
  Output:{
    type:String,
    required:true,
  },
  clientid: 
  {
    type: mongoose.ObjectId,
    ref: "Client",
  },


  // objectives: [objectiveSchema] // This holds an array of objectives
});


const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;