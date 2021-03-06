import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const types = {
  DEFAULT: 'auth/default',

  LOGIN_DATA_CHANGED: 'auth/loginDataChanged',
  SIGNUP_DATA_CHANGED: 'auth/signupDataChanged',
  TOGGLE_PASSWORD: 'auth/togglePassword',
  CUSTOMER_DETAIL_CHANGED: 'auth/customerDetailChanged',

  LOGIN: 'auth/login',
  LOGIN_SUCCESS: 'auth/loginSuccess',
  LOGIN_FAILED: 'auth/loginFailed',

  SIGNUP: 'auth/signup',
  SIGNUP_SUCCESS: 'auth/signupSuccess',
  SIGNUP_FAILED: 'auth/signupFailed',

  POST_INITIAL_CUSTOMER_FORM: 'auth/postInitialCustomerForm',
  POST_INITIAL_CUSTOMER_FORM_SUCCESS: 'auth/postInitialCustomerFormSuccess',
  POST_INITIAL_CUSTOMER_FORM_FAILED: 'auth/postInitialCustomerFormFailed',

  LOGOUT: 'auth/logout',
  LOGOUT_SUCCESS: 'auth/logoutSuccess',
  LOGOUT_FAILED: 'auth/logoutFailed',

  RESET: 'auth/reset',
  RESET_CUSTOMER_DETAIL: 'auth/resetCustomerDetail',
};

export const initialState = {
  loading: false,
  isLoggedIn: false,
  isPasswordShown: false,
  loginData: {email: '', password: ''},
  signupData: {email: '', password: '', mobileNo: ''},
  customerDetail: {
    customerType: '',
    businessName: '',
    province: '',
    district: '',
    city: '',
    wardNo: '',
    street: '',
    firstName: '',
    lastName: '',
    contactNo: '',
  }, //customerType: business, individual
  logMessage: {type: '', msg: ''}, //type = failed, success
};

export default function reducer(state = initialState, action) {
  console.log('[Action]:', action);
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

    case types.CUSTOMER_DETAIL_CHANGED: {
      const {property, value} = action.payload;
      const customerDetail = _.cloneDeep(state.customerDetail);
      customerDetail[`${property}`] = value;
      return {...state, customerDetail};
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
        isPasswordShown: false,
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

    case types.POST_INITIAL_CUSTOMER_FORM: {
      return {...state, loading: true};
    }

    case types.POST_INITIAL_CUSTOMER_FORM_SUCCESS: {
      return {...state, loading: false, isLoggedIn: true};
    }

    case types.POST_INITIAL_CUSTOMER_FORM_FAILED: {
      const msg = action.payload;
      return {
        ...state,
        loading: false,
        logMessage: {type: 'failed', msg},
      };
    }

    case types.LOGOUT: {
      return {...state, loading: true};
    }

    case types.LOGOUT_SUCCESS: {
      return {...state, loading: false, isLoggedIn: false};
    }

    case types.LOGOUT_FAILED: {
      const {msg} = action.payload;
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        logMessage: {type: 'failed', msg},
      };
    }

    case types.RESET: {
      return {
        ...state,
        loading: false,
        isPasswordShown: false,
        logMessage: {type: '', msg: ''},
        loginData: {email: '', password: ''},
        signupData: {email: '', password: '', mobileNo: ''},
      };
    }

    case types.RESET_CUSTOMER_DETAIL: {
      const customerDetail = _.cloneDeep(state.customerDetail);
      for (let property in customerDetail) {
        customerDetail[property] = '';
      }
      return {
        ...state,
        customerDetail,
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

const customerDetailChanged = customerDetail => {
  return {type: types.CUSTOMER_DETAIL_CHANGED, payload: customerDetail};
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

const postInitialCustomerForm = () => {
  return {type: types.POST_INITIAL_CUSTOMER_FORM};
};

const postInitialCustomerFormSuccess = () => {
  return {type: types.POST_INITIAL_CUSTOMER_FORM_SUCCESS};
};

const postInitialCustomerFormFailed = failedData => {
  return {type: types.POST_INITIAL_CUSTOMER_FORM_FAILED, payload: failedData};
};

const logout = () => {
  return {type: types.LOGOUT};
};

const logoutSuccess = () => {
  return {type: types.LOGOUT_SUCCESS};
};

const logoutFailed = failedData => {
  return {type: types.LOGOUT_FAILED, payload: failedData};
};

const reset = () => {
  return {type: types.RESET};
};

const resetCustomerDetail = () => {
  return {type: types.RESET_CUSTOMER_DETAIL};
};

export const internalActions = {
  login,
  loginSuccess,
  loginFailed,
  signup,
  signupSuccess,
  signupFailed,
  postInitialCustomerForm,
  postInitialCustomerFormSuccess,
  postInitialCustomerFormFailed,
  logout,
  logoutSuccess,
  logoutFailed,
};

export const actions = {
  storeDeviceToken,
  loginDataChanged,
  signupDataChanged,
  customerDetailChanged,
  togglePassword,
  reset,
  resetCustomerDetail,
};
