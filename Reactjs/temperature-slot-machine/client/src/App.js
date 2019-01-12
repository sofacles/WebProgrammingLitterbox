import React, { Component } from 'react';
import DatePicker from './components/datePicker'
import './App.css';

class App extends Component {
  defaultState = {
    response: '',
    date: {
      day: 13,
      month: "June"
    },
  };

  constructor() {
    super();
    this.state = this.defaultState;
  }
  
  callApi = async () => {
    const response = await fetch('/api/highTemps');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  onDateChange(date) {
    this.setState({ date : date});
    // this.callApi()
    //   .then(res => this.setState({ response: "Max Temp is " + res.maxTemp }))
    //   .catch(err => console.log(err));
  }

  render() {
    return (  <div className="App">
                <DatePicker onchange={this.onDateChange.bind(this)}/>
                Out here in App.js, the date is {this.state.date.month} {this.state.date.day}.
              </div>
        );
  }
}

export default App;
