const express = require('express');
const uuid = require('uuid');
const app = express();
const bodyParser = require('body-parser');

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

const port = process.env.PORT || 5000;
const async = require('async');

var redis = require('redis');

app.get('/api/projects', (req, res) => {
    var client = redis.createClient();
    client.on('connect', function () {
        //console.log('api/projects....connected to redis server');
        var projects = [];
        client.keys('*', function (err, keys) {
            if (err) return console.log(err);
            if (keys) {
                async.map(keys, function (key, cb) {
                    client.hgetall(key, function (error, value) {
                        if (error) return cb(error);
                        var project = {};
                        project['id'] = key;
                        project['data'] = value;
                        cb(null, project);
                    });
                }, function (error, results) {
                    if (error) return console.log(error);
                    res.json({ data: results });
                });
            }
        });
    });
});

app.post("/api/project", (req, res) => {
    console.log("****Inside addProject handler. : ");
    console.log(req.body);
    var client = redis.createClient();

    client.on('connect', function () {
        console.log('connected to redis server');
        var id = uuid.v4();
        client.hmset(id, req.body, function (err, reply) {
            console.log("Err: " + err);
            console.log("reply: " + reply);
            res.send({
                status: reply,
                newProject: {
                    id: id,
                    title: req.body.title,
                    category: req.body.category
                }
            });
        });
        
    });
});

app.delete("/api/project", (req, res) => {
    var client = redis.createClient();

    client.on('connect', function () {
        console.log('connected to redis server');
        var id = req.body.id;
        client.del(id, function (err, reply) {
            console.log("Err: " + err);
            console.log("reply: " + reply);
            res.send({
                status: reply
            });
        });
    });
});

app.listen(port, () => console.log('Listening on port ${port}'));