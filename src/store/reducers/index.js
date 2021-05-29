import {combineReducers} from 'redux';
import {default as authReducer} from '../ducks/authDuck';
import {default as homeReducer} from '../ducks/homeDuck';
import {default as exploreReducer} from '../ducks/exploreDuck';
import {default as inboxReducer} from '../ducks/inboxDuck';
export default combineReducers({
  auth: authReducer,
  home: homeReducer,
  explore: exploreReducer,
  inbox: inboxReducer,
});
