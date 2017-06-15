import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchField from '../SearchField';
import SuggestList from '../SuggestList';

class SearchForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      searchTerm: this.props.searchTerm || '',
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
    const searchTerm = event.target.value;

    this.setState({
      searchTerm
    });

    this.props.searchCharacters(searchTerm);
  }

  onSubmit (event) {
    event.preventDefault();
    this.props.addCharacter(this.state.activeObj);
  }

  onClick (event) {}
  onKeyup (event) {
    switch (event.keyCode) {
      case 40: // Down
        this.changeActiveResult(1);
        break;
      case 38: // Up
        this.changeActiveResult(-1);
        break;
      case 13: // Escape
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
      <form className='FormField' onSubmit={this.onSubmit}>
        <SearchField onKeyup={this.onKeyup} searchTerm={this.state.searchTerm} onChange={this.onChange} />
        <SuggestList onClick={this.onClick} activeResult={this.state.activeObj} searchTerm={this.state.searchTerm} results={this.props.suggestions} />
      </form>
    );
  }
}

SearchForm.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  suggestions: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  searchCharacters: PropTypes.func.isRequired,
  addCharacter: PropTypes.func.isRequired
};

export default SearchForm;
