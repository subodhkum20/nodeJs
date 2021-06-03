const express = require('express');
const http = require('http');
const app = express();
const hostname = 'localhost';
const port = 80;
app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('content-type', 'text/html');
    res.end(`<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>index.html</title>
    </head>
    
    <body>
        <h1>this is index.html</h1>
    </body>
    
    </html>`)
})
let server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`the server is running at http://${hostname}:${port}`)
})