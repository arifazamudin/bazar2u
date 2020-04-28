var mongoose = require('mongoose');

// Checkpoint Schema
var CheckpointSchema = mongoose.Schema({
   
    title: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String
    },
    address: {
      type: String,
      required: [true, 'Please add an address']
    },
    location: {
        type: {
          type: String,
          enum: ['Point']
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    }

    
});

var Checkpoint = module.exports = mongoose.model('Checkpoint', CheckpointSchema);