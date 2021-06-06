const mongoClient = require('mongodb').MongoClient;
const http = require('http');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const express=require('express');
// const json = require('json');
const path = require('path');
const assert = require('assert');
const homeRouter = require('./routes/homeRouter');
const url='mongodb://localhost:27017/';
mongoClient.connect(url,{ useUnifiedTopology: true},(err,client) => {
    assert.equal(err,null);
    const db=client.db('items');
    const user=db.collection('items');
    user.insertOne({
        "name": "subodh",
        "subject": "javascript"
    },(err,result) => {
        console.log(`insert one;${result.ops}`);
    })

})

const port=3000;
const hostname= 'localhost';
// app.use=server;
const app = express();
const server= http.createServer(app);
app.use('/home',homeRouter);

server.listen(port, hostname)