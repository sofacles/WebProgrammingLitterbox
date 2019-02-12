// I started on this file because I was trying to learn about streams.  I wanted to practice piping the results
// to other endpoints and doing some transforming. Which I know now is called a "transforming stream".
// My problem is that I am not really streaming objects, see https://www.bennadel.com/blog/2663-node-js-transform-streams-vs-through2-streams.htm.
// I'm sending string representations of objects, without square brackets and without commas between the items.
// My second problem is that if I'm preparing for my new Hulu job, then I don't really need to 
// working with streams here.  I should just be POSTing objects and transforming them into other objects
// in series.

// But, just to not leave broken crap lying around 
//

var express = require('express');
var router = express.Router();
let fs = require('fs');

console.log(`Using process: ${process.pid}`);

router.get('/',
    async (req, res) => {
        var s = fs.createReadStream('objects.txt');
        s.on("error", (err) => {
            console.log('Error while reading file.', err);
            res.send("{ status: 'error' }");
        })
        s.pipe(res);
    });

module.exports = router;
