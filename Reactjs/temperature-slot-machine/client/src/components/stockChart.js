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
                return (<div key={stockDay.date} style={style} title={parseFloat(stockDay.price).toFixed(2)}></ div>);
            }, this);

            let svgStyle = {
                stroke: "black",
                strokeWidth: 2
            };

            let svgLine = (<svg class="dji-line" height="320" width="700">
                <line x1="0" y1="0" x2="700" y2="320" style={svgStyle} />
            </svg>);


            return (<div className="chart-container">
                <div className="centered">
                    <div className="stock-chart">
                        {bars}
                    </div>
                    {svgLine}
                </div>
            </div>);
        } else {
            return (<div className="chart-container"></div>);
        }

    }
}

export default StockChart;