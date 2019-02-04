import React from "react";

class DowJonesLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = { barWidth: props.barWidth }
    }

    render() {
        if (this.props.data.length) {
            let prices = this.props.data;

            let svgStyle = {
                stroke: "black",
                strokeWidth: 2
            };

            //TODO, put this in a helper fxn
            var sortedFromCheapest = prices.slice(0)
                .sort((left, right) => { return left.price - right.price });
            //prices in cents
            //lowest stock price is intentionally too low to allow the cheapest stock to have a non-zero bar height
            this.lowestStockPrice = sortedFromCheapest[0].price * 0.8;
            this.highestStockPrice = sortedFromCheapest.slice(-1)[0].price;
            const
                graphHeight = 200,
                dayWidth = this.props.barWidth;
            this.spread = Math.floor(this.highestStockPrice - this.lowestStockPrice);
            this.conversionFactor = graphHeight / this.spread;
            this.previousDistanceFromTop = -1;
            this.previousX = 0;

            let lines = prices.map((curr, idx, arr) => {
                let distanceFromTopForCurr = (this.highestStockPrice - curr.price) * this.conversionFactor + (graphHeight / 1.5);
                if (idx === 0) {
                    this.previousDistanceFromTop = distanceFromTopForCurr;
                    return <line x1="0" y1="0" x2="0" y2="0" key={idx + "dji"} />;
                }

                let retVal = <line x1={this.previousX} y1={this.previousDistanceFromTop} x2={this.previousX + dayWidth} y2={distanceFromTopForCurr}
                    style={svgStyle} key={idx + "dji"} />
                this.previousDistanceFromTop = distanceFromTopForCurr;
                this.previousX += dayWidth;
                return retVal;
            }, this);

            return (
                <svg className="dji-line" height="320" width="700">
                    {lines}
                </svg>);
        }
        return (
            <svg className="dji-line" height="320" width="700">
            </svg>);
    }
}

export default DowJonesLine;