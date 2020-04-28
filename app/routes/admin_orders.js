var express = require('express');
var router = express.Router();

var Order = require('../models/order');

router.get('/', function (req, res) {
    
    Order.find(function (err, order) {
        if (err)
            return console.log(err);
        res.render('admin/order', {
            Order: order
        });
        
    });
    
});

module.exports = router;