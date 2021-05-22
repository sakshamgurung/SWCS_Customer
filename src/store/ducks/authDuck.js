import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

import {loginInfo} from '../../temp/loginData';
import {AccountUrl, Client} from 'api';
import {requestErrorLog} from 'util/log';

export const types = {
  DEFAULT: 'auth/default',

  LOGIN_DATA_CHANGED: 'auth/loginDataChanged',
  SIGNUP_DATA_CHANGED: 'auth/signupDataChanged',
  TOGGLE_PASSWORD: 'auth/togglePassword',

  LOGIN: 'auth/login',
  LOGIN_SUCCESS: 'auth/loginSuccess',
  LOGIN_FAILED: 'auth/loginFailed',

  SIGNUP: 'auth/signup',
  SIGNUP_SUCCESS: 'auth/signupSuccess',
  SIGNUP_FAILED: 'auth/signupFailed',

  RESET: 'auth/reset',
};

export const initialState = {
  loading: false,
  isLoggedIn: false,
  isPasswordShown: false,
  loginData: {email: '', password: ''},
  signupData: {email: '', password: '', mobileNo: ''},
  logMessage: {type: '', msg: ''}, //type = failed, success
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_DATA_CHANGED: {
      const {property, value} = action.payload;
      const loginData = _.cloneDeep(state.loginData);
      loginData[`${property}`] = value;
      return {...state, loginData};
    }

    case types.SIGNUP_DATA_CHANGED: {
      const {property, value} = action.payload;
      const signupData = _.cloneDeep(state.signupData);
      signupData[`${property}`] = value;
      return {...state, signupData};
    }

    case types.TOGGLE_PASSWORD: {
      return {...state, isPasswordShown: !state.isPasswordShown};
    }

    case types.LOGIN: {
      return {...state, loading: true};
    }

    case types.LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
      };
    }

    case types.LOGIN_FAILED: {
      const msg = action.payload;
      return {
        ...state,
        loading: false,
        logMessage: {type: 'failed', msg},
      };
    }

    case types.SIGNUP: {
      return {...state, loading: true};
    }

    case types.SIGNUP_SUCCESS: {
      const msg = action.payload;
      return {
        ...state,
        loading: false,
        logMessage: {type: 'success', msg},
        signupData: {email: '', password: '', mobileNo: ''},
      };
    }

    case types.SIGNUP_FAILED: {
      const msg = action.payload;
      return {
        ...state,
        loading: false,
        logMessage: {type: 'failed', msg},
      };
    }

    case types.RESET: {
      return {
        ...state,
        isPasswordShown: false,
        logMessage: {type: '', msg: ''},
        loginData: {email: '', password: ''},
        signupData: {email: '', password: '', mobileNo: ''},
      };
    }

    case types.DEFAULT:

    default: {
      return {...state};
    }
  }
}

//Action creator
const storeDeviceToken = token => async dispatch => {
  try {
    await AsyncStorage.setItem('deviceToken', token);
    dispatch({type: types.DEFAULT});
  } catch (err) {
    console.log('authDuck: store device token failed', err);
  }
};

const loginDataChanged = loginData => {
  //loginData: {property:"email or password", value:""}
  return {type: types.LOGIN_DATA_CHANGED, payload: loginData};
};

const signupDataChanged = signupData => {
  //signupData:{property:"email or password or mobileNo", value:""}
  return {type: types.SIGNUP_DATA_CHANGED, payload: signupData};
};

const togglePassword = () => {
  return {type: types.TOGGLE_PASSWORD};
};

const login = () => {
  return {type: types.LOGIN};
};

const loginSuccess = () => {
  return {type: types.LOGIN_SUCCESS};
};

const loginFailed = msg => {
  return {type: types.LOGIN_FAILED, payload: msg};
};

const signup = () => {
  return {type: types.SIGNUP};
};

const signupSuccess = msg => {
  return {type: types.SIGNUP_SUCCESS, payload: msg};
};

const signupFailed = msg => {
  return {type: types.SIGNUP_FAILED, payload: msg};
};

const reset = () => {
  return {type: types.RESET};
};

const thunkLogin = () => async (dispatch, getState) => {
  try {
    dispatch(login());
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
      dispatch(loginSuccess());
    }
  } catch (err) {
    requestErrorLog(err);
    dispatch(loginFailed("Email or password doesn't matched"));
  }
};

const thunkSignup = () => async (dispatch, getState) => {
  try {
    dispatch(signup());
    const signupData = _.cloneDeep(getState().auth.signupData);

    const signupRes = await Client.post(AccountUrl.signup('customer'), {
      signUpData: signupData,
    });

    if (signupRes.status == 200) {
      console.log('signupRes req success is: ', signupRes.data);
      dispatch(signupSuccess('Account created. Please goto login page now.'));
    }
  } catch (err) {
    requestErrorLog(err);
    dispatch(signupFailed('Email or mobile number already exist'));
  }
};

export const actions = {
  storeDeviceToken,
  loginDataChanged,
  signupDataChanged,
  togglePassword,
  reset,
  thunkLogin,
  thunkSignup,
};
