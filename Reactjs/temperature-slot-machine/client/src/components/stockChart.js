import React from "react";

class StockChart extends React.Component {
    render() {
        var ts = this.props["timeSeries"];

        if (ts.length > 1) {
            //slice to make a copy so you don't affect the original array
            var sortedFromCheapest = ts.slice(0)
                .sort((left, right) => { return left.price - right.price });
            //prices in cents
            //lowest stock price is intentionally too low to allow the cheapest stock to have a non-zero bar height
            this.lowestStockPrice = sortedFromCheapest[0].price * 80;
            this.highestStockPrice = sortedFromCheapest.slice(-1)[0].price * 100;
            const graphHeight = 200;
            this.spreadInPennies = this.highestStockPrice - this.lowestStockPrice;


            let bars = ts.map(function (stockDay, index, ts) {
                let penniesAboveMinPrice = (stockDay.price * 100) - this.lowestStockPrice;
                let barHeight = (penniesAboveMinPrice * graphHeight / this.spreadInPennies) + "px";
                let style = {
                    height: `${barHeight}`
                };
                return (<div key={stockDay.date} style={style} > {parseFloat(stockDay.price).toFixed(2)}</ div>);
            }, this);


            return (<div>
                <h2>stock chart {this.props.stockSymbol}</h2>
                <div className="stock-chart">
                    {bars}
                </div>
            </div>);
        } else {
            return (<div>Enter stock info</div>);
        }

    }
}

export default StockChart;