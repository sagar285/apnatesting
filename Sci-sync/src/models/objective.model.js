const mongoose = require('mongoose');

const mediaTypeSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Image', 'Text', 'Video', 'Audio', 'File'],
      required: true
    },
    link: {
      type: String,
      required: [true, 'Link to the media is required']
    }
  });
  
  const objectiveSchema = new mongoose.Schema({
    dataCollection: {
      type: String,
      required: [true, 'Data Collection name is required']
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'UserID is required']
    },
    input: [mediaTypeSchema], // An array to support multiple input types
    output: [mediaTypeSchema], // An array to support multiple output types
    
  });
  
  const Objective = mongoose.model('Objective', objectiveSchema);
  
  module.exports = Objective;