const express = require('express');
const bodyParser = require('body-parser');
const dishRouter = express.Router();
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');

/**
 * initialize the body parser to be used.
 */
dishRouter.use(bodyParser.json());

// all() é usado para que todas as chamadas para /dishes
// possua seu statusCode como 200 e setHeader() como o exemplo abaixo
// quando outros métodos forem chamados para /dishes
// tudo que esta dentro de .all() será feito, então o next()
// fará com que o método específico seja executado após o all()
//
// dishRouter.route('/')
// .all((req,res,next) => {
//     res.statusCode = 200
//     res.setHeader('Content-Type', 'text/plain')
//     next()
// })

dishRouter.route('/')
.get((req, res) => {
    Dishes.find({})
        .then((dishes) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dishes);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.post((req,res,next) => {
    Dishes.create(req.body)
        .then((dish) => {
            console.log('Dish Created', dish);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        }, err => next(err))
        .catch( (err) => next(err))
})
.put((req,res,next) => {
    res.statusCode = 403//403 significa que não é suportado
    res.end('PUT operation not supported on Dishes')
})
.delete((req, res) => {
    Dishes.remove({})
        .then((response) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        }, err => next(err))
        .catch( err => next(err))
})

dishRouter.route('/:dishId')
.get((req, res) => {
    Dishes.findById(req.params.dishId)
        .then((dish) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        }, err => next(err))
        .catch( err => next(err))
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId);
})
// $set it's where the data updated will be contained
.put((req,res,next) => {
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, { new : true })
        .then( dish => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        }, err => next(err))
        .catch( err => next(err))
})
.delete((req, res) => {
    Dishes.findByIdAndRemove(req.params.dishId)
        .then( dish => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        }, err => next(err))
        .catch( err => next(err))
})

module.exports = dishRouter;


