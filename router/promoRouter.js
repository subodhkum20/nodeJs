const express=require('express');
const bodyParser=require('body-parser');
const promoRouter=express.Router();
promoRouter.use(bodyParser.json())

promoRouter.route('/').all((req,res,next)=>{
res.statusCode=200;
res.setHeader('content-type','text/plain');
    next();
})
.get((req,res,next)=>{
res.end('getting all the promotions');
})
.post((req,res,next)=>{
res.end(`adding the promotion ${req.body.name} with details ${req.body.description}`);

})
.put((req,res,next)=>{
res.statusCode=403
res.end('put method not supported on /promotions');
})
.delete((req,res,next)=>{
res.end('deleting all the promotions');
});

promoRouter.route('/:promoId').all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('content-type','text/plain');
        next();
    })
.get((req,res,next)=>{
res.end(`getting the promotion : ${req.params.promoId}`);
})
.post((req,res,next)=>{
res.statusCode=403;
res.end(`post method not supported on /promotions/${req.params.promoId}`);
    
})
.put((req,res,next)=>{
res.end('updating the promotion:'+req.params.promoId +
`\n with name: ${req.body.name} and details: ${req.body.description}`);
})
.delete((req,res,next)=>{
res.end(`deleting the promotion : ${req.params.promoId}`);
});
module.exports=promoRouter;