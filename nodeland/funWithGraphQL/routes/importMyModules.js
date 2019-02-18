// Can I import javascript from other files?

var express = require('express');
var router = express.Router();
//let singleExportedFunction = require('../lib/exports1Function');
let mathHelper = require('./../lib/myMathLibrary');

router.get('/',
    async (req, res) => {
        var p = mathHelper.product(3, 5);
        res.send("Trying to import product fxn from another file.  3 x 5 is " + p);
    });

module.exports = router;
