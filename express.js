const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser=require('body-parser');
const hostname = 'localhost';
const port = 80;
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname+ '/public'))
app.all('/dishes',(req,res,next)=>{
    res.statusCode=200;
    res.setHeader('content-type','text/plain');
    next();
})
app.get('/dishes',(req,res,next)=>{
    res.end('getting all the dishes');
})
app.post('/dishes',(req,res,next)=>{
    res.end('getting all the dishes '+req.body.name +'with details ' +req.body.description);
    
})
app.put('/dishes',(req,res,next)=>{
    res.statusCode=403
    res.end('put method not supported on /dishes');
})
app.delete('/dishes',(req,res,next)=>{
    res.end('deleting all the dishes');
})
app.get('/dishes/:dishId',(req,res,next)=>{
    res.end('getting the dish :' + req.params.dishId);
})
app.post('/dishes/:dishId',(req,res,next)=>{
    res.statusCode=403;
    res.end('post method not supported on /dishes/'+req.params.dishId);
    
})
app.put('/dishes/:dishId',(req,res,next)=>{
    res.end('updating the dish:'+req.params.dishId +
    `with name: ${req.body.name} and details: ${req.body.description}`);
})
app.delete('/dishes/:dishId',(req,res,next)=>{
    res.end('deleting the dish :'+ req.params.dishId);
})
let server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`the server is running at http://${hostname}:${port}`)
})