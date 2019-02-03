import React from "react";
import DowJonesLine from "./dowJonesLine"
import StockPrice from "./stockPrice"

class StockChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dowJonesSeries: [],
            barWidth: 7
        };
        this.stockBarHeights = []
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
            let mouseX = -1;
            // evt.nativeEvent.offsetX gives you x relative to the stockChart div and sometimes relative to one of the bars
            // I wish there was a way of locking the mousemove handler to the stock chart itself, but it is capturing and bubbling
            // like regular browser events, but for now, enjoy my hack.
            if (this.refs.stockChart === evt.target) {
                mouseX = evt.nativeEvent.offsetX;
            } else if (evt.target.className === "bar") {
                mouseX = evt.clientX - this.refs.stockChart.parentElement.offsetLeft - this.refs.stockChart.offsetLeft;
            }
            let activeBarIndex = Math.floor(mouseX / this.state.barWidth);
            activeBarIndex = activeBarIndex > 0 ? activeBarIndex : 0;
            activeBarIndex = activeBarIndex >= this.props.stockTimeSeries.length ? this.props.stockTimeSeries.length - 1 : activeBarIndex;
            this.setState({
                activeBarIndex: activeBarIndex
            });

            this.props.highlightchange({ barHeight: this.stockBarHeights[activeBarIndex], price: parseFloat(this.props.stockTimeSeries[activeBarIndex].price).toFixed(2) })
        }
    }

    render() {
        if (this.props.dataIsReady === false) {
            return (<div className="chart-container"></div>);
        }

        if (this.props.stockTimeSeries) {
            var ts = this.props.stockTimeSeries;
            this.stockBarHeights = [];
            //slice to make a copy so you don't affect the original array
            var sortedFromCheapest = ts.slice(0)
                .sort((left, right) => { return left.price - right.price });
            //prices in cents
            //lowest stock price is intentionally too low to allow the cheapest stock to have a non-zero bar height
            this.lowestStockPrice = sortedFromCheapest[0].price * 80;
            this.highestStockPrice = sortedFromCheapest.slice(-1)[0].price * 100;
            const graphHeight = 200;
            this.spreadInPennies = this.highestStockPrice - this.lowestStockPrice;
            let activeBarIndex = this.state.activeBarIndex;

            let bars = ts.map(function (stockDay, index, ts) {
                let penniesAboveMinPrice = (stockDay.price * 100) - this.lowestStockPrice;
                this.stockBarHeights[index] = (penniesAboveMinPrice * graphHeight / this.spreadInPennies);
                let barHeight = this.stockBarHeights[index] + "px";
                let borderStyle = "none";
                if (activeBarIndex === index) {
                    borderStyle = "1px solid lime";
                }

                let style = {
                    height: `${barHeight}`,
                    border: `${borderStyle}`
                };
                return (<div className="bar" key={stockDay.date} style={style} title={parseFloat(stockDay.price).toFixed(2)}></ div>);
            }, this);

            return (<div className="chart-container">
                <div className="centered">
                    <DowJonesLine data={this.state.dowJonesSeries} barWidth={this.state.barWidth} />
                    <div className="stock-chart" onMouseMove={this.mousemove.bind(this)} ref="stockChart">
                        {bars}
                    </div>
                    <StockPrice show={this.props.dataIsReady} selectedBarHeight={this.props.heightOfSelectedBar} price={this.props.selectedPrice} />
                </div>
            </div>);

        }

    }
}

export default StockChart;