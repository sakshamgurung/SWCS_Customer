import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {actions as authActions} from 'store/ducks/authDuck';

import {actions as homeActions} from 'store/ducks/homeThunk';
import {actions as inboxActions} from 'store/ducks/inboxThunk';

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
      default:
        actions = undefined;
    }
    return {...bindActionCreators(actions, dispatch)};
  };

  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
}
