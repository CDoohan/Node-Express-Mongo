const express = require('express');
const bodyParser = require('body-parser');
const dishRouter = express.Router();

/**
 * initialize the body parser to be used.
 */
dishRouter.use(bodyParser.json());

// all() é usado para que todas as chamadas para /dishes
// possua seu statusCode como 200 e setHeader() como o exemplo abaixo
// quando outros métodos forem chamados para /dishes
// tudo que esta dentro de .all() será feito, então o next()
// fará com que o método específico seja executado após o all()

dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    next()
})
.get((req, res) => {
    res.end('Will send all the dishes to you!')
})
.post((req,res,next) => {
    if (typeof req.body.name !== "undefined" && typeof req.body.description !== "undefined")
        res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
    else
        res.end("post method for dishes require name & description, please submit the appropirate data. (Also verify MIME TYPE)", );
})
.put((req,res,next) => {
    res.statusCode = 403//403 significa que não é suportado
    res.end('PUT operation not supported on Dishes')
})
.delete((req, res) => {
    res.end('Deleting all the dishes!')
})

dishRouter.route('/:dishId')
.get((req, res) => {
    res.end('Will send the details of the dish: '+ req.params.dishId)
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId);
})
.put((req,res,next) => {
    if (typeof req.body.name !== "undefined" && typeof req.body.description !== "undefined"){
        res.write("Updating the dish: " + req.params.dishId );
        res.end(' Will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
    } else {
        res.end("POST method for dishes/"+ req.params.dishId +
            " requires name & description, please submit the appropirate data."+
            "Also verify MIME TYPE is application/json"
        );
    }
})
.delete((req, res) => {
    res.end('Deleting dish: ' + req.params.dishId);
})

module.exports = dishRouter;


