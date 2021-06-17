const express = require('express');
const bodyParser = require('body-parser');
const Dishes = require('../models/dishSchema');
// const e = require('express');
const DishRouter = express.Router();

DishRouter.use(bodyParser.json())
DishRouter.use(bodyParser.urlencoded({ extended: false }));

DishRouter.route('/')
    .get((req, res, next) => {
        Dishes.find({})
            .then((Dishes) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(Dishes);
            }, (err) => next(err)).catch((err) => next(err))
    })
    .post((req, res, next) => {
        Dishes.create(req.body).then((Dish) => {
            console.log(Dish);
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(Dish);
        }, (err) => next(err)).catch((err) => next(err))

    })
    .put((req, res, next) => {
        res.statusCode = 403
        res.end('put method not supported on /Dishes');
    })
    .delete((req, res, next) => {
        Dishes.deleteMany({}).then((result) => {
            console.log(result);
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(result);
        }, (err) => next(err)).catch((err) => next(err))
    });

DishRouter.route('/:DishId')
    .get((req, res, next) => {
        Dishes.findById(req.params.DishId).then((Dish) => {
            console.log(Dish);
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(Dish);
        }, (err) => next(err)).catch((err) => next(err))
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end(`post method not supported on /Dishes/${req.params.DishId}`);

    })
    .put((req, res, next) => {
        Dishes.findByIdAndUpdate(req.params.DishId, req.body).then((Dish) => {
            console.log(Dish);
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(Dish);
        }, (err) => next(err)).catch((err) => next(err))
    })
    .delete((req, res, next) => {
        Dishes.findByIdAndDelete(req.params.DishId).then((result) => {
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(result);
        }, (err) => next(err))
            .catch((err) => next(err))
    })
DishRouter.route('/:DishId/:comments')
    .get((req, res, next) => {
        Dishes.findById(req.params.DishId)
            .then((Dish) => {
                if (Dish != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-type', 'application/json');
                    res.json(Dish.comments);
                }
                else {
                    err = new Error('Dish ' + req.params.DishId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .post((req, res, next) => {
        Dishes.findById(req.params.DishId)
            .then((Dish) => {
                if (Dish != null && req.body.author != null && req.body.comment != null && req.body.rating != null) {
                    Dish.comments.push(req.body);
                    Dish.save().then((Dish) => {

                        res.statusCode = 200;
                        res.setHeader('Content-type', 'application/json');
                        res.json(Dish);
                    })
                }
                else if (Dish != null) {
                    res.end(`comments author,rating,comment field can't be empty`)
                }
                else {
                    err = new Error('Dish ' + req.params.DishId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err)).catch((err) => next(err))

    })
    .put((req, res, next) => {
        res.statusCode = 403
        res.end(`put method not supported on /Dishes/${req.params.DishId}/comments`);
    })
    .delete((req, res, next) => {
        Dishes.findById(req.params.DishId).then((Dish) => {
            if (Dish != null) {
                // Dish.comments.forEach((comment) => {
                //     Dish.comments.id(comment._id).remove()
                // })
                for (var i = (Dish.comments.length - 1); i >= 0; i--) {
                    Dish.comments.id(Dish.comments[i]._id).remove();
                }
                Dish.save().then((Dish) => {

                    res.statusCode = 200;
                    res.setHeader('Content-type', 'application/json');
                    res.json(Dish);
                })
            }
            else {
                err = new Error('Dish ' + req.params.DishId + ' not found');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err)).catch((err) => next(err))
    });

DishRouter.route('/:DishId/:comments/:commentId')
    .get((req, res, next) => {
        Dishes.findById(req.params.DishId)
            .then((Dish) => {
                if (Dish != null && Dish.comments.id(req.params.commentId) != null) {

                    res.statusCode = 200;
                    res.setHeader('Content-type', 'application/json');
                    res.json(Dish.comments.id(req.params.commentId));

                }
                else if (Dish != null && Dish.comments.id(req.params.commentId) == null) {
                    err = new Error('Dish ' + req.params.DishId + `/comments/${req.params.commentId}` + ' not found');
                    err.status = 404;
                    return next(err);
                }
                else {
                    err = new Error('Dish ' + req.params.DishId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err)).catch((err) => next(err))
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end(`post method not supported on /Dishes/${req.params.DishId}/comments/${req.params.commentId}`);

    })
    .put((req, res, next) => {
        Dishes.findById(req.params.DishId)
            .then((Dish) => {
                if (Dish != null && Dish.comments.id(req.params.commentId) != null) {
                    if (req.body.rating != null) {
                        Dish.comments.id(req.params.commentId).rating = req.body.rating
                        if (req.body.comment != null) {
                            Dish.comments.id(req.params.commentId).comment = req.body.comment
                        };

                        Dish.save().then((Dish) => {

                            res.statusCode = 200;
                            res.setHeader('Content-type', 'application/json');
                            res.json(Dish);
                        })
                    }
                }
                else if (Dish != null && Dish.comments.id(req.params.commentId) == null) {
                    err = new Error('Dish ' + req.params.DishId + `/comments/${req.params.commentId}` + ' not found');
                    err.status = 404;
                    return next(err);
                }
                else {
                    err = new Error('Dish ' + req.params.DishId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err)).catch((err) => next(err))
    })
    .delete((req, res, next) => {
        Dishes.findById(req.params.DishId)
            .then((Dish) => {
                if (Dish != null && Dish.comments.id(req.params.commentId) != null) {
                    Dish.comments.id(req.params.commentId).remove();
                    Dish.save().then((Dish) => {

                        res.statusCode = 200;
                        res.setHeader('Content-type', 'application/json');
                        res.json(Dish);
                    })
                }
                else if (Dish != null && Dish.comments.id(req.params.commentId) == null) {
                    err = new Error('Dish ' + req.params.DishId + `/comments/${req.params.commentId}` + ' not found');
                    err.status = 404;
                    return next(err);
                }
                else {
                    err = new Error('Dish ' + req.params.DishId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err)).catch((err) => next(err))
    })
module.exports = DishRouter;