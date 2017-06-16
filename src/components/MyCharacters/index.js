import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Character from '../Character';
import Vehicle from '../Vehicle';

class MyCharacters extends Component {
  constructor (props) {
    super(props);
    this.renderList = this.renderList.bind(this);
  }

  onClick(event) {
    console.log(event);
  }

  renderList (items) {
    return items.length ? (
      <ul className='MyCharacters-list'>
        {items.map(item => {
          if (item.type === 'people') {
            return (<Character key={item.id} data={item} removeItem={this.props.removeItem} />);
          } else if (item.type === 'starships' || item.type === 'vehicles') {
            return (<Vehicle key={item.id} data={item} removeItem={this.props.removeItem} />);
          } else {
            return null;
          }
        })}
      </ul>
    ) : null;
  }

  render () {
    return (
      <div className='MyCharacters'>
        {this.renderList(this.props.itemList)}
      </div>
    );
  }
}

MyCharacters.propTypes = {
  itemList: PropTypes.array.isRequired,
  removeItem: PropTypes.func.isRequired
}

export default MyCharacters;
