var express = require('express');
var router = express.Router();
let fs = require('fs');
let MongoDriver = require('./../mongoDriver.js');

console.log(`Using process: ${process.pid}`);

router.get('/',
     (req, res) => {
        let md = new MongoDriver();
        var stuff = md.getAll();
        res.send(stuff);
    });

module.exports = router;
