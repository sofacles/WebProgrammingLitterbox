import React from "react";
import DowJonesLine from "./dowJonesLine"

class StockChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dowJonesSeries: [],
            barWidth: 7,
            mouseX: -1,
            mouseY: -1
        }
    }
    // If you wanted to set or update your state based on new prop values, you used to do that in ComponentWillReceiveProps.
    // The new way is with the static getDerivedStateFromProps, where you can't touch "this", but some magic applies the returned 
    // value to your local state. https://hackernoon.com/replacing-componentwillreceiveprops-with-getderivedstatefromprops-c3956f7ce607
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.djiData !== prevState.dowJonesSeries) {
            return { dowJonesSeries: nextProps.djiData };
        }
        return null;
    }

    mousemove(evt) {
        if (this.props.dataIsReady && this.props.stockTimeSeries.length) {
            var stockChartEl = evt.target;
            // evt.nativeEvent.offsetX gives you x relative to the stockChart div and sometimes relative to one of the bars
            // I wish there was a way of locking the mousemove handler to the stock chart itself, but it is capturing and bubbling
            // like regular browser events, but for now, enjoy my hack.
            if (this.refs.stockChart === evt.target) {
                this.setState({
                    mouseX: evt.nativeEvent.offsetX,
                    mouseY: evt.nativeEvent.offsetY
                });
            } else if (evt.target.className == "bar") {
                var offsetX = evt.clientX - this.refs.stockChart.parentElement.offsetLeft - this.refs.stockChart.offsetLeft;

                this.setState({
                    mouseX: offsetX,
                    mouseY: evt.clientY - this.refs.stockChart.offsetY
                });
            }
            console.log(`X is ${this.state.mouseX}`);
        }
    }
    render() {
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

            //figure out which bar is closest to the mouse
            let mouseX = this.state.mouseX,
                activeBarIndex = mouseX > 0 ? (Math.floor(mouseX / this.state.barWidth)) : -1;

            let bars = ts.map(function (stockDay, index, ts) {
                let penniesAboveMinPrice = (stockDay.price * 100) - this.lowestStockPrice;
                let barHeight = (penniesAboveMinPrice * graphHeight / this.spreadInPennies) + "px";
                let style = {
                    height: `${barHeight}`,
                    border: `${index === activeBarIndex ? "1px solid lime" : "none"}`
                };
                return (<div className="bar" key={stockDay.date} style={style} title={parseFloat(stockDay.price).toFixed(2)}></ div>);
            }, this);

            return (<div className="chart-container">
                <div className="centered">
                    <DowJonesLine data={this.state.dowJonesSeries} barWidth={this.state.barWidth} />
                    <div className="stock-chart" onMouseMove={this.mousemove.bind(this)} ref="stockChart">
                        {bars}
                    </div>

                </div>
            </div>);
            //<StockPrice show={this.props.dataIsReady} yVal={this.state.x} />
        }

    }
}

export default StockChart;