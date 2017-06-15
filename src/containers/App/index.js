import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchForm from '../../components/SearchForm';
import MyCharacters from '../../components/MyCharacters';
import { connector } from '../../store';

class App extends Component {
  render () {
    return (
      <div className='App'>
        <SearchForm {...this.props} />
        <MyCharacters {...this.props} />
      </div>
    );
  }
};

App.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  suggestions: PropTypes.array.isRequired,
  characterList: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  searchCharacters: PropTypes.func.isRequired
};

export default connector(App);
