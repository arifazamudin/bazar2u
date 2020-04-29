var express = require('express');
var router = express.Router();

// Get Category model
var Checkpoint = require('../models/checkpoints');


/*
 * GET Checkpoint index
 */
router.get('/', function (req, res) {

    delete req.session.cart;
    delete req.session.checkpoints;
    
    Checkpoint.find(function (err, checkpoints) {
        if (err)
            return console.log(err);
        res.render('location', {
            
            Checkpoints: checkpoints
        });
        
    });
    
});

// Exports
module.exports = router;