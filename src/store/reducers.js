import { combineReducers } from 'redux';

const searchTermReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return action.term;
    default:
      return state;
  }
};

const autocompleteReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SUGGESTIONS':
      return action.results;
    default:
      return state;
  }
};

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return true;
    case 'REMOVE_LOADING':
      return false;
    default:
      return state;
  }
};

const characterListReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_LIST':
      const inList = state.filter(item => {
        return item.id === action.item.id;
      });

      if (inList.length > 0) {
        return state;
      }

      action.item.timestamp = new Date();
      return [...state, action.item];
    case 'REMOVE_FROM_LIST':
      return state.filter(item => {
        return item.id !== action.item.id;
      });
    case 'SET_LIST':
      return action.list;
    case 'LOAD_STORED_STATE':
      return action.storedState.characterList;
    default:
      return state;
  }
};

export default combineReducers({
  suggestions: autocompleteReducer,
  searchTerm: searchTermReducer,
  isLoading: loadingReducer,
  characterList: characterListReducer
});
