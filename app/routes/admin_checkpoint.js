var express = require('express');
var router = express.Router();
//var auth = require('../config/auth');
//var isAdmin = auth.isAdmin;

// Get Checkpoint model
var Checkpoint = require('../models/checkpoints');

/*
 * GET Checkpoint index
 */
router.get('/', function (req, res) {
    
    Checkpoint.find(function (err, checkpoints) {
        if (err)
            return console.log(err);
        res.render('admin/checkpoints', {
            Checkpoints: checkpoints
        });
    });
});

/*
 * GET add checkpoint
 */
router.get('/add-checkpoint', function (req, res) {

    var title = "";

    res.render('admin/add_checkpoint', {
        title: title
    });

});

/*
 * POST add checkpoints
 */
router.post('/add-checkpoint', function (req, res) {

    req.checkBody('title', 'Title must have a value.').notEmpty();

    var title = req.body.title;
    var slug = title.replace(/\s+/g, '-').toLowerCase();

    var errors = req.validationErrors();

    if (errors) {
        res.render('admin/add_checkpoint', {
            errors: errors,
            title: title
        });
    } else {
        Checkpoint.findOne({slug: slug}, function (err, checkpoint) {
            if (checkpoint) {
                req.flash('danger', 'Checkpoint title exists, choose another.');
                res.render('admin/add_checkpoint', {
                    title: title
                });
            } else {
                var checkpoint = new Checkpoint({
                    title: title,
                    slug: slug
                });

                checkpoint.save(function (err) {
                    if (err)
                        return console.log(err);

                    Checkpoint.find(function (err, Checkpoint) {
                        if (err) {
                            console.log(err);
                        } else {
                            req.app.locals.checkpoint = Checkpoint;
                        }
                    });

                    req.flash('success', 'Checkpoint added!');
                    res.redirect('/admin/checkpoints' );
                });
            }
        });
    }

});

/*
 * GET edit checkpoint
 */
router.get('/edit-checkpoint/:id', function (req, res) {

    Checkpoint.findById(req.params.id, function (err, checkpoint) {
        if (err)
            return console.log(err);

        res.render('admin/edit_checkpoint', {
            title: checkpoint.title,
            id: checkpoint._id
        });
    });

});

/*
 * POST edit checkpoint
 */
router.post('/edit-checkpoint/:id', function (req, res) {

    req.checkBody('title', 'Title must have a value.').notEmpty();

    var title = req.body.title;
    var slug = title.replace(/\s+/g, '-').toLowerCase();
    var id = req.params.id;

    var errors = req.validationErrors();

    if (errors) {
        res.render('admin/edit_checkpoint', {
            errors: errors,
            title: title,
            id: id
        });
    } else {
        Checkpoint.findOne({slug: slug, _id: {'$ne': id}}, function (err, checkpoint) {
            if (checkpoint) {
                req.flash('danger', 'Checkpoint title exists, choose another.');
                res.render('admin/edit_checkpoint', {
                    title: title,
                    id: id
                });
            } else {
                Checkpoint.findById(id, function (err, checkpoint) {
                    if (err)
                        return console.log(err);

                    checkpoint.title = title;
                    checkpoint.slug = slug;

                    checkpoint.save(function (err) {
                        if (err)
                            return console.log(err);

                        Checkpoint.find(function (err, checkpoints) {
                            if (err) {
                                console.log(err);
                            } else {
                                req.app.locals.checkpoints = checkpoint;
                            }
                        });

                        req.flash('success', 'Checkpoint edited!');
                        res.redirect('/admin/checkpoints/edit-checkpoint/'+ id);
                    });

                });


            }
        });
    }

});

/*
 * GET delete checkpoint
 */
router.get('/delete-checkpoint/:id', function (req, res) {
    Checkpoint.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            return console.log(err);

        Checkpoint.find(function (err, checkpoints) {
            if (err) {
                console.log(err);
            } else {
                req.app.locals.checkpoints = checkpoints;
            }
        });

        req.flash('success', 'Checkpoint deleted!');
        res.redirect('/admin/checkpoints/');
    });
});


// Exports
module.exports = router;