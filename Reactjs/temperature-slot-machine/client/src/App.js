import React, { Component } from 'react';
import StockChart from './components/stockChart'
import './App.css';

class App extends Component {
  static defaultState = {
    response: '',
    stockSymbol: '',
    stockData: [{ price: "", date: "" }],
    dowJonesData: []
  };

  constructor() {
    super();
    this.state = App.defaultState;
  }

  callApi = async (symbol) => {
    const response = await fetch(`/api/stockHistory?ticker=${symbol}`);
    let body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body[symbol];
  };

  fetchStock(evt) {
    let stockSymbol = evt.target.value;
    var result = this.callApi(this.state.stockSymbol)
      .then(res => {
        this.setState({ stockData: res });
      });
    evt.preventDefault();
  }

  onTickerInputChange(evt) {
    this.setState({ stockSymbol: evt.target.value });
  }

  render() {
    return (<div className="App">
      <form onSubmit={this.fetchStock.bind(this)}>
        <input type="text" value={this.state.stockSymbol} onChange={this.onTickerInputChange.bind(this)} />
        <input type="submit" value="go" />
      </form>
      <StockChart time-series={this.state.stockData} />
      {this.state.stockData[0].price}
    </div>
    );
  }
}

export default App;
