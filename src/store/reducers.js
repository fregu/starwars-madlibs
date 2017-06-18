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

const itemListReducer = (state = [], action) => {
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

    case 'UPDATE_ITEM':
      return state.map(item => {
        if (item.id === action.item.id) {
          return action.item;
        }
        return item;
      });

    case 'SET_LIST':
      return action.list || state;

    default:
      return state;
  }
};

const playReducer = (state = false, action) => {
  switch (action.type) {
    case 'START_PLAYING':
      return true;
    case 'STOP_PLAYING':
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  suggestions: autocompleteReducer,
  searchTerm: searchTermReducer,
  isLoading: loadingReducer,
  itemList: itemListReducer,
  isPlaying: playReducer,
});
