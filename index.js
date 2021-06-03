const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser=require('body-parser');
const router=require('./router/dishRouter')
const hostname = 'localhost';
const port = 80;
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname+ '/public'))
app.use('/dishes',router);


let server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`the server is running at http://${hostname}:${port}`)
})