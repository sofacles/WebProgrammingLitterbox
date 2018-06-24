const uuid = require('uuid');
const redis = require('redis');


function redisFiller() {
    console.log("Inside redisFiller.")
    var client = redis.createClient();

    client.on('connect', function () {
        console.log('connected to redis server');

        console.log('flushing all databases');

        client.flushall(function (err, succeeded) {
            if (err) {
                console.log(err);
            } else if (succeeded) {
                console.log("looks like flushAll succeeded.")
                console.log(succeeded);
            } else {
                console.log("flushAll neither failed nor succeeded?")
            }
        });

        client.hmset(uuid.v4(), {
            "title": "balance a tree",
            "category": "data structures and algorithms"
        }, function (err, reply) {
            if (err) {
                console.log("Err: " + err);
            }
            console.log("reply: " + reply);
            });

        client.hmset(uuid.v4(), {
            "title": "paint upstairs window",
            "category": "home maintenance"
        }, function (err, reply) {
            if (err) {
                console.log("Err: " + err);
            }
            console.log("reply: " + reply);
            });

        client.hmset(uuid.v4(), {
            "title": "write a sorting algorithm",
            "category": "data structures and algorithms"
        }, function (err, reply) {
            if (err) {
                console.log("Err: " + err);
            }
            console.log("reply: " + reply);
            });

        client.hmset(uuid.v4(), {
            "title": "learn ES6",
            "category": "porfessional development"
        }, function (err, reply) {
            if (err) {
                console.log("Err: " + err);
            }
            console.log("reply: " + reply);
        });

    });
};

redisFiller();