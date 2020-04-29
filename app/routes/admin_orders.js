var express = require('express');
var router = express.Router();

var Order = require('../models/order')
var Checkpoint = require('../models/checkpoints');

router.get('/', function (req, res) {
    
    Order.find(function (err, order) {
        if (err)
            return console.log(err);
        res.render('admin/order', {
            Order: order
        });
        
    });
    
});

router.get('/delete-order/:id', function (req, res) {
    Order.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            return console.log(err);

        Order.find(function (err, order) {
            if (err) {
                console.log(err);
            } else {
                req.app.locals.order = order;
            }
        });

        req.flash('success', 'Order deleted!');
        res.redirect('/admin/orders/');
    });
});

router.get('/sort', function (req, res) {

   
    
    Order.find({checkpoint:result},function (err, order) {
        if (err)
            return console.log(err);
        res.render('admin/order', {
            Order: order
        });
        
    });
    
});

module.exports = router;