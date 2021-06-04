const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser=require('body-parser');
const dishRouter=require('./router/dishRouter')
const promoRouter=require('./router/promoRouter')
const leaderRouter=require('./router/leaderRouter')
const hostname = 'localhost';
const port = 80;
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname+ '/public'))
app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);


let server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`the server is running at http://${hostname}:${port}`)
})