var express = require('express');
const axios = require('axios');
var router = express.Router();


router.get('/',
    (req, res) => {
        let symbol = req.query.ticker;
        axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=JCU82Z1QCELR9FD1`)
        .then((response) => {
            let timeSeries = response.data["Time Series (Daily)"];
            retVal = Object.keys(timeSeries)
                .map(key => {
                    return { date: key, price: timeSeries[key]["4. close"] };
                });
                res.send(retVal);
        }).catch((err)=> {
            console.log("Error found");
            console.log(err);
            res.send(retVal);
        });
    });

module.exports = router;