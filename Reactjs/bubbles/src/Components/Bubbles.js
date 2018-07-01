import React, { Component } from 'react';
import Bubble from './Bubble';

class Bubbles extends Component {

    render() {
        let bubbleColxn;
        if (this.props) {
            bubbleColxn = this.props.bubblecollection.map((b,i) => {
                return (
                    <Bubble key={i}></Bubble>
                );
            });
        }

        
        return (
            <div>{bubbleColxn}</div>
        );
    }
}

export default Bubbles;
