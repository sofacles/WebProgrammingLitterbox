var express = require('express');



var app = express();
//app.use(express.static('public'));
app.get("/", function (req, res) {
    res.send("Hey There!");
});


app.listen(4000);
console.log('Running test server at localhost:4000/graphql');

//following https://graphql.org/graphql-js/graphql-clients/

//see https://itnext.io/hosting-multiple-apps-on-the-same-server-implement-a-reverse-proxy-with-node-a4e213497345