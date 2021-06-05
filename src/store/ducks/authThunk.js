import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

import {actions as authActions, internalActions} from './authDuck';
import {loginInfo} from '../../temp/loginData';
import {AccountUrl, CustomerUrl, Client} from 'api';
import {requestErrorLog} from 'util/log';
import {navigate} from '../navigationService';

const thunkLogin = () => async (dispatch, getState) => {
  try {
    dispatch(internalActions.login());
    let firstTimeLogin = true;
    const deviceId = await AsyncStorage.getItem('deviceToken');

    //const loginData = _.cloneDeep(getState().auth.loginData);
    const loginData = loginInfo;
    loginData.deviceId = deviceId;

    const loginRes = await Client.post(AccountUrl.login('customer'), {
      loginData,
    });

    const {authToken, refreshToken} = loginRes.data.token;
    if (_.isEmpty(authToken) && _.isEmpty(refreshToken)) {
      throw new Error('token is empty');
    }

    const authTokenDecoded = jwtDecode(authToken);
    await AsyncStorage.setItem('authToken', authToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    await AsyncStorage.setItem('customerId', authTokenDecoded.user);
    await AsyncStorage.setItem('email', authTokenDecoded.email);
    firstTimeLogin = authTokenDecoded.firstTimeLogin;

    if (firstTimeLogin == true) {
      navigate('InitialCustomerForm');
    } else {
      dispatch(internalActions.loginSuccess());
    }
  } catch (err) {
    requestErrorLog(err);
    dispatch(internalActions.loginFailed("Email or password doesn't matched"));
  }
};

const thunkSignup = () => async (dispatch, getState) => {
  try {
    dispatch(internalActions.signup());
    const signupData = _.cloneDeep(getState().auth.signupData);

    await Client.post(AccountUrl.signup('customer'), {
      signUpData: signupData,
    });

    dispatch(
      internalActions.signupSuccess(
        'Account created. Please goto login page now.',
      ),
    );
  } catch (err) {
    requestErrorLog(err);
    dispatch(
      internalActions.signupFailed('Email or mobile number already exist'),
    );
  }
};

const thunkPostInitialCustomerForm = () => async (dispatch, getState) => {
  try {
    dispatch(internalActions.postInitialCustomerForm());

    let customerDetail = _.cloneDeep(getState().auth.customerDetail);
    const customerId = await AsyncStorage.getItem('customerId');
    const {
      customerType,
      province,
      district,
      city,
      wardNo,
      street,
      firstName,
      lastName,
    } = customerDetail;
    customerDetail.customerId = customerId;
    customerDetail.address = {province, district, city, wardNo, street};
    customerDetail.contactName = {firstName, lastName};

    if (customerType == 'individual') {
      delete customerDetail.businessName;
      delete customerDetail.contactNo;
    }

    customerDetail = _.omit(customerDetail, [
      'province',
      'district',
      'city',
      'wardNo',
      'street',
      'firstName',
      'lastName',
    ]);

    await Client.post(CustomerUrl.post(), {customerDetail});
    dispatch(internalActions.postInitialCustomerFormSuccess());
  } catch (err) {
    requestErrorLog(err);
    dispatch(
      internalActions.postInitialCustomerFormFailed(
        'Failed to post customer form.',
      ),
    );
  }
};

const thunkLogout = () => async (dispatch, getState) => {
  try {
    dispatch(internalActions.logout());
    const token = await AsyncStorage.getItem('authToken');
    const deviceId = await AsyncStorage.getItem('deviceToken');
    const roleId = await AsyncStorage.getItem('customerId');

    await Client.post(AccountUrl.logout('customer'), {
      logoutData: {
        roleId,
        token,
        deviceId,
      },
    });

    await AsyncStorage.setItem('authToken', '');
    await AsyncStorage.setItem('refreshToken', '');
    await AsyncStorage.setItem('customerId', '');
    await AsyncStorage.setItem('email', '');

    dispatch(internalActions.logoutSuccess());
  } catch (err) {
    requestErrorLog(err);
    dispatch(actions.resetCustomerDetail());
    dispatch(internalActions.logoutFailed('Failed to logout.'));
  }
};

export const actions = {
  ...authActions,
  thunkLogin,
  thunkSignup,
  thunkPostInitialCustomerForm,
  thunkLogout,
};
