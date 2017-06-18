import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item from '../Item';
import './index.css';

class ItemList extends Component {
  constructor (props) {
    super(props);
    this.renderList = this.renderList.bind(this);
  }

  renderList (items) {
    return items.length ? (
      <ul className='ItemList-list'>
        {items.map(item => (
          <li className='ItemList-item' key={item.id}>
            <Item data={item} removeItem={this.props.removeItem} />
          </li>)
        )}
      </ul>
    ) : null;
  }

  render () {
    return (
      <div className='ItemList'>
        {this.renderList(this.props.itemList)}
      </div>
    );
  }
}

ItemList.propTypes = {
  itemList: PropTypes.array.isRequired
};

export default ItemList;
