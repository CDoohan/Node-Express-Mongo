const express = require('express');
const bodyParser = require('body-parser');
const leaderRouter = express.Router();

const Leaders = require('../models/leaders');

/**
 * initialize the body parser to be used.
 */
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get((req, res) => {
    Leaders.find({})
        .then((leaders) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leaders);
        }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Leaders.create(req.body)
        .then((leader) => {
            console.log('Leader Created', leader);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        }, err => next(err))
    .catch( (err) => next(err))
})
.put((req,res,next) => {
    res.statusCode = 403//403 significa que não é suportado
    res.end('PUT operation not supported on Leaders')
})
.delete((req, res) => {
    Leaders.remove({})
        .then((response) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        }, err => next(err))
    .catch( err => next(err))
})

leaderRouter.route('/:leaderId')
.get((req, res) => {
    Leaders.findById(req.params.leaderId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, err => next(err))
    .catch( err => next(err))
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
})
.put((req, res, next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new : true })
        .then( leader => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        }, err => next(err))
    .catch( err => next(err))
})
.delete((req, res) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
        .then( leader => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        }, err => next(err))
    .catch( err => next(err))
})

module.exports = leaderRouter;


