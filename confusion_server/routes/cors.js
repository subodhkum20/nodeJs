const express = require('express');
const cors = require('cors');
const app = express();

const whitelist =['https://localhost:3443','http://localhost:3000'];

const corsOptionsDelegate = (req,callback)=>{
    var corOptions
    if(whitelist.indexOf(req.header('origin')!==-1)){
        corOptions = {origin:true}
    }
    else{
        corOptions = {origin:false}
    }
    callback(null, corOptions);
}

exports.cors=cors();
exports.corsWithOptions=cors(corsOptionsDelegate);