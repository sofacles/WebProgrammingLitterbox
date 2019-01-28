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

module.exports = router;