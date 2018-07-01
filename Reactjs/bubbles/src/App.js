import React, { Component } from 'react';
import Bubbles from './Components/Bubbles';

class App extends Component {
    constructor() {
        super();
       
        
        this.state = {
            dots: [],
            someInts: []
        };
    }

    componentWillMount() {
        var localInts = [],
            bubbleCount = 400;

        for (var i = 0; i < bubbleCount; i++) {
            localInts.push({
                index: i,
                key: i
            });
        }
        this.setState({ dots: localInts });

    }
  render() {
    return (
      <div className="App">
            <Bubbles bubblecollection={this.state.dots}></Bubbles>
      </div>
    );
  }
}

export default App;
