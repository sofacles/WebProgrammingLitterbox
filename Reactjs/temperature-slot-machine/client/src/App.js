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

  callApi = async (month, day) => {
    const response = await fetch(`/api/highTemps?month=${month}&day=${day}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  onDateChange(date) {
    this.setState({ date: date });
    this.callApi(date.month, date.day)
      .then(res => {
        var diagnostic = { 2018: {}, 2008: {}, 1998: {} };
        diagnostic["2018"].readings = res["2018"].daily.data.map((obj => obj.temperatureHigh));
        diagnostic["2008"].readings = res["2008"].daily.data.map((obj => obj.temperatureHigh));
        diagnostic["1998"].readings = res["1998"].daily.data.map((obj => obj.temperatureHigh));

        this.setState({ response: JSON.stringify(diagnostic) });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (<div className="App">
      <DatePicker onchange={this.onDateChange.bind(this)} />
      {this.state.response}
    </div>
    );
  }
}

export default App;
