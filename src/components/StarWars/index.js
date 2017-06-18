import React, { Component } from 'react';
import getRandomInt from '../../helpers/getRandomInt';
import './index.css';

class StarWars extends Component {
  starStyle () {
    return {
      left: `${getRandomInt(0, window.innerWidth)}px`,
      top: `${getRandomInt(0, window.innerHeight)}px`,
      animationDelay: `-${getRandomInt(0, 5)}s`,
      transform: `scale(${getRandomInt(50, 250) / 100}`,
      opacity: getRandomInt(1, 10) / 10
    };
  }

  render () {
    return (
      <div className='StarWars'>
        <div className='StarWars-sky'>
          {[...Array(Math.floor(window.innerWidth / 5))].map((x, i) =>
            <span key={i} style={this.starStyle()} className='StarWars-star' />
          )}
        </div>
        <div className='StarWars-wrapper'>
          <div className='StarWars-content' onAnimationEnd={this.props.stop}>
            {this.props.content.map((paragraph, index) => (<p key={index}>{paragraph}</p>))}
          </div>
        </div>
      </div>
    );
  }
}
export default StarWars;
