var mongoose = require('mongoose');
// page schema
var Schema = mongoose.Schema;

//mongoose.set('useCreateIndex', true); 

var PageSchema = mongoose.Schema({

  title: {
    type: String,
    required:true
  },
  slug: {
    type: String
  },
  content: {
    type:String,
    required:true
  },
  sorting: {
    type:Number
  }
});

var Page = module.exports = mongoose.model('Page',PageSchema);
















// var Userschema = new Schema({

//   username : {type: String,lowercase: true,required: true},
//   password: {type: String,required: true},
//   email: {type:String,required:true,lowercase:true,unique:true}
// });

// module.exports = mongoose.model('User',Userschema);









