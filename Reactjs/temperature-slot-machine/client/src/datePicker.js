import React from "react";
import './App.css'

console.log("inside datePicker");
class DatePicker extends React.Component {

    constructor(props) {
        super(props);
        
        var today = new Date();
        this.state = { 
            month: DatePicker.Months[today.getMonth()],
            day: today.getDate(),
        };
    }

    static Months = ["January", "February", "March", "April", "May", "June",
                     "July", "August", "September", "October", "November", "December"];

    onDateChange(evt){
        this.state.day = evt.target.value;
        this.props.onchange(this.state);
    }

    onMonthChange(evt){
        this.state.month = evt.target.value;
        this.props.onchange(this.state);
    }

    render() {
        return ( <div className='date-picker'>
                    <span><input type="text"  value={this.state.day} onChange={this.onDateChange.bind(this)} /></span>
                    <span><input type="text" value={this.state.month} onChange={this.onMonthChange.bind(this)} /></span>
                </div> );
    } 
}

export default DatePicker;
