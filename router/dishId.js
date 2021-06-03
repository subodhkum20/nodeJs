const express=require('express');
const bodyParser=require('body-parser');
const morgan=require('morgan');
const Idrouter=express.Router();
Idrouter.use(morgan('dev'));
// Idrouter.use(bodyParser.json());
Idrouter.use(bodyParser.json());
Idrouter.route('/:dishId').all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('content-type','text/plain');
        next();
    })
.get((req,res,next)=>{
res.end('getting the dish :' + req.params.dishId);
})
.post((req,res,next)=>{
res.statusCode=403;
res.end('post method not supported on /dishes/'+req.params.dishId);
    
})
.put((req,res,next)=>{
res.end('updating the dish:'+req.params.dishId +
`with name: ${req.body.name} and details: ${req.body.description}`);
})
.delete((req,res,next)=>{
res.end('deleting the dish :'+ req.params.dishId);
});
module.exports=Idrouter;