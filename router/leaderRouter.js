const express=require('express');
const bodyParser=require('body-parser');
const leaderRouter=express.Router();
leaderRouter.use(bodyParser.json())

leaderRouter.route('/').all((req,res,next)=>{
res.statusCode=200;
res.setHeader('content-type','text/plain');
    next();
})
.get((req,res,next)=>{
res.end('getting all the leaders');
})
.post((req,res,next)=>{
res.end(`adding the leader ${req.body.name} with details ${req.body.description}`);

})
.put((req,res,next)=>{
res.statusCode=403
res.end('put method not supported on /leaders');
})
.delete((req,res,next)=>{
res.end('deleting all the leaders');
});

leaderRouter.route('/:leaderId').all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('content-type','text/plain');
        next();
    })
.get((req,res,next)=>{
res.end(`getting the leader : ${req.params.leaderId}`);
})
.post((req,res,next)=>{
res.statusCode=403;
res.end(`post method not supported on /leaders/${req.params.leaderId}`);
    
})
.put((req,res,next)=>{
res.end('updating the leader:'+req.params.leaderId +
`\n with name: ${req.body.name} and details: ${req.body.description}`);
})
.delete((req,res,next)=>{
res.end(`deleting the leader : ${req.params.leaderId}`);
});
module.exports=leaderRouter;