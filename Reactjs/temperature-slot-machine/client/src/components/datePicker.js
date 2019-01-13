import React from "react";
import '../App.css'

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
       this.setState({ day: evt.target.value});
    }

    onMonthChange(evt){
        this.setState({ month: parseInt(evt.target.value) + 1});
       
    } 

    handleSubmit(evt){
        this.props.onchange(this.state);
        evt.preventDefault();
    }

    render() {
        let monthOptions = DatePicker.Months.map(function(item, index){
            return <option value={index} key={'foo'+ index}>{item}</option>;
        });

        return ( <div className='date-picker'>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <span><input type="text"  value={this.state.day} onChange={this.onDateChange.bind(this)} /></span>
                        <select onChange={this.onMonthChange.bind(this)}>
                            {monthOptions}
                        </select>
                        <input type="submit" value="update" />
                    </form>
                </div> );
    } 
}

export default DatePicker;
