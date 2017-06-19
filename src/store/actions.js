/**
 * Actions include:
 * * search(): updating term, results by making a rest request to http://swapi.co/api
 * * play(): Starts StarWars mode
 * * stop(): Ends StarWars mode
 * * reset(): Reset picked star wars references
 * * setItemList(): Set itemList to something new
 * * addItem(): Add a result to itemList
 */
import 'redux';
import store from '../store';
import requestAPI from '../helpers/requestAPI';
let searchTimeout;

let searchCounter = 0;
export const search = (term, type = 'people') => {
  return (dispatch) => {
    searchCounter += 1;
    dispatch({
      type: 'SET_SEARCH_TERM',
      term
    });

    if (term.length < 1) {
      clearTimeout(searchTimeout);
      dispatch({
        type: 'SET_SUGGESTIONS',
        results: []
      });
      dispatch({
        type: 'REMOVE_LOADING'
      });
      return;
    }

    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const currentTerm = term;
      const currentType = type;
      const currentSearchCount = searchCounter;
      dispatch({
        type: 'SET_LOADING'
      });

      return requestAPI('//swapi.co/api/' + currentType, {
        search: currentTerm,
        format: 'json'
      }).then(response => {
        let results = response.results.map(result => {
          result.type = currentType;
          result.id = result.url.replace(/^http:\/\/swapi.co\/api\/|\/$/, '').replace(/\/$/, '').replace(/\//g, '_');
          return result;
        });

        // Make sure the fetched results actually is for the current term
        if (currentTerm === term && currentSearchCount === searchCounter) {
          dispatch({
            type: 'SET_SUGGESTIONS',
            results
          });

          dispatch({
            type: 'REMOVE_LOADING'
          });
        }
      });
    }, 200);
    // Perform serach and dispatch, update result
  };
};

export const play = () => {
  return (dispatch) => {
    dispatch({
      type: 'START_PLAYING'
    });
  };
};

export const stop = () => {
  return (dispatch) => {
    dispatch({
      type: 'STOP_PLAYING'
    });
  };
};

export const reset = () => {
  return (dispatch) => {
    dispatch({
      type: 'SET_LIST',
      list: []
    });
  };
};

export const setItemList = (list) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_LIST',
      list
    });
  };
};

export const addItem = (item, type = 'people') => {
  return (dispatch) => {
    const inList = store.getState().itemList.filter(storeItem => {
      return storeItem.id === item.id;
    });

    if (inList.length > 0) {
      return false;
    }

    item.type = type;
    dispatch({
      type: 'ADD_TO_LIST',
      item
    });

    // reset search form
    dispatch({
      type: 'SET_SEARCH_TERM',
      term: ''
    });
    dispatch({
      type: 'SET_SUGGESTIONS',
      results: []
    });

    if (type === 'people') {
      requestAPI(item.species[0]).then(result => {
        item.species = result;
        dispatch({
          type: 'UPDATE_ITEM',
          item
        });
      });
      requestAPI(item.homeworld).then(result => {
        item.homeworld = result;
        dispatch({
          type: 'UPDATE_ITEM',
          item
        });
      });
    }
  };
};
