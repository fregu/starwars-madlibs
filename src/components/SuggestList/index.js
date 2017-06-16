import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

class SuggestList extends Component {
  constructor (props) {
    super(props);

    this.renderResults = this.renderResults.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
  }

  renderSuggestion (result) {
    let className = 'SuggestList-item' + (this.props.activeResult && this.props.activeResult.id === result.id ? ' is-active': '');
    return (
      <li className={className} key={`item-${result.id}`} onClick={this.props.onClick.bind(this, result)}>{result.name}</li>
    )
  }

  renderResults (results) {
    return results.length && this.props.searchTerm.length ? (
      <ul className='SuggestList-list'>
      {results.map(this.renderSuggestion)}
      </ul>
    ) : null;
  }

  render () {
    return (
      <div className='SuggestList'>
        {this.renderResults(this.props.results)}
      </div>
    );
  }
}
SuggestList.propTypes = {
  results: PropTypes.array,
  searchTerm: PropTypes.string,
  activeResult: PropTypes.object,
  onClick: PropTypes.func
};

export default SuggestList;
