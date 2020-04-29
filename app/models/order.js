var mongoose = require('mongoose');

//const Product = mongoose.model('Product');
// Order Schema
var OrderSchema = mongoose.Schema({
   
    OrderID: {
        type: Number ,
        required: true,
        unique: true
    },
    Name: {
        type: String
    },
    address: {
      type: String,
      required: [true, 'Please add an address']
    },
    PhoneNum1:{
        type:String
    },
    PhoneNum2:{
        type: String
    },
    ProductsOrdered:{
        type: [], 
        
    },
    checkpoint: {
        type: String
    },
    method:{
        type: String

    },
    createdAt: {
      type: Date,
      default: Date.now
    }

    
});

var Order = module.exports = mongoose.model('Order', OrderSchema);