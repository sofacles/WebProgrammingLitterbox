var express = require('express');
var Request = require("request");
const bodyParser = require('body-parser');
const axios = require('axios');
var router = express.Router();
const app = express();
//am I using port?
const port = process.env.PORT || 5000;
//Am I using bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var fakeData = [[{ name: "apple" }, { name: "andesite" }, { name: "ardor" }, { name: "armor" }, { name: "actress" }, { name: "alpaca" }, { name: "Antwerp" }, { name: "ambiguous" }, { name: "alteration" }, { name: "acrimony" }],
[{ name: "bonobo" }, { name: "baker" }, { name: "banana" }, { name: "bun" }, { name: "borage" }, { name: "Bend" }, { name: "balloon" }, { name: "bottle" }, { name: "brake" }, { name: "break" }],
[{ name: "camber" }, { name: "cause" }, { name: "cayman" }, { name: "cereal" }, { name: "center" }, { name: "crow" }, { name: "crane" }, { name: "cone" }, { name: "core" }, { name: "cure" }],
[{ name: "day" }, { name: "denizen" }, { name: "derilect" }, { name: "detain" }, { name: "detract" }, { name: "dorsal" }, { name: "Dortmund" }, { name: "dory" }, { name: "doting" }, { name: "doyen" }],
[{ name: "ebb" }, { name: "echo" }, { name: "ectomorph" }, { name: "Ediacaran" }, { name: "eel" }, { name: "effect" }, { name: "ego" }, { name: "elbow" }, { name: "empty" }, { name: "end" }],
[{ name: "farthing" }, { name: "facile" }, { name: "farm" }, { name: "fen" }, { name: "fern" }, { name: "fester" }, { name: "frog" }, { name: "foundation" }, { name: "fur" }, { name: "Freiburg" }],
];

const roll_n_SidedDie = (n) => { return Math.floor(Math.random() * n) }

let fakeName = () => {
    return fakeData[roll_n_SidedDie(6)][roll_n_SidedDie(10)].name
};

router.get('/',
    async (req, res) => {
        let transformedResponse = [];
        var someObjects = [];
        for (var i = 0; i < 10; i++) {
            var someName = fakeName();
            if (typeof someName !== "string" || !someName.length) {
                console.log(`WFT ${someName}`);
            }
            var obj = {
                name: someName,
                price: `\$${(Math.random() * 50).toFixed(2)}`,
                assets: [4.25, 1.73]
            }

            someObjects.push(obj);
        }
        console.log(`*** about to write to the response stream`);
        try {
            response = await axios.post(`http://localhost:8124`, someObjects);
            transformedResponse = response.data;

        } catch (error) {
            console.log("******error*******")
            console.log(error)
            transformedResponse.push({ Error: `${error}` })
        }

        //you have to send something like a string, can't just parse the array and send that.
        res.send(transformedResponse);
    });

module.exports = router;