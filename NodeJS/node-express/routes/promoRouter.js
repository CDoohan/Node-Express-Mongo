const express = require('express');
const bodyParser = require('body-parser');
const PromoRouter = express.Router();

/**
 * initialize the body parser to be used.
 */
PromoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    next()
})
.get((req, res) => {
    res.end('Will send all the promotions to you!')
})
.post((req,res,next) => {
    if (typeof req.body.name !== "undefined" && typeof req.body.description !== "undefined") {
        res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
    }
    else {
        res.end("POST method for promotions require name & description, please submit the appropirate data. (Also verify MIME TYPE is application/json)");
    }
})
.put((req,res,next) => {
    res.statusCode = 403//403 significa que não é suportado
    res.end('PUT operation not supported on Promotions')
})
.delete((req, res) => {
    res.end('Deleting all the promotions!')
})

promoRouter.route('/:promoId')
.get((req, res) => {
    res.end('Will send the details of the promotion: '+ req.params.promoId)
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/'+ req.params.promoId);
})
.put((req,res,next) => {
    if (typeof req.body.name !== "undefined" && typeof req.body.description !== "undefined") {
        res.write("Updating the promotion: " + req.params.promoId );
        res.end(' Will update the promotion: ' + req.body.name + ' with details: ' + req.body.description);
    } 
    else {
        res.end("POST method for promotions/"+ req.params.promoId +
            " requires name & description, please submit the appropirate data."+
            "Also verify MIME TYPE is application/json"
        );
    }
})
.delete((req, res) => {
    res.end('Deleting promotion: ' + req.params.promoId);
})

module.exports = promoRouter;


