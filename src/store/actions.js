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
import requestAPI from '../helpers/requestAPI';
let searchTimeout;

export const searchCharacters = (term) => {
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
      dispatch({
        type: 'SET_LOADING'
      });

      return requestAPI('http://swapi.co/api/people', {
        search: term,
        format: 'json'
      }).then(response => {
        let results = response.results.map(result => {
         result.id = result.url.replace(/^http:\/\/swapi.co\/api\/|\/$/, '').replace(/\//g, '_');
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

export const setCharacterList = (list) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_LIST',
      list
    });
  };
}

export const addCharacter = (item) => {
  return (dispatch) => {
    dispatch({
      type: 'ADD_TO_LIST',
      item
    });
  };
}

export const removeCharacter = (item) => {
  return (dispatch) => {
    dispatch({
      type: 'REMOVE_FROM_LIST',
      item
    });
  };
}
