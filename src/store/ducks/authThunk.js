import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

import {actions as authActions, internalActions} from './authDuck';
import {loginInfo} from '../../temp/loginData';
import {AccountUrl, Client} from 'api';
import {requestErrorLog} from 'util/log';

const thunkLogin = () => async (dispatch, getState) => {
  try {
    dispatch(internalActions.login());
    //const loginData = _.cloneDeep(getState().auth.loginData);
    const loginData = loginInfo;
    const deviceId = await AsyncStorage.getItem('deviceToken');
    if (deviceId !== null) {
      loginData.deviceId = deviceId;
    } else {
      throw new Error('device id is null');
    }

    const loginRes = await Client.post(AccountUrl.login('customer'), {
      loginData,
    });
    if (loginRes.status == 200) {
      const authToken = loginRes.data.token.authToken;
      const refreshToken = loginRes.data.token.refreshToken;
      if (authToken && refreshToken) {
        const authTokenDecoded = jwtDecode(authToken);
        await AsyncStorage.setItem('authToken', authToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        await AsyncStorage.setItem('customerId', authTokenDecoded.user);
        await AsyncStorage.setItem('email', authTokenDecoded.email);
      } else {
        throw new Error('token is empty');
      }
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

    const signupRes = await Client.post(AccountUrl.signup('customer'), {
      signUpData: signupData,
    });

    if (signupRes.status == 200) {
      console.log('signupRes req success is: ', signupRes.data);
      dispatch(
        internalActions.signupSuccess(
          'Account created. Please goto login page now.',
        ),
      );
    }
  } catch (err) {
    requestErrorLog(err);
    dispatch(
      internalActions.signupFailed('Email or mobile number already exist'),
    );
  }
};

export const actions = {
  ...authActions,
  thunkLogin,
  thunkSignup,
};
