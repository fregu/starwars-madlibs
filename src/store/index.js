import { connect } from 'react-redux';
import { createStore, bindActionCreators, applyMiddleware} from 'redux';
import { createSession } from 'redux-session';
import thunk from 'redux-thunk';
import reducers from './reducers';
import * as actions from './actions';

const initialState = {
  searchTerm: '',
  suggestions: [],
  characterList: [],
  isLoading: false
};

// Make redux-state avalable as props
const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm,
    suggestions: state.suggestions,
    characterList: state.characterList,
    isLoading: state.isLoading
  };
};

const session = createSession({
  ns: 'mycharacters',
  selectState (state) {
    return {
      characterList: state.characterList
    };
  },
  onLoad (storedState, dispatch) {
    console.log('storedState', storedState);
    dispatch({ type: 'SET_LIST', storedState })
  },
  throttle: 3000 // update storage once every 3 seconds
 });

// Make actions avalable as props
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

// Combine actions, state, middlewares, and devtools config to store
const store = createStore(reducers, initialState, applyMiddleware(thunk), applyMiddleware(session), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Export a connector from which a react component can reach out and touch state..
export const connector = (component) => {
  return connect(mapStateToProps, mapDispatchToProps)(component);
};

export default store;
