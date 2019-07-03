const express = require('express');
const bodyParser = require('body-parser');
const leaderRouter = express.Router();

/**
 * initialize the body parser to be used.
 */
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    next()
})
.get((req, res) => {
    res.end('Will send all the leaders to you!')
})
.post((req, res, next) => {
    if (typeof req.body.name !== "undefined" && typeof req.body.description !== "undefined") {
        res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
    }
    else {
        res.end("POST method for leaders require name & description, please submit the appropirate data. (Also verify MIME TYPE is application/json)");
    }
})
.put((req,res,next) => {
    res.statusCode = 403//403 significa que não é suportado
    res.end('PUT operation not supported on Leaders')
})
.delete((req, res) => {
    res.end('Deleting all the leaders!')
})

leaderRouter.route('/:leaderId')
.get((req, res) => {
    res.end('Will send the details of the leader: '+ req.params.leaderId)
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
})
.put((req, res, next) => {
    if (typeof req.body.name !== "undefined" && typeof req.body.description !== "undefined"){
        res.write("Updating the leader: " + req.params.leaderId );
        res.end(' Will update the leader: ' + req.body.name + ' with details: ' + req.body.description);
    } else {
        res.end("POST method for leaders/"+ req.params.leaderId +
            " requires name & description, please submit the appropirate data."+
            "Also verify MIME TYPE is application/json"
        );
    }
})
.delete((req, res) => {
    res.end('Deleting leader: ' + req.params.leaderId);
})

module.exports = leaderRouter;


