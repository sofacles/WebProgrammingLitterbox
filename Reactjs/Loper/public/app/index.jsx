import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  render () {
    return <div className='container'>
    		<p> Hello React!</p>
    		</div>;
  }
}

render(<App/>, document.getElementById('app'));