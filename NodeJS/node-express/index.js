const express = require('express')
const http = require('http')
const hostname = "localhost"
const port = "3000"

// Use the morgan for logging the error
const morgan = require('morgan')
// Use body-parser to parse request body content.
const bodyParser = require('body-parser')

// Import all the routes.
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

// initialise the express application
const app = express()

//MIDDLEWARES
app.use(morgan('dev'))
app.use(bodyParser.json())

// Register All the Routes.
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

// tell express where to look static files.
app.use(express.static(__dirname+'/public'))

// If No route Match then send 404 json response.
app.use( (req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end('<html><body><h1>This is an Express Server</h1></body></html>')
})

// Initialise server by passing your app as param.
const server = http.createServer(app)

// Start listing the server by passing the port , hostname & third parameter callback.
server.listen(port, hostname, () => {
    console.log('Server running at http://'+ hostname + ':'+ port);
})