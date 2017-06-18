import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchField from '../SearchField';
import SuggestList from '../SuggestList';
import './index.css';

class SearchForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      results: this.props.suggestions || [],
      activeIndex: 0
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyup = this.onKeyup.bind(this);
    this.changeActiveResult = this.changeActiveResult.bind(this);
  }

  onChange (event) {
    event.preventDefault();
    const searchTerm = event.target.value;

    this.props.search(searchTerm, this.props.searchType);
  }

  onSubmit (event) {
    event.preventDefault();
    this.props.addItem(this.state.activeObj, this.props.searchType);
  }

  onClick (item) {
    this.props.addItem(item, this.props.searchType);
  }

  onKeyup (event) {
    switch (event.keyCode) {
      case 40: // Down
        this.changeActiveResult(1);
        break;
      case 38: // Up
        this.changeActiveResult(-1);
        break;
      default:
    }
  }

  changeActiveResult (direction) {
    const currIndex = this.state.activeObj ? this.props.suggestions.indexOf(this.state.activeObj) : -1;
    const newIndex = currIndex + direction;

    if (newIndex >= this.props.suggestions.length || newIndex < 0) {
      return false;
    }
    const activeObj = this.props.suggestions[newIndex];

    this.setState({
      activeObj
    });
  }

  render () {
    return (
      <form className='SearchForm' onSubmit={this.onSubmit}>
        <SearchField label={this.props.label} placeholder={this.props.placeholder} onKeyup={this.onKeyup} searchTerm={this.props.searchTerm} onChange={this.onChange} isLoading={this.props.isLoading} />
        <SuggestList onClick={this.onClick} activeResult={this.state.activeObj} searchTerm={this.props.searchTerm} results={this.props.suggestions} />
      </form>
    );
  }
}

SearchForm.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  suggestions: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  search: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  searchType: PropTypes.string
};

export default SearchForm;
