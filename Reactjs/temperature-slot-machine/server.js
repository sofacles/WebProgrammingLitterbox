const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000;
const yearDistance = 10;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/highTemps',
  (req, res) => {
    let day = req.query.day,
      month = req.query.month,
      year = new Date().getFullYear() - 1,
      secondLatest = year - yearDistance,
      earliest = year - (2 * yearDistance);

    let latestMaxTemp = getOneDay(day, month, year);
    let secondlatestMaxTemp;
    try {
      secondlatestMaxTemp = getOneDay(day, month, secondLatest);
    } catch (ex) {
      console.log(ex);
    }

    var earliestMaxTemp = getOneDay(day, month, earliest);

    Promise.all([latestMaxTemp, secondlatestMaxTemp, earliestMaxTemp])
      .then((results) => {
        let retVal = {};
        retVal["" + year] = results[0];
        retVal["" + secondLatest] = results[1];
        retVal["" + earliest] = results[2];
        res.send(JSON.stringify(retVal));
      });

  });


const getOneDay = (day, month, year) => {
  return new Promise(async function (resolve, reject) {
    let max, response, dailyTemperatureData;

    try {
      response = await axios.get(`https://api.darksky.net/forecast/09daa545d6a07ff5a9146c940c601b0c/55.0013,-115.0021?time=${year}-${month}-${day}T12:00:00&exclude=currently,hourly`);
      dailyTemperatureData = response.data;
      var timedTemperatureReadings = dailyTemperatureData.daily.data;
      max = timedTemperatureReadings.sort(function (x, y) {
        return x.temperatureHigh < y.temperatureHigh
      }
      )[0].temperatureHigh;

      resolve(Object.assign({ date: { year: year, month: month, day: day } }, dailyTemperatureData));
    } catch (error) {
      console.dir(error);
      reject(error);
    }
  });
};

app.listen(port, () => console.log(`Listening on port ${port}`));