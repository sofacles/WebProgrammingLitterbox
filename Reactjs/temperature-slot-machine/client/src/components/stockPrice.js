import React from "react";


function StockPrice({ show, selectedDate: { height, price } }) {

    let style = show ? {
        right: "-20px",
        top: `${285 - height}px`
    } : {
            display: "none"
        };

    return (<div style={style} className="sp">{price}</div>);

}

export default StockPrice;