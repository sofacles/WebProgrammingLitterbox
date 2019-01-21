const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/stockHistory',
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
      let poop = 8;
      resolve(Object.assign({ ticker: symbol }, { history: retVal }));
    } catch (error) {
      console.dir(error);
      reject(error);
    }
  });
};

app.listen(port, () => console.log(`Listening on port ${port}`));