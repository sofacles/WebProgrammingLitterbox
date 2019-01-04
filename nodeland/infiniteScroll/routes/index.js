var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


var fakeData = [   [{ name : "apple"},{ name : "andesite"},{ name : "ardor"},{ name : "armor"},{ name : "actress"},{ name : "alpaca"},{ name : "Antwerp"},{ name : "ambiguous"},{ name : "alteration"},{ name : "acrimony"}],
                   [{ name : "bonobo"},{ name : "baker"},{ name : "banana"},{ name : "bun"},{ name : "borage"},{ name : "Bend"},{ name : "balloon"},{ name : "bottle"},{ name : "brake"},{ name : "break"}],  
                   [{ name : "camber"},{ name : "cause"},{ name : "cayman"},{ name : "cereal"},{ name : "center"},{ name : "crow"},{ name : "crane"},{ name : "cone"},{ name : "core"},{ name : "cure"}],  
                   [{ name : "day"},{ name : "denizen"},{ name : "derilect"},{ name : "detain"},{ name : "detract"},{ name : "dorsal"},{ name : "Dortmund"},{ name : "dory"},{ name : "doting"},{ name : "doyen"}],
                   [{ name : "ebb"},{ name : "echo"},{ name : "ectomorph"},{ name : "Ediacaran"},{ name : "eel"},{ name : "effect"},{ name : "ego"},{ name : "elbow"},{ name : "empty"},{ name : "end"}],  
                 
];

router.get('/data', function(req, res, next) {
  if(!req.query.index){
    res.json(JSON.stringify(fakeData[req.query.index]));
  }
  res.json(JSON.stringify(fakeData[req.query.index]));
});


module.exports = router;
