import React, { Component } from 'react';

class Bubble extends Component {
    
    constructor() {
        super();
        this.state = {
            start: null,
            change: 0,
            elem: null,
            color: "#0000ff"
        };
    }

   
    mouseover(evt) {
        this.setState({ elem: evt.target });
        window.requestAnimationFrame(this.step.bind(this));
    }

    step(timestamp) {
        const maxColor = 255;
      
        var progress = timestamp - this.state.start;
        var change = this.state.change;
        //want to go from 256 to zero in 1000 msec, well 1024, to make the math convenient.
        change += (Math.min(progress / 4, 2));
        var blu = Math.floor(maxColor - change);
        var red = maxColor - blu;
        //this.state.elem.style.fill = '#' + red.toString(16) + '00' + blu.toString(16);
        this.setState({
            start: this.state.start || timestamp,
            color: '#' + red.toString(16) + '00' + blu.toString(16),
            change: change
        });
        if (change <= maxColor) {
            window.requestAnimationFrame(this.step.bind(this));
        }
        else {
            console.log("Not requesting any more animation frames");
        }
    }
  render() {
    return (
        <svg version="1.1" width="48" height="40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" onMouseOver={this.mouseover.bind(this)} style={{ fill: this.state.color}} />
        </svg>
    );
  }
}

export default Bubble;
