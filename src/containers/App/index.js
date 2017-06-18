import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchForm from '../../components/SearchForm';
import ItemList from '../../components/ItemList';
import StarWars from '../../components/StarWars';
import getRandomInt from '../../helpers/getRandomInt';
import { connector } from '../../store';
import './index.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.labelText = this.labelText.bind(this);
  }

  labelText () {
    switch (this.props.itemList.length) {
      case 0:
        return 'Choose a character from the Star Wars franchise please';
      case 1:
        return 'Good, and now an other character as well';
      case 2:
        return 'Exelent choice, now pick an vehicle';
      default:
        return '';
    }
  }

  placeholderText () {
    const placeholderPeople = [
      'eg. Jar Jar Binks',
      'eg. Ackbar',
      'eg. C-3PO',
      'eg. Anakin Skywalker'
    ];
    const placeholderVehicles = [
      'eg. Sail barge',
      'eg. Vulture Droid',
      'eg. Geonosian starfighter',
      'eg. Armored Assault Tank'
    ];
    switch (this.props.itemList.length) {
      case 0:
      case 1:
        return placeholderPeople[getRandomInt(0, 3)];
      case 2:
        return placeholderVehicles[getRandomInt(0, 3)];
      default:
        return '';
    }
  }

  renderContent () {
    const char1 = this.props.itemList[0];
    const char2 = this.props.itemList[1];
    let genderString;
    switch (char2.gender) {
      case 'male':
        genderString = 'his';
        break;
      case 'female':
        genderString = 'her';
        break;
      default:
        genderString = 'its';
    }
    const car1 = this.props.itemList[2];
    return [
      `Here comes ${char1.name} tjolahopp tjolahej tjolahoppsan-sa.`,
      `Here comes ${char1.name}, yes here I actually come.`,
      '',
      `Have you seen my ${char2.species.name}? My pretty little ${char2.species.name}.`,
      `Have you seen ${char2.name}? Because that is ${genderString} name.`,
      '',
      `Have you seen my home world? My ${char1.homeworld.name} home world?.`,
      `Would you like to know, why my home world has that name?`,
      '',
      `Because there lives ${char1.name} tjolahopp tjolahej tjolahoppsan-sa,`,
      `There lives ${char1.name}, I do actually live there.`,
      '',
      `It is not bad, I have ${char2.species.name}, ${car1.name} and ${char1.homeworld.name},`,
      `A bag full of intergalactic credits can also come in handy.`,
      '',
      `Come now every rebel, every jedi that I know of,`,
      `Lets go blast a Death Star, Tjolahej tjolahoppsan-sa`,
      '',
      `Here comes ${char1.name}, tjolahopp tjolahej tjolahoppsan-sa`,
      `Here comes ${char1.name}, yes here I actually come.`];
  }

  render () {
    return (
      <div className='App'>
        <section className={'App-quiz' + (this.props.isPlaying ? ' App-quiz--fade' : '')}>
          <header className='App-header'>
            <h1 className='App-title'>STAR WARS</h1>
            <h2 className='App-subTitle'>Sing along</h2>
          </header>
          <div className='App-content'>
            <ItemList {...this.props} />
            {this.props.itemList.length > 2 ? null : (<SearchForm label={this.labelText()} placeholder={this.placeholderText()} searchType={this.props.itemList.length < 2 ? 'people' : 'vehicles'} {...this.props} />)}
          </div>
        </section>
        {this.props.itemList.length > 2 && !this.props.isPlaying ? (
          <div className='App-actions'>
            <button className='App-action' autoFocus onClick={this.props.play}>Play</button>
            <button className='App-action' onClick={this.props.reset}>Reset</button>
          </div>) : null}
        {this.props.isPlaying ? (<StarWars content={this.renderContent()} stop={this.props.stop} />) : null}
      </div>
    );
  }
}

App.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  suggestions: PropTypes.array.isRequired,
  itemList: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  search: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
};

export default connector(App);
