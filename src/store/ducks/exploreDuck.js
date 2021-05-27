import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {navigate} from '../navigationService';
import {requestErrorLog} from 'util/log';
import {
  UtilActionUrl,
  CompanyUrl,
  WasteListUrl,
  CustomerRequestUrl,
  SubscriptionUrl,
  Client,
  GeoObjectUrl,
} from 'api';

export const types = {};

export const initialState = {
  logMessage: {type: '', msg: ''}, //type = failed, success
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return {...state};
  }
}

export const actions = {};
