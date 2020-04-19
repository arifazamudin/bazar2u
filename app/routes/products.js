var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
//var auth = require('../config/auth');
//var isUser = auth.isUser;

// Get Product model
var Product = require('../models/product');

// Get Category model
var Checkpoint = require('../models/checkpoints');

/*
 * GET all products
 */
router.get('/', function (req, res) {
//router.get('/', isUser, function (req, res) {

    Product.find(function (err, products) {
        if (err)
            console.log(err);

        res.render('all_products', {
            title: 'All products',
            products: products
        });
    });

});


// /*
//  * GET products by category
//  */
// router.get('/:checkpoint', function (req, res) {

//     var checkpointSlug = req.params.checkpoint;

//     Checkpoint.findOne({slug: checkpointSlug}, function (err, c) {
//         Product.find({category: checkpointSlug}, function (err, products) {
//             if (err)
//                 console.log(err);

//             res.render('cat_products', {
//                 title: c.title,
//                 products: products
//             });
//         });
//     });

// });

// /*
//  * GET product details
//  */
// router.get('/:category/:product', function (req, res) {

//     var galleryImages = null;
//     var loggedIn = (req.isAuthenticated()) ? true : false;

//     Product.findOne({slug: req.params.product}, function (err, product) {
//         if (err) {
//             console.log(err);
//         } else {
//             var galleryDir = 'public/product_images/' + product._id + '/gallery';

//             fs.readdir(galleryDir, function (err, files) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     galleryImages = files;

//                     res.render('product', {
//                         title: product.title,
//                         p: product,
//                         galleryImages: galleryImages,
//                         loggedIn: loggedIn
//                     });
//                 }
//             });
//         }
//     });

// });

// Exports
module.exports = router;