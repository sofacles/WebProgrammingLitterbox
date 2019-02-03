import React from "react";


class StockPrice extends React.Component {
    render() {
        let style = {
            right: "-20px",
            top: `${285 - this.props.selectedBarHeight}px`

        };
        return (<div style={style} className="sp">{this.props.price}</div>);
    }
}

export default StockPrice;