import React, { Component } from 'react';
import './index.css';

class StarWars extends Component {
  render () {
    return (
      <div className='StarWars'>
        <div className='StarWars-content'>
          {this.props.content.map((paragraph, index) => (<p key={index}>{paragraph}</p>))}
        </div>
      </div>
    );
  }
}
export default StarWars;
