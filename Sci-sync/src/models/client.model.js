const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");


const clientSchema = new mongoose.Schema({


  name:{
    type:String,
    trim:true,
  },
  email:{
    type:String,
    trim:true,
  },
  password:{
    type:String,
    trim:true,
  },
  isapproved:{
    type:Boolean,
    default:false,
  },

  companyName: {
    type: String,
    // required: [true, 'Company Name is required'],
  },
  companyRepresentative: {
    name: String,
    phone: String,
    email: {
      type: String,
      match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
  },
  contactList: [{
    name: {
      type: String,
      // required: [true, 'Contact name is required'],
    },
    phoneNumber: {
      type: String,
      match: [/^\d{10}$/, 'Please add a valid phone number'],
    },
    email: {
      type: String,
      match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
  }],
  surveys: [{
    surveyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Survey',
    },
    requirementsDocument: String,
    privateDataOrDeal: {
      type: String,
      enum: ['Private Data', '6-month deal'],
    },
  }],
  paymentDetails: {
    terms: String,
    totalValue: Number,
    structure: [{
      installment: Number,
      dueDate: Date,
      amount: Number,
    }],
  },
});

clientSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, "hjfenjnefnjnefnjnefvkjnfevnknefvnkjevfk", {
  });
};
const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
