const express = require('express');
const uuid = require('uuid');
const app = express();
const port = process.env.PORT || 5000;
const async = require('async');

var redis = require('redis');

app.get('/api/projects', (req, res) => {
    var client = redis.createClient();

    client.on('connect', function () {
        console.log('api/projects....connected to redis server');
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
                    console.log(results);
                    res.json({ data: results });
                });
            }
        });
    });
});

//TODO: make this a PUT and read the new project out of the body and post that object to redis
app.get("/api/addproject", (req, res) => {
    console.log("Inside addProject handler.")
    var client = redis.createClient();

    client.on('connect', function () {
        console.log('connected to redis server');
        client.set("Sudan1", "1Kinshasa", function (err, reply) {
            console.log("Err: " + err);
            console.log("reply: " + reply);
            res.send({ status: reply });
        });
        
    });
});

app.listen(port, () => console.log('Listening on port ${port}'));