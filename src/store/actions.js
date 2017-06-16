/**
 ACTION TYPES WITH REDUCERS
 * SET_SEARCH_TERM
 * SET_SUGGESTIONS
 * SET_LOADING
 * REMOVE_LOADING
 * ADD_TO_LIST
 * REMOVE_FROM_LIST
 * SET_PLAYLIST
 **/

import 'redux';
import store from '../store';
import requestAPI from '../helpers/requestAPI';
let searchTimeout;

export const search = (term, type = 'people') => {
  return (dispatch) => {
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
    searchTimeout = setTimeout(()=> {
      const currentTerm = term;
      const currentType = type;
      dispatch({
        type: 'SET_LOADING'
      });

      return requestAPI('http://swapi.co/api/' + currentType, {
        search: currentTerm,
        format: 'json'
      }).then(response => {
        let results = response.results.map(result => {
          result.type = currentType;
          result.id = result.url.replace(/^http:\/\/swapi.co\/api\/|\/$/, '').replace(/\/$/, '').replace(/\//g, '_');
          return result;
        });

        // Make sure the fetched results actually is for the current term
        if (currentTerm === term) {
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

export const setItemList = (list) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_LIST',
      list
    });
  };
}

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
}

export const removeItem = (item) => {
  return (dispatch) => {
    dispatch({
      type: 'REMOVE_FROM_LIST',
      item
    });
  };
}
