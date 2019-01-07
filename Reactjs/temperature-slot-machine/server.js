const express = require('express');
const bodyParser = require('body-parser');
const Request = require('request');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/highTemps', 
(req, res) => {
    Request.get("https://api.darksky.net/forecast/09daa545d6a07ff5a9146c940c601b0c/55.0013,-115.0021?time=1955-7-27T12:00:00&exclude=currently,hourly", 
        (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        var dailyTemperatureData = JSON.parse(body);
        var timedTemperatureReadings =  dailyTemperatureData.daily.data;
        var max = timedTemperatureReadings.sort(function (x, y) { 
          return x.temperatureHigh < y.temperatureHigh
        }
        )[0]
        .temperatureHigh;

        res.send(JSON.stringify({maxTemp : max }));
    });
});
   

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));