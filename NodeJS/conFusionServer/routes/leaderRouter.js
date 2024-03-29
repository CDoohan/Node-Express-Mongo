const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors')
const leaderRouter = express.Router();

const authenticate = require('../authenticate');

const Leaders = require('../models/leaders');

/**
 * initialize the body parser to be used.
 */
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.options( cors.corsWithOptions, (req,res) => { res.sendStatus(200) })
.get( cors.cors, (req, res) => {
    Leaders.find({})
        .then((leaders) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leaders);
        }, (err) => next(err))
    .catch((err) => next(err));
})
.post( cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    Leaders.create(req.body)
        .then((leader) => {
            console.log('Leader Created', leader);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        }, err => next(err))
    .catch( (err) => next(err))
})
.put( cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
    res.statusCode = 403//403 significa que não é suportado
    res.end('PUT operation not supported on Leaders')
})
.delete( cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req, res) => {
    Leaders.remove({})
        .then((response) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        }, err => next(err))
    .catch( err => next(err))
})

leaderRouter.route('/:leaderId')
.options( cors.corsWithOptions, (req,res) => { res.sendStatus(200) })
.get( cors.cors, (req, res) => {
    Leaders.findById(req.params.leaderId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, err => next(err))
    .catch( err => next(err))
})
.post( cors.corsWithOptions, authenticate.verifyUser ,(req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
})
.put( cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
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
.delete( cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req, res) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
        .then( leader => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        }, err => next(err))
    .catch( err => next(err))
})

module.exports = leaderRouter;


