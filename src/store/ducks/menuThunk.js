import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {actions as menuActions, internalActions} from './menuDuck';
import {navigate} from '../navigationService';
import {requestErrorLog} from 'util/log';
import {Client, CustomerUrl} from 'api';

const thunkFetchCustomerDetail = () => async (dispatch, getState) => {
  try {
    dispatch(internalActions.fetchCustomerDetail());

    const customerId = await AsyncStorage.getItem('customerId');

    const customerDetailRes = await Client.get(
      CustomerUrl.getByRef('customer-detail', 'customerId', customerId),
    );

    let customerDetail = customerDetailRes.data[0];
    customerDetail.customerDetailId = customerDetail._id;
    customerDetail = {
      ...customerDetail,
      ...customerDetail.contactName,
      ...customerDetail.address,
    };
    delete customerDetail._id;
    delete customerDetail.customerId;
    delete customerDetail.address;
    delete customerDetail.contactName;
    if (customerDetail.customerType == 'individual') {
      customerDetail.businessName = '';
      customerDetail.contactNo = '';
    }
    dispatch(internalActions.fetchCustomerDetailSuccess({customerDetail}));
  } catch (err) {
    requestErrorLog(err);
    dispatch(
      internalActions.fetchCustomerDetailFailed('Customer detail fetch failed'),
    );
  }
};

const thunkEditCustomerDetail = () => async (dispatch, getState) => {
  try {
    dispatch(internalActions.editCustomerDetail());

    let customerDetail = _.cloneDeep(getState().menu.customerDetail);
    let updatedCustomerDetail = customerDetail;
    const {
      customerDetailId,
      customerType,
      province,
      district,
      city,
      wardNo,
      street,
      firstName,
      lastName,
    } = customerDetail;

    customerDetail.address = {province, district, city, wardNo, street};
    customerDetail.contactName = {firstName, lastName};

    if (customerType == 'individual') {
      customerDetail.businessName = '';
      customerDetail.contactNo = '';
      updatedCustomerDetail.businessName = '';
      updatedCustomerDetail.contactNo = '';
    }
    delete customerDetail.customerDetailId;

    customerDetail = _.omit(customerDetail, [
      'province',
      'district',
      'city',
      'wardNo',
      'street',
      'firstName',
      'lastName',
    ]);

    await Client.put(
      CustomerUrl.put('customer-detail', customerDetailId),
      customerDetail,
    );

    dispatch(
      internalActions.editCustomerDetailSuccess({
        customerDetail: updatedCustomerDetail,
      }),
    );
  } catch (err) {
    requestErrorLog(err);
    dispatch(
      internalActions.editCustomerDetailFailed('Customer detail edit failed'),
    );
  }
};

export const actions = {
  ...menuActions,
  thunkFetchCustomerDetail,
  thunkEditCustomerDetail,
};
