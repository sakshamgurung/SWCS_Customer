import {combineReducers} from 'redux';
import {default as authReducer} from '../ducks/authDuck';
import {default as homeReducer} from '../ducks/homeDuck';

export default combineReducers({
  auth: authReducer,
  home: homeReducer,
});
