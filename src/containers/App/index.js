import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchForm from '../../components/SearchForm';
import MyCharacters from '../../components/MyCharacters';
import StarWars from '../../components/StarWars';
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
        return 'Choose a charcter from Star Wars please';
      case 1:
        return 'Good, and now an other character as well';
      case 2:
        return 'Exelent choice, now pick an vehicle';
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
    const car1 = this.props.itemList[2]
    return [
      `Here comes ${char1.name} tjolahopp tjolahej tjolahoppsan-sa.`,
      `Here comes ${char1.name}, yes here comes actually me.`,
      '',
      `Have you seen my ${char2.species.name}? My pretty little ${char2.species.name}.`,
      `Have you seen ${char2.name}? Because that is ${genderString} name.`,
      `Have you seen my home world? My ${char1.homeworld.name} home world?.`,
      `Would you like to know, why my home world has that name?`,
      '',
      `Because there lives ${char1.name} tjolahopp tjolahej tjolahoppsan-sa,`,
      `There lives ${char1.name}, I actually live there.`,
      '',
      `It is not bad, I have ${char2.species.name} ${car1.name} and ${char1.homeworld.name},`,
      `A bag full of intergalactic gold can also come in handy.`,
      '',
      `Come now every rebel, every jedi that I know of,`,
      `Lets go blast a Death Star, Tjolahej tjolahoppsan-sa`,
      '',
      `Here comes ${char1.name}, tjolahopp tjolahej tjolahoppsan-sa`,
      `Here comes ${char1.name}, yes, here comes actually me.`];
  }

  render () {
    return (
      <div className='App'>

        {
          this.props.itemList.length < 3 ?
            (<section className='App-quiz'>
              <header className="App-header">
                <h1 className='App-title'>STAR WARS</h1>
                <h2 className='App-subTitle'>Mad libs</h2>
              </header>
              <div className='App-content'>
                <MyCharacters {...this.props} />
                <SearchForm label={this.labelText()} searchType={this.props.itemList.length < 2 ? 'people' : 'vehicles'} {...this.props} />
              </div>
            </section>) :
            (<StarWars content={this.renderContent()} />)
        }
      </div>
    );
  }
};

App.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  suggestions: PropTypes.array.isRequired,
  itemList: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  search: PropTypes.func.isRequired
};

export default connector(App);
