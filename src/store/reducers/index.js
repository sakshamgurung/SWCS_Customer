import {combineReducers} from 'redux';
import {default as authReducer} from '../ducks/authDuck';
import {default as homeReducer} from '../ducks/homeDuck';
import {default as inboxReducer} from '../ducks/inboxDuck';
import {default as wasteDumpReducer} from '../ducks/wasteDumpDuck';
import {default as menuReducer} from '../ducks/menuDuck';

export default combineReducers({
  auth: authReducer,
  home: homeReducer,
  inbox: inboxReducer,
  wasteDump: wasteDumpReducer,
  menu: menuReducer,
});
