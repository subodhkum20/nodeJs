const express=require('express');
const bodyParser=require('body-parser');
const router=express.Router();
router.use(bodyParser.json())

router.route('/').all((req,res,next)=>{
res.statusCode=200;
res.setHeader('content-type','text/plain');
    next();
})
.get((req,res,next)=>{
res.end('getting all the dishes');
})
.post((req,res,next)=>{
res.end('getting all the dishes '+req.body.name +'with details ' +req.body.description);

})
.put((req,res,next)=>{
res.statusCode=403
res.end('put method not supported on /dishes');
})
.delete((req,res,next)=>{
res.end('deleting all the dishes');
});

router.route('/').all((req,res,next)=>{
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
module.exports=router;