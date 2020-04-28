var express = require('express');
var router = express.Router();

// Get Product model
var Product = require('../models/product');

var Order = require('../models/order');

/*
 * GET add product to cart
 */
router.get('/add/:product', function (req, res) {

    var slug = req.params.product;
    

    Product.findOne({slug: slug}, function (err, p) {
        if (err)
            console.log(err);

        if (typeof req.session.cart == "undefined") {
            req.session.cart = [];
            req.session.cart.push({
                title: slug,
                qty: 1,
                price: parseFloat(p.price).toFixed(2),
                image: '/product_images/' + p._id + '/' + p.image,
                seller: p.seller
            });
        } else {
            var cart = req.session.cart;
            var newItem = true;

            for (var i = 0; i < cart.length; i++) {
                if (cart[i].title == slug) {
                    cart[i].qty++;
                    newItem = false;
                    break;
                }
            }

            if (newItem) {
                cart.push({
                    title: slug,
                    qty: 1,
                    price: parseFloat(p.price).toFixed(2),
                    image: '/product_images/' + p._id + '/' + p.image,
                    seller: p.seller
                });
            }
        }

        console.log(req.session.checkpoint);
        req.flash('success', 'Product added!');
        res.redirect('back');
    });

});

/*
 * GET checkout page
 */
router.get('/checkout', function (req, res) {

    

    if (req.session.cart && req.session.cart.length == 0) {
        delete req.session.cart;
        res.redirect('/cart/checkout');
    } else {
        

        res.render('checkout', {
            title: 'Checkout',
            cart: req.session.cart
        });
    }

});

/*
 * GET update product
 */
router.get('/update/:product', function (req, res) {

    var slug = req.params.product;
    var cart = req.session.cart;
    var action = req.query.action;

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].title == slug) {
            switch (action) {
                case "add":
                    cart[i].qty++;
                    break;
                case "remove":
                    cart[i].qty--;
                    if (cart[i].qty < 1)
                        cart.splice(i, 1);
                    break;
                case "clear":
                    cart.splice(i, 1);
                    if (cart.length == 0)
                        delete req.session.cart;
                    break;
                default:
                    console.log('update problem');
                    break;
            }
            break;
        }
    }

    req.flash('success', 'Cart updated!');
    res.redirect('/cart/checkout');

});

/*
 * GET clear cart
 */
router.get('/clear', function (req, res) {

    delete req.session.cart;
    
    req.flash('success', 'Cart cleared!');
    res.redirect('/cart/checkout');

});

/*
 * GET buy now
 */
router.get('/buynow', function (req, res) {

    delete req.session.cart;
    
    res.sendStatus(200);

});


/*
 * ORDER CONFIRMATION
 */

router.post('/checkout/confirmation', async function (req, res) {

    var count = await Order.countDocuments();
    console.log('Collection number'+count);


    req.checkBody('name', 'Please enter your name').notEmpty();
    req.checkBody('phone1', 'Please enter main phone number').notEmpty();
    req.checkBody('phone2', 'Please enter alternative phone number').notEmpty();
    req.checkBody('add1', 'Address Line must have a value').notEmpty();
    req.checkBody('add2', 'Address Line must have a value').notEmpty();
    req.checkBody('postcode', 'Postcode must have a value').notEmpty();
    req.checkBody('city', 'City must have a value').notEmpty();
    req.checkBody('state', 'State must have a value').notEmpty();
    

    var name = req.body.name;
    var phone1 = req.body.phone1;
    var phone2 = req.body.phone2;
    var add1 = req.body.add1;
    var add2 = req.body.add2;
    var postcode = req.body.postcode;
    var city = req.body.city;
    var state = req.body.state;

    var products = req.session.cart;
    var checkpoint = req.session.checkpoint;
    
    //console.log(req.session.cart);
    //console.log(req.session.checkpoint);
    //nak kene request checkpoint ngan product

    var errors = req.validationErrors();

    if (errors) {
        
            res.render('/location', {
                // errors: errors,
                // title: title,
                // desc: desc,
                // seller:seller,
                // quantity : quantity,
                // checkpoints: checkpoints,
                // price: price
            });
        
    } else {

        var address = add1 + ' ' + add2 + ' '+ postcode + ' ' + city + ' ' + state;
        var newID= count + 1;

                var order = new Order({
                    OrderID: newID,
                    Name: name,
                    address: address,
                    PhoneNum1: phone1,
                    PhoneNum2: phone2,
                    ProductsOrdered : req.session.cart,
                    checkpoint : req.session.checkpoint,
                    
                });
                
                order.save(function (err) {
                    if (err)
                        
                        return console.log(err);

                    
                    
                    req.flash('success', 'Order confirmed');
                    //res.redirect('/products');
                });
                console.log(products);
        res.render('receipt',{
                newID: newID,
                name: name,
                address: address,
                phone1: phone1,
                phone2: phone2,
                products : products,
                checkpoint : checkpoint,

        })

        }
});
    



// Exports
module.exports = router;