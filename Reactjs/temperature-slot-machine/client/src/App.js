import React, { Component } from 'react';
import StockChart from './components/stockChart'
import './App.css';

class App extends Component {
  static defaultState = {
    stockSymbol: '',
    stockData: { "history": [{ price: "", date: "" }] },
    djiData: { "history": [{ price: "", date: "" }] },
    dowJonesData: [],
    dataIsReady: false,
    selectedDate: {
      height: 0,
      price: 0
    },

  };

  onNewBarHighlighted(h) {
    this.setState({
      selectedDate: {
        height: h.barHeight,
        price: h.price
      }
    });
  }

  constructor() {
    super();
    this.state = App.defaultState;
    this.onNewBarHighlighted = this.onNewBarHighlighted.bind(this);
  }

  callApi = async (symbol) => {
    const response = await fetch(`/api/stockHistory?ticker=${symbol}`);
    let body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return Object.assign({ symbol }, body);
  };

  fetchStock(evt) {
    this.callApi(this.state.stockSymbol)
      .then(res => {
        this.setState({
          dataIsReady: true,
          stockData: res[res.symbol],
          djiData: res["dji"]
        });
      });
    evt.preventDefault();
  }

  onTickerInputChange(evt) {
    this.setState({ stockSymbol: evt.target.value });
  }

  render() {
    return (<div className="App">
      <header>
        <h2>stock chart {this.props.stockSymbol}</h2>
        <form onSubmit={this.fetchStock.bind(this)}>
          <input type="text" value={this.state.stockSymbol} onChange={this.onTickerInputChange.bind(this)} />
          <input type="submit" value="go" />
        </form>
      </header>
      <StockChart dataIsReady={this.state.dataIsReady} stockTimeSeries={this.state.stockData.history}
        djiData={this.state.djiData.history} stockSymbol={this.state.stockSymbol} highlightchange={this.onNewBarHighlighted}
        selectedDate={this.state.selectedDate} />
    </div>
    );
  }
}

export default App;
