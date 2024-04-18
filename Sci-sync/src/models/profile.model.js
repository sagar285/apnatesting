const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  partnerId: {
    type: String,
    // required: [true, 'Partner ID is required'],
    // unique: true,
    trim: true
  },
  firstName: {
    type: String,
    // required: [true, 'First Name is required'],
    trim: true,
    maxlength: [50, 'First Name cannot exceed 50 characters']
  }, 
  lastName: {
    type: String,
    // required: [true, 'Last Name is required'],
    trim: true,
    maxlength: [50, 'Last Name cannot exceed 50 characters']
  },
  name:{
    type: String,
  },
  email: {
    type: String,
    // required: [true, 'College Email is required'],
    // unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid college email address']
  },
  phoneNumber: {
    type: String,
    // required: [true, 'Phone Number is required'],
    trim: true,
    // unique: true,
    match: [/^\d{10}$/, 'Please add a valid phone number']
  }, 
  location:{
    type:String,
    trim: true,
  },
  language:{
    type:String,
    trim: true,
  },
  token:{
    type:String,
  },

  linkedinurl:{
    type:String,
  },
  githuburl:{
    type:String,
  },
  upiid:{
    type:String,
  },
  aadhar: {
    type: String,
    // required: [true, 'Aadhar is required'],
    // unique: true,
    trim: true,
    match: [/^\d{12}$/, 'Please add a valid Aadhar number']
  },
  surveyList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Survey'
  }],
  otp:{
    type:Number,
  },
 otpExpiry:{
    type:Date,
 },
});




// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, "hjfenjnefnjnefnjnefvkjnfevnknefvnkjevfk", {
  });
};

module.exports = mongoose.model("user", userSchema);
