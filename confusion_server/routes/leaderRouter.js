const express = require('express');
const bodyParser = require('body-parser');
const leaders = require('../models/leaderSchema');
const authenticate=require('../authenticate')
const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json())

leaderRouter.route('/')
    .get((req, res, next) => {
        leaders.find({})
            .then((leaders) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(leaders);
            }, (err) => next(err)).catch((err) => next(err))
    })
    .post(authenticate.verifyUser,(req, res, next) => {
        leaders.create(req.body).then((leaders) => {
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(leaders);
        }, (err) => next(err)).catch((err) => next(err))

    })
    .put(authenticate.verifyUser,(req, res, next) => {
        res.statusCode = 403
        res.end('put method not supported on /leaders');
    })
    .delete(authenticate.verifyUser,(req, res, next) => {
        leaders.deleteMany({}).then((result) => {
            console.log(result);
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(result);
        }, (err) => next(err)).catch((err) => next(err))
    });

leaderRouter.route('/:leaderId')
    .get((req, res, next) => {
        leaders.findById(req.params.leaderId).then((leader) => {
            console.log(leader);
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(leader);
        }, (err) => next(err)).catch((err) => next(err))
    })
    .post(authenticate.verifyUser,(req, res, next) => {
        res.statusCode = 403;
        res.end(`post method not supported on /leaders/${req.params.leaderId}`);

    })
    .put(authenticate.verifyUser,(req, res, next) => {
        leaders.findByIdAndUpdate(req.params.leaderId, {
            $set: req.body
        }, { new: true }).then((leader) => {
            console.log(leader);
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(leader);
        }, (err) => next(err)).catch((err) => next(err))
    })
    .delete(authenticate.verifyUser,(req, res, next) => {
        leaders.findByIdAndDelete(req.params.leaderId).then((result) => {
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(result);
        }, (err) => next(err))
            .catch((err) => next(err))
    })

module.exports = leaderRouter;