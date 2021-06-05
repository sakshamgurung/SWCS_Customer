import _ from 'lodash';

export const types = {
  SET_BUFFER: 'menu/setBuffer',
  TOGGLE_EDIT: 'menu/edit',
  CUSTOMER_DETAIL_CHANGED: 'menu/customerDetailChanged',

  FETCH_CUSTOMER_DETAIL: 'menu/fetchCustomerDetail',
  FETCH_CUSTOMER_DETAIL_SUCCESS: 'menu/fetchCustomerDetailSuccess',
  FETCH_CUSTOMER_DETAIL_FAILED: 'menu/fetchCustomerDetailFailed',

  EDIT_CUSTOMER_DETAIL: 'menu/editCustomerDetail',
  EDIT_CUSTOMER_DETAIL_SUCCESS: 'menu/editCustomerDetailSuccess',
  EDIT_CUSTOMER_DETAIL_FAILED: 'menu/editCustomerDetailFailed',
};

export const initialState = {
  isEditable: false,
  buffer: {},
  customerDetail: {
    customerDetailId: '',
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
  },
  loading: false,
  logMessage: {type: '', msg: ''}, //type = failed, success
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_BUFFER: {
      const buffer = action.payload;
      return {...state, buffer};
    }

    case types.TOGGLE_EDIT: {
      return {...state, isEditable: !state.isEditable};
    }

    case types.CUSTOMER_DETAIL_CHANGED: {
      const {property, value} = action.payload;
      if (property == 'reset') {
        return {...state, customerDetail: value};
      }
      const customerDetail = _.cloneDeep(state.customerDetail);
      customerDetail[property] = value;
      return {...state, customerDetail};
    }

    case types.FETCH_CUSTOMER_DETAIL: {
      return {...state, loading: true};
    }

    case types.FETCH_CUSTOMER_DETAIL_SUCCESS: {
      const {customerDetail} = action.payload;
      return {...state, loading: false, customerDetail};
    }

    case types.FETCH_CUSTOMER_DETAIL_FAILED: {
      const {msg} = action.payload;
      return {...state, loading: false, logMessage: {type: 'failed', msg}};
    }

    case types.EDIT_CUSTOMER_DETAIL: {
      return {...state, loading: true};
    }

    case types.EDIT_CUSTOMER_DETAIL_SUCCESS: {
      const {customerDetail} = action.payload;
      return {...state, loading: false, customerDetail};
    }

    case types.EDIT_CUSTOMER_DETAIL_FAILED: {
      const {msg} = action.payload;
      return {...state, loading: false, logMessage: {type: 'failed', msg}};
    }

    default:
      return {...state};
  }
}

const setBuffer = data => {
  return {type: types.SET_BUFFER, payload: data};
};

const toggleEdit = () => {
  return {type: types.TOGGLE_EDIT};
};

const customerDetailChanged = data => {
  return {type: types.CUSTOMER_DETAIL_CHANGED, payload: data};
};

const fetchCustomerDetail = () => {
  return {type: types.FETCH_CUSTOMER_DETAIL};
};

const fetchCustomerDetailSuccess = successData => {
  return {type: types.FETCH_CUSTOMER_DETAIL_SUCCESS, payload: successData};
};

const fetchCustomerDetailFailed = failedData => {
  return {type: types.FETCH_CUSTOMER_DETAIL_FAILED, payload: failedData};
};

const editCustomerDetail = () => {
  return {type: types.EDIT_CUSTOMER_DETAIL};
};

const editCustomerDetailSuccess = successData => {
  return {type: types.EDIT_CUSTOMER_DETAIL_SUCCESS, payload: successData};
};

const editCustomerDetailFailed = failedData => {
  return {type: types.EDIT_CUSTOMER_DETAIL_FAILED, payload: failedData};
};

export const internalActions = {
  fetchCustomerDetail,
  fetchCustomerDetailSuccess,
  fetchCustomerDetailFailed,
  editCustomerDetail,
  editCustomerDetailSuccess,
  editCustomerDetailFailed,
};

export const actions = {
  setBuffer,
  toggleEdit,
  customerDetailChanged,
};
