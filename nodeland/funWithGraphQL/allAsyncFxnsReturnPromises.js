var axios = require("axios");

async function foo(symbol){
    response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=JCU82Z1QCELR9FD1`);
    return response; 
} 

foo('cwgix').then((res) => {
    console.log(res)
}).catch((err) => console.log(err));