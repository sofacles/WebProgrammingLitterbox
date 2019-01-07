import React from "react";
import './App.css'

console.log("inside datePicker");
class DatePicker extends React.Component {

    constructor() {
        super();
        
        var today = new Date();
        this.state = {
            date: { year: today.getFullYear(),
                    month: DatePicker.Months[today.getMonth()],
                    day: today.getDate(),
                }
        };
    }

    static Months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];

    render() {
        return ( <div className='date-picker'>
                    <span>{this.state.date.month}</span>
                    <span>{this.state.date.day}</span>
                    <span>{this.state.date.year}</span>
                </div> );
    } 
}

export default DatePicker;
