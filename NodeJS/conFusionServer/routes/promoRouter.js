const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const promoRouter = express.Router();

const Promotions = require('../models/promotions');
const authenticate = require('../authenticate');

/**
 * initialize the body parser to be used.
 */
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.options( cors.corsWithOptions, (req,res) => { res.sendStatus(200) } )
.get( cors.cors, (req, res) => {
    Promotions.find({})
        .then((promos) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promos);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.post( cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    Promotions.create(req.body)
        .then((promo) => {
            console.log('Promotion Created', promo);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
        }, err => next(err))
        .catch( (err) => next(err))
})
.put( cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    res.statusCode = 403//403 significa que não é suportado
    res.end('PUT operation not supported on Promotions')
})
.delete( cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    Promotions.remove({})
        .then((response) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        }, err => next(err))
        .catch( err => next(err))
})

promoRouter.route('/:promoId')
.options( cors.corsWithOptions, (req,res) => { res.sendStatus(200) } )
.get( cors.cors, (req, res) => {
    Promotions.findById(req.params.promoId)
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, err => next(err))
    .catch( err => next(err))
})
.post( cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/'+ req.params.promoId);
})
.put( cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, { new : true })
        .then( promo => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
        }, err => next(err))
        .catch( err => next(err))
})
.delete( cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    Promotions.findByIdAndRemove(req.params.promoId)
        .then( promo => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
        }, err => next(err))
        .catch( err => next(err))
})

module.exports = promoRouter;


