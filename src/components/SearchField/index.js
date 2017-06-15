import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchField extends Component {
  render () {
    return (
      <div className='SearchField'>
        <input className='SearchField-input' type='search' onKeyUp={this.props.onKeyup} onChange={this.props.onChange} value={this.props.searchTerm} />
      </div>
    );
  }
}

SearchField.propTypes = {
  searchTerm: PropTypes.string,
  onKeyup: PropTypes.func,
  onChange: PropTypes.func
};

export default SearchField;
