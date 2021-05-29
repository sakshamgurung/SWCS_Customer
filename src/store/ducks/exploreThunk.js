import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {actions as exploreActions, internalActions} from './exploreDuck';
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

export const actions = {
  ...exploreActions,
};
