const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  accountDetails: {
    accountId: {
      type: String,
      required: [true, 'Account ID is required'],
    },
    accountHolderName: {
      type: String,
      required: [true, 'Account holder name is required'],
    },
    accountNumber: {
      type: String,
      required: [true, 'Account number is required'],
    },
    IFSC: {
      type: String,
      required: [true, 'IFSC code is required'],
    },
    UPI: {
      type: String,
      required: [true, 'UPI ID is required'],
    }
  },
  payments: [{
    value: {
      type: Number,
      required: [true, 'Payment value is required'],
    },
    surveyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Survey',
      required: [true, 'Survey ID is required'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed'],
      required: [true, 'Payment status is required'],
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    }
  }],
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
