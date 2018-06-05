import React, { Component } from 'react';
import Projects from './Components/Projects';
import './App.css';

class App extends Component {

  constructor(){
    super();

    this.state = {
      projects : [
        { 
          title : "balance a tree",
          category : "data structures and algorithms"
        },
        { 
          title : "mount sash rod",
          category : "home maintenance"
        },
        { 
          title : "write a sorting algorithm",
          category : "data structures and algorithms"
        },
        { 
          title : "learn ES6",
          category : "porfessional development"
        }
      ]
    };
  }

  render() {
    return (
      <div className="App">
         My App
         <Projects projects={this.state.projects} />
      </div>
    );
  }
}

export default App;
