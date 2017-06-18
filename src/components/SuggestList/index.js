import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

class SuggestList extends Component {
  constructor (props) {
    super(props);

    this.renderResults = this.renderResults.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.highlightSearchTerm = this.highlightSearchTerm.bind(this);
  }

  highlightSearchTerm(name) {
    const searchTermRegEx = new RegExp(this.props.searchTerm, 'i');

    const match = name.match(searchTermRegEx);
    if (!match) {
      return name;
    }
    const splitArr = [name.substring(0, match.index), match[0], name.substring(match.index + match[0].length)];

    return (
      <span>
        {splitArr.map((part, index) => {
          if (index === 1) {
            return (<em className='SuggestList-termMatch' key='match'>{part}</em>)
          }
          return part
        })}
      </span>
    );
  }

  renderSuggestion (result) {
    const className = 'SuggestList-item' + (this.props.activeResult && this.props.activeResult.id === result.id ? ' is-active': '');

    // Corner case since vehicles searches both model and name.
    const innerText = result.type === 'vehicles' && result.name !== result.model ? `${result.name} - ${result.model}` : result.name;
    return (
      <li className={className} key={`item-${result.id}`} onClick={this.props.onClick.bind(this, result)}>{this.highlightSearchTerm(innerText)}</li>
    );
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
