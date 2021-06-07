const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const http = require('http');
const express = require('express');
const dboper = require('./operations/opera');
const url = 'mongodb://localhost:27017/';
mongoClient.connect(url).then((client) => {

    console.log('Connected correctly to server');
    const db = client.db('test');

    return dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes")
        .then((result) => {
            console.log("Insert Document:\n", result.ops);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            return dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes");

        })
        .then((result) => {
            console.log("Updated Document:\n", result.result);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Updated Documents:\n", docs);
                            
            return db.dropCollection("dishes");
        })
        .then((result) => {
            console.log("Dropped Collection: ", result);

            return client.close();
        })
        .catch((err) => console.log(err));

})
.catch((err) => console.log(err));
const port = 3000;
const hostname = 'localhost';
// app.use=server;
const app = express();
const server = http.createServer(app);
// app.use('/home',homeRouter);

server.listen(port, hostname)