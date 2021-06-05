import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {actions as authActions} from 'store/ducks/authThunk';
import {actions as homeActions} from 'store/ducks/homeThunk';
import {actions as inboxActions} from 'store/ducks/inboxThunk';
import {actions as exploreActions} from 'store/ducks/exploreThunk';
import {actions as wasteDumpActions} from 'store/ducks/wasteDumpThunk';
import {actions as menuActions} from 'store/ducks/menuThunk';

export function reduxStoreWrapper(WrappedComponent, reducerName) {
  const mapStateToProps = state => {
    return _.cloneDeep(state[reducerName]);
  };

  const mapDispatchToProps = dispatch => {
    let actions;
    switch (reducerName) {
      case 'auth':
        actions = authActions;
        break;
      case 'home':
        actions = homeActions;
        break;
      case 'inbox':
        actions = inboxActions;
        break;
      case 'explore':
        actions = exploreActions;
        break;
      case 'wasteDump':
        actions = wasteDumpActions;
        break;
      case 'menu':
        actions = {...authActions, ...menuActions};
        break;
      default:
        actions = undefined;
    }
    return {...bindActionCreators(actions, dispatch)};
  };

  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
}
