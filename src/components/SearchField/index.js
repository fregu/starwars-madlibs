import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import guid from '../../helpers/guid';
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
    const id = guid('search');
    const className = classNames(
      'SearchField',
      {'is-loading': this.props.isLoading}
    );

    return (
      <div className={className}>
        <label className='SearchField-label' htmlFor={id} aria-live='assertive'>{this.props.label}</label>
        <div className='SearchField-inputWrapper'>
          <input className='SearchField-input' id={id} placeholder={this.props.placeholder} autoFocus autoComplete='off' type='search' onKeyUp={this.props.onKeyup} onChange={this.props.onChange} value={this.state.value} />
          <div className='SearchField-LoaderBox'>
            <div className='SearchField-LoaderBoxTop' />
            <div className='SearchField-LoaderBoxBottom' />
            <div className='SearchField-LoaderBoxLeft' />
            <div className='SearchField-LoaderBoxRight' />
          </div>
        </div>
      </div>
    );
  }
}

SearchField.propTypes = {
  searchTerm: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  isLoading: PropTypes.bool,
  onKeyup: PropTypes.func,
  onChange: PropTypes.func
};

export default SearchField;
