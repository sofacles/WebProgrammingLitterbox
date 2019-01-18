import React from "react";

class StockChart extends React.Component {
    render() {
        let ts = this.props["timeSeries"];
        let bars = [];
        let keys = Object.keys(ts);
        for (var key in keys) {
            if (ts[key]) {
                bars.push(<span>{ts[key].price}</span>);
            }
        }

        return (<div className="stock-chart">
            <h2>stock chart</h2>
            {bars}
        </div>);
    }
}

export default StockChart;