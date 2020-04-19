//var User 		= require('../models/user');
var express 	= require('express');
var router		= express.Router();


router.get('/',function(req,res){
	res.render('index',{
		title:'Home'
	});


});

module.exports = router;



// module.exports = function(router){
// 	//http://localhost:8080/users
// 	router.post('/users',function(req,res){
// 		var user = new User();
// 		user.username = req.body.username;
// 		user.password = req.body.password;
// 		user.email= req.body.email;
// 		user.save(function(err){
// 			if (err) {
// 				res.send(err);
// 			} else {
// 				res.send('user created');
// 			}
// 		});
		
// 	});
	
// 	return router;

// }