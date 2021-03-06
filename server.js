var express 	= require('express');
var app 		= express();
var port 		= process.env.PORT || 8080;
//var morgan 		= require('morgan');
var mongoose 	= require('mongoose');
var Page 		= require('./app/models/page');
var Checkpoint = require('./app/models/checkpoints');
var bodyParser 	= require('body-parser');
const session 	= require('express-session');
var router		= express.Router();
//var appRoutes	= require('./app/routes/api')(router);
var path		= require('path');
var expressValidator = require('express-validator');
var fileUpload 	= require('express-fileupload');

const dotenv    =require('dotenv');
const cors  = require('cors');

var AWS         = require('aws-sdk');

dotenv.config({path: './config/config.env'});
app.use(cors()); 


//database check
mongoose.connect('mongodb://makan2u:password123@ds121945.mlab.com:21945/heroku_t3jt7cpl',{useNewUrlParser:true,useUnifiedTopology:true},function(err){

	if (err){
		console.log('NOt connected to database' + err);
	} else{
		console.log('Connected to mongoDB');
	}
});


//view engine setup
app.set('views',path.join(__dirname,'/public/app/view'));
app.set('view engine','ejs'); 

//app.use(morgan('dev'));



//s3
AWS.config.update({
    accessKeyId: "AKIAJELWBWAYWUG5CL3A",
    secretAccessKey: "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",
    region: 'ap-southeast-1'
  });



//express fileupload middleware
app.use(fileUpload());

//boyparsermiddleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//set global variable
app.locals.errors = null;

// Get all pages to pass to header.ejs
Page.find({}).sort({sorting: 1}).exec(function (err, pages) {
  if (err) {
      console.log(err);
  } else {
      app.locals.pages = pages;
  }
});

// Get all checkpoint to pass to header.ejs
Checkpoint.find(function (err, checkpoints) {
  if (err) {
      console.log(err);
  } else {
      app.locals.checkpoints = checkpoints;
  }
});

//express session middleware
app.use(session({
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: true,
	//cookie: { secure: true }
  }));

//express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//cart
app.get('*',function(req,res,next){
  res.locals.checkpoint = req.session.checkpoint;
  res.locals.cart = req.session.cart;
  next();
})


// Express Validator middleware
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
      var namespace = param.split('.')
              , root = namespace.shift()
              , formParam = root;

      while (namespace.length) {
          formParam += '[' + namespace.shift() + ']';
      }
      return {
          param: formParam,
          msg: msg,
          value: value
      };
  },
  customValidators: {
      isImage: function (value, filename) {
          var extension = (path.extname(filename)).toLowerCase();
          switch (extension) {
              case '.jpg':
                  return '.jpg';
              case '.jpeg':
                  return '.jpeg';
              case '.png':
                  return '.png';
              case '':
                  return '.jpg';
              default:
                  return false;
          }
      }
  }
}));

//set routes
var api = require('./app/routes/api');
var products = require('./app/routes/products');
var location = require('./app/routes/location');
var cart = require('./app/routes/cart');

var admin = require('./app/routes/admin_pages');
var adminCheckpoints = require('./app/routes/admin_checkpoint.js');
var adminProducts= require('./app/routes/admin_products');
var adminOrders= require('./app/routes/admin_orders');




app.use('/',api); //+ api file
app.use('/products',products);
app.use('/admin/pages',admin);
app.use('/admin/checkpoints',adminCheckpoints);
app.use('/admin/products',adminProducts);
app.use('/admin/orders',adminOrders);

app.use('/location',location);
app.use('/cart',cart);






// app.get('/home',function(req,res){
// 	res.send("hellosial");
// });

// app.get('/',function(req,res){

// 	res.render('index',{
// 		title:'Home'
// 	});
// });



app.listen(port,function(){
	console.log('Running the server on port '+ port);	

})

