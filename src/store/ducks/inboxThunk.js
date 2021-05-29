import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {actions as inboxActions, internalActions} from './inboxDuck';
import {navigate} from '../navigationService';
import {requestErrorLog} from 'util/log';
import {Client, NotificationUrl, ScheduleUrl, WorkUrl} from 'api';

const thunkFetchNotificationList = () => async (dispatch, getState) => {
  try {
    dispatch(internalActions.fetchNotificationList());
    const customerId = await AsyncStorage.getItem('customerId');

    const [notificationRes] = await Promise.all([
      Client.get(NotificationUrl.getAll('customer', customerId)),
    ]);

    const notificationList = notificationRes.data;
    dispatch(internalActions.fetchNotificationListSuccess({notificationList}));
  } catch (err) {
    requestErrorLog(err);
    dispatch(
      internalActions.fetchNotificationListFailed({
        msg: 'Notification fetching failed',
      }),
    );
  }
};

const thunkFetchScheduleList = () => async (dispatch, getState) => {
  try {
    dispatch(internalActions.fetchScheduleList());
    const customerId = await AsyncStorage.getItem('customerId');

    const [scheduleRes] = await Promise.all([
      Client.get(ScheduleUrl.getAll(customerId)),
    ]);

    const scheduleList = scheduleRes.data;
    dispatch(internalActions.fetchScheduleListSuccess({scheduleList}));
  } catch (err) {
    requestErrorLog(err);
    dispatch(
      internalActions.fetchScheduleListFailed({
        msg: 'Schedule fetching failed',
      }),
    );
  }
};

const thunkFetchWork = workId => async (dispatch, getState) => {
  try {
    dispatch(internalActions.fetchWork());

    const [workRes] = await Promise.all([Client.get(WorkUrl.getById(workId))]);

    const work = workRes.data;
    dispatch(internalActions.fetchWorkSuccess({work}));
  } catch (err) {
    requestErrorLog(err);
    dispatch(
      internalActions.fetchWorkFailed({
        msg: 'Work fetching failed',
      }),
    );
  }
};

export const actions = _.clone({
  ...inboxActions,
  thunkFetchNotificationList,
  thunkFetchScheduleList,
  thunkFetchWork,
});
