import React from "react";


function StockPrice(props) {

    let style = {
        right: "-20px",
        top: `${285 - props.selectedBarHeight}px`
    }

    return (<div style={style} className="sp">{props.price}</div>);

}

export default StockPrice;