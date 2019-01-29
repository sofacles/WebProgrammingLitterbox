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

router.get('/',
    (req, res) => {
        let stockSymbol = req.query.ticker;

        let stockData = getStockHistory(stockSymbol);
        let djiData;
        try {
            djiData = getStockHistory("dji");
        } catch (ex) {
            console.log(ex);
        }


        Promise.all([stockData, djiData])
            .then((results) => {
                let retVal = {};

                retVal[stockSymbol] = results[0];
                retVal["dji"] = results[1];
                res.send(JSON.stringify(retVal));
            });

    });

router.get("/p", (req, res) => {
    returnsAPromise(3).then(function (repuesto) {
        res.send("Hey, the promise was responded to and returned " + repuesto.result);
    },
        function (rejecion) {
            res.send("Hey, the promise was rejected and returned " + rejecion);
        })
});

router.get("/mapa", (req, res) => {
    let myMap = new Map();
    let myObj = { id: "387" };
    myMap.set("wa", "washington");
    myMap.set("or", "oregon");
    myMap.set(myObj, { price: 689, name: "Revel" });
    var retVal = myMap.get(myObj).name;
    res.send(retVal);
});

router.get("/set", (req, res) => {
    let mySet = new Set();
    mySet.add("wa");
    mySet.add("or");
    mySet.add({ price: 689, name: "Revel" });
    let retVal = "";
    for (let item of mySet) {
        retVal = typeof item == "string" ? retVal.concat(item, ", ") : retVal.concat(`name: ${item.name}`, ", ")
    }
    res.send(retVal);
});
const getStockHistory = (symbol) => {
    return new Promise(async function (resolve, reject) {
        let max, response, dailyTemperatureData;

        try {
            //JCU82Z1QCELR9FD1
            response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=JCU82Z1QCELR9FD1`);
            let retVal;
            let timeSeries = response.data["Time Series (Daily)"];
            retVal = Object.keys(timeSeries)
                .map(key => {
                    return { date: key, price: timeSeries[key]["4. close"] };
                });
            resolve(Object.assign({ ticker: symbol }, { history: retVal }));
        } catch (error) {
            console.dir(error);
            reject(error);
        }
    });
};

let returnsAPromise = function (number) {
    let thePromise = new Promise(function (resolve, reject) {
        if (number % 2 === 0) {
            setTimeout(resolve({ result: "this worked" }), 10);
        } else {
            reject(new Error("this was rejected"))
        }
    });
    return thePromise;
}

module.exports = router;