const http = require('http');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const express = require('express');
// const json = require('json');

// const app = express();
const homeRouter = express.Router();
homeRouter.route('/').all((req, res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/html');
    // res.end(`<html><title>home page</title><body><h1>Home page</h1></body></html>`);
    next();
}).get((req, res, next)=>{
    res.end(`<html><title>home page</title><body><h1>get request on Home page</h1></body></html>`)
}).post((req, res, next)=>{
    res.end(`<html><title>home page</title><body><h1>post request on Home page</h1></body></html>`)
});
module.exports=homeRouter;