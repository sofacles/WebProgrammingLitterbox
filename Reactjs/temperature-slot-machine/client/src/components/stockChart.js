import React from "react";
import DowJonesLine from "./dowJonesLine"

class StockChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dowJonesSeries: []
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("inside getDerivedStateFromProps");
        if (nextProps.djiData !== prevState.dowJonesSeries) {
            return { dowJonesSeries: nextProps.djiData };
        }
        return null;
    }
    render() {
        debugger;
        if (this.props.dataIsReady === false) {
            return (<div className="chart-container"></div>);
        }

        if (this.props.stockTimeSeries) {
            var ts = this.props.stockTimeSeries;
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

            return (<div className="chart-container">
                <div className="centered">
                    <div className="stock-chart">
                        {bars}
                    </div>
                    <DowJonesLine data={this.state.dowJonesSeries} />
                </div>
            </div>);

        }

    }
}

export default StockChart;