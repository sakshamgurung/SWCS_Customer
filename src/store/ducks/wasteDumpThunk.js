import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {actions as wasteDumpActions, internalActions} from './wasteDumpDuck';
import {requestErrorLog} from 'util/log';
import {Client, WasteDumpUrl} from 'api';

const thunkFetchWasteDumpList = () => async (dispatch, getState) => {
  try {
    dispatch(internalActions.fetchWasteDumpList());
    const customerId = await AsyncStorage.getItem('customerId');

    const wasteDumpRes = await Client.get(
      WasteDumpUrl.getByRef('customerId', customerId),
      {params: {isCollected: false}},
    );

    const wasteDumpList = wasteDumpRes.data;
    dispatch(internalActions.fetchWasteDumpListSuccess({wasteDumpList}));
  } catch (err) {
    requestErrorLog(err);
    dispatch(
      internalActions.fetchWasteDumpListFailed({
        msg: 'Waste dump fetching failed',
      }),
    );
  }
};

export const actions = _.clone({
  ...wasteDumpActions,
  thunkFetchWasteDumpList,
});
