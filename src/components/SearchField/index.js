import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

class SearchField extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: this.props.searchTerm || ''
    };
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.searchTerm !== this.state.value) {
      this.setState({
        value: nextProps.searchTerm
      });
    }
  }

  render () {
    return (
      <div className='SearchField'>
        <label className="SearchField-label" htmlFor="searchInput">{this.props.label}</label>
        <input className='SearchField-input' id="searchInput" autoComplete='off' type='search' onKeyUp={this.props.onKeyup} onChange={this.props.onChange} value={this.state.value} />
      </div>
    );
  }
}

SearchField.propTypes = {
  searchTerm: PropTypes.string,
  label: PropTypes.string,
  onKeyup: PropTypes.func,
  onChange: PropTypes.func
};

export default SearchField;
