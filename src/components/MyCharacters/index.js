import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Character from '../Character';

class MyCharacters extends Component {
  constructor (props) {
    super(props);
    this.renderList = this.renderList.bind(this);
  }

  onClick(event) {
    console.log(event);
  }

  renderList (characters) {
    return characters.length ? (
      <ul className='MyCharacters-list'>
        {characters.map(character => (
          <Character key={character.id} data={character} removeCharacter={this.props.removeCharacter} />
        ))}
      </ul>
    ) : (<p>Min lista är ännu tom</p>);
  }

  render () {
    return (
      <div className='MyCharacters'>
        {this.renderList(this.props.characterList)}
      </div>
    );
  }
}

MyCharacters.propTypes = {
  characterList: PropTypes.array.isRequired,
  removeCharacter: PropTypes.func.isRequired
}

export default MyCharacters;
