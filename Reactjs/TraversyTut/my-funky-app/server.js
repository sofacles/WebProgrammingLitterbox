const express = require('express');
const uuid = require('uuid');
const app = express();
const port = process.env.PORT || 5000;

var redis = require('redis');

app.get('/api/hello', (req, res) => {

    var client = redis.createClient();

    client.on('connect', function () {
        console.log('api.Hello....connected to redis server');
        client.get("Sudan1", function (err, reply) {
            console.log("Err: " + err);
            console.log("reply: " + reply);
            res.send({
                projects: [
                    {
                        id: uuid.v4(),
                        title: "balance a tree",
                        category: "data structures and algorithms"
                    },
                    {
                        id: uuid.v4(),
                        title: "paint upstairs window",
                        category: "home maintenance"
                    },
                    {
                        id: uuid.v4(),
                        title: "write a sorting algorithm",
                        category: "data structures and algorithms"
                    },
                    {
                        id: uuid.v4(),
                        title: "learn ES6",
                        category: "porfessional development"
                    },
                    {
                        id: uuid.v4(),
                        title: reply,
                        category: "from redis"
                    }
                ]
            });
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