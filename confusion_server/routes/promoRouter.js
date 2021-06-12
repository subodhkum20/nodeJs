const express=require('express');
const bodyParser=require('body-parser');
const promotions = require('../models/promotionSchema');
const promoRouter=express.Router();
promoRouter.use(bodyParser.json())

promoRouter.route('/').get((req, res, next) => {
    promotions.find({})
        .then((promotions) => {
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(promotions);
        }, (err) => next(err)).catch((err) => next(err))
})
.post((req, res, next) => {
    promotions.create(req.body).then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(promotions);
    }, (err) => next(err)).catch((err) => next(err))

})
.put((req, res, next) => {
    res.statusCode = 403
    res.end('put method not supported on /promotions');
})
.delete((req, res, next) => {
    promotions.deleteMany({}).then((result) => {
        console.log(result);
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(result);
    }, (err) => next(err)).catch((err) => next(err))
});

promoRouter.route('/:promotionId').get((req, res, next) => {
    promotions.findById(req.params.promotionId).then((promotion) => {
        console.log(promotion);
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(promotion);
    }, (err) => next(err)).catch((err) => next(err))
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(`post method not supported on /promotions/${req.params.promotionId}`);

})
.put((req, res, next) => {
    promotions.findByIdAndUpdate(req.params.promotionId, {
        $set: req.body
    }, { new: true }).then((promotion) => {
        console.log(promotion);
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(promotion);
    }, (err) => next(err)).catch((err) => next(err))
})
.delete((req, res, next) => {
    promotions.findByIdAndDelete(req.params.promotionId).then((result) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(result);
    }, (err) => next(err))
        .catch((err) => next(err))
})
module.exports=promoRouter;