import React, { Component } from 'react';
import StockChart from './components/stockChart'
import './App.css';

class App extends Component {
  static defaultState = {
    stockSymbol: '',
    stockData: { "history": [{ price: "", date: "" }] },
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
    this.callApi(this.state.stockSymbol)
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
      <StockChart timeSeries={this.state.stockData.history} stockSymbol={this.state.stockSymbol} />
    </div>
    );
  }
}

export default App;
