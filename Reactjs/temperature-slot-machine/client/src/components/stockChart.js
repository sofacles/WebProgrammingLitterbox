import React from "react";
import { inherits } from "util";

class StockChart extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let bars = [];
        if (this.props) {
            console.log("there are props available in the render methdod");
            Object.keys(this.props["time-series"]).map(key => {
                debugger;
                if (this.props["time-series"][key].price) {
                    return <div>this.state.timeSeries[key].price</div>;
                }
            });
        } else {
            console.log("there are no props available in the render methdod");
        }
        return (<div>
            <h2>stock chart</h2>
            {bars}
        </div>);
    }
}

export default StockChart;