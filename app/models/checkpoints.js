var mongoose = require('mongoose');

// Checkpoint Schema
var CheckpointSchema = mongoose.Schema({
   
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String
    }
    
});

var Checkpoint = module.exports = mongoose.model('Checkpoint', CheckpointSchema);