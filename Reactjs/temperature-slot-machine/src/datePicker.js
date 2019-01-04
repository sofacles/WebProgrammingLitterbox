'use strict';

import React from "react";

console.log("inside datePicker");
class DatePicker extends React.Component {

    constructor() {
		super();
		this.state = {
			votes: {a: 4}
		};
    }
    
    render() {
        return ( <div>Gross Gerau {this.state.votes.a}</div> );
    } 
}

export default DatePicker;
