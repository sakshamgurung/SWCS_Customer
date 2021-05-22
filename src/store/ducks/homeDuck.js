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

export const types = {
  TAB_SELECTED: 'home/tabSelected',
  TOGGLE_HEADER_OPTIONS: 'home/toggleHeaderOptions',

  FETCH_HOME_LIST_DATA: 'home/fetchHomeListData',
  FETCH_HOME_LIST_DATA_SUCCESS: 'home/fetchHomeListDataSuccess',
  FETCH_HOME_LIST_DATA_FAILED: 'home/fetchHomeListDataFailed',

  FETCH_LIST_ITEM_DATA: 'home/fetchListItemData',
  FETCH_LIST_ITEM_DATA_SUCCESS: 'home/fetchListItemDataSuccess',
  FETCH_LIST_ITEM_DATA_FAILED: 'home/fetchListItemDataFailed',

  FETCH_GEO_OBJECTS: 'home/fetchGeoObjects',
  FETCH_GEO_OBJECTS_SUCCESS: 'home/fetchGeoObjectsSuccess',
  FETCH_GEO_OBJECTS_FAILED: 'home/fetchGeoObjectsFailed',

  CUSTOMER_REQUEST_CHANGED: 'home/customerRequestChanged',
  RESET_CUSTOMER_REQUEST: 'home/resetCustomerRequest',

  POST_CUSTOMER_REQUEST: 'home/postCustomerRequest',
  POST_CUSTOMER_REQUEST_SUCCESS: 'home/postCustomerRequestSuccess',
  POST_CUSTOMER_REQUEST_FAILED: 'home/postCustomerRequestFailed',

  UPDATE_CUSTOMER_REQUEST: 'home/updateCustomerRequest',
  UPDATE_CUSTOMER_REQUEST_SUCCESS: 'home/updateCustomerRequestSuccess',
  UPDATE_CUSTOMER_REQUEST_FAILED: 'home/updateCustomerRequestFailed',

  DELETE_CUSTOMER_REQUEST: 'home/deleteCustomerRequest',
  DELETE_CUSTOMER_REQUEST_SUCCESS: 'home/deleteCustomerRequestSuccess',
  DELETE_CUSTOMER_REQUEST_FAILED: 'home/deleteCustomerRequestFailed',
};

export const initialState = {
  selectedTab: 'all',
  isHeaderOptionsShown: false,
  loading: false,
  homeListData: {
    allServiceListData: {},
    requestListData: {},
    subscriptionListData: {},
  },
  listItemData: {},
  customerRequest: {
    requestCoordinate: {},
    workDescription: '',
    wasteDescription: [],
  },
  logMessage: {type: '', msg: ''}, //type = failed, success
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.TAB_SELECTED: {
      const selectedTab = action.payload;
      return {...state, selectedTab};
    }

    case types.TOGGLE_HEADER_OPTIONS: {
      return {...state, isHeaderOptionsShown: !state.isHeaderOptionsShown};
    }

    case types.FETCH_HOME_LIST_DATA: {
      return {...state, loading: true};
    }

    case types.FETCH_HOME_LIST_DATA_SUCCESS: {
      const {property, data} = action.payload;
      const homeListData = _.cloneDeep(state.homeListData);
      homeListData[`${property}`] = data;
      return {...state, loading: false, homeListData};
    }

    case types.FETCH_HOME_LIST_DATA_FAILED: {
      const msg = action.payload;
      return {...state, loading: false, logMessage: {type: 'failed', msg}};
    }

    case types.FETCH_LIST_ITEM_DATA: {
      return {...state, loading: true};
    }

    case types.FETCH_LIST_ITEM_DATA_SUCCESS: {
      const {data} = action.payload;
      return {...state, loading: false, listItemData: data};
    }

    case types.FETCH_LIST_ITEM_DATA_FAILED: {
      const msg = action.payload;
      return {...state, loading: false, logMessage: {type: 'failed', msg}};
    }

    case types.FETCH_GEO_OBJECTS: {
      return {...state, loading: true};
    }

    case types.FETCH_GEO_OBJECTS_SUCCESS: {
      const {track, zone} = action.payload;
      const listItemData = _.cloneDeep(state.listItemData);
      listItemData.track = track;
      listItemData.zone = zone;
      return {...state, loading: false, listItemData};
    }

    case types.FETCH_GEO_OBJECTS_FAILED: {
      const msg = action.payload;
      return {...state, loading: false, logMessage: {type: 'failed', msg}};
    }

    case types.CUSTOMER_REQUEST_CHANGED: {
      const {property, data} = action.payload;
      const customerRequest = _.cloneDeep(state.customerRequest);
      customerRequest[`${property}`] = data;
      return {...state, customerRequest};
    }

    case types.RESET_CUSTOMER_REQUEST: {
      return {
        ...state,
        customerRequest: {
          requestCoordinate: {},
          workDescription: '',
          wasteDescription: [],
        },
      };
    }

    case types.POST_CUSTOMER_REQUEST: {
      return {...state, loading: true};
    }

    case types.POST_CUSTOMER_REQUEST_SUCCESS: {
      const {msg, companyServicesAndStatus} = action.payload;
      const listItemData = _.cloneDeep(state.listItemData);
      listItemData.companyServicesAndStatus = companyServicesAndStatus;
      return {
        ...state,
        loading: false,
        listItemData,
        logMessage: {type: 'success', msg},
      };
    }

    case types.POST_CUSTOMER_REQUEST_FAILED: {
      const msg = action.payload;
      return {...state, loading: false, logMessage: {type: 'failed', msg}};
    }

    case types.UPDATE_CUSTOMER_REQUEST: {
      return {...state, loading: true};
    }

    case types.UPDATE_CUSTOMER_REQUEST_SUCCESS: {
      const {msg, requestListIndex, customerRequest} = action.payload;
      const homeListData = _.cloneDeep(state.homeListData);
      homeListData.requestListData[requestListIndex] = customerRequest;
      return {
        ...state,
        loading: false,
        homeListData,
        logMessage: {type: 'success', msg},
      };
    }

    case types.UPDATE_CUSTOMER_REQUEST_FAILED: {
      const msg = action.payload;
      return {...state, loading: false, logMessage: {type: 'failed', msg}};
    }

    case types.DELETE_CUSTOMER_REQUEST: {
      return {...state, loading: true};
    }

    case types.DELETE_CUSTOMER_REQUEST_SUCCESS: {
      const {msg} = action.payload;
      return {
        ...state,
        loading: false,
        logMessage: {type: 'success', msg},
      };
    }

    case types.DELETE_CUSTOMER_REQUEST_FAILED: {
      const msg = action.payload;
      return {...state, loading: false, logMessage: {type: 'failed', msg}};
    }

    default: {
      return {...state};
    }
  }
}

const tabSelected = selectedTab => {
  return {type: types.TAB_SELECTED, payload: selectedTab};
};

const toggleHeaderOptions = () => {
  return {type: types.TOGGLE_HEADER_OPTIONS};
};

const fetchHomeListData = () => {
  return {type: types.FETCH_HOME_LIST_DATA};
};

const fetchHomeListDataSuccess = homeListData => {
  return {type: types.FETCH_HOME_LIST_DATA_SUCCESS, payload: homeListData};
};

const fetchHomeListDataFailed = failedData => {
  return {type: types.FETCH_HOME_LIST_DATA_FAILED, payload: failedData};
};

const fetchListItemData = () => {
  return {type: types.FETCH_LIST_ITEM_DATA};
};

const fetchListItemDataSuccess = listItemData => {
  return {type: types.FETCH_LIST_ITEM_DATA_SUCCESS, payload: listItemData};
};

const fetchListItemDataFailed = failedData => {
  return {type: types.FETCH_LIST_ITEM_DATA_FAILED, payload: failedData};
};

const fetchGeoObjects = () => {
  return {type: types.FETCH_GEO_OBJECTS};
};

const fetchGeoObjectsSuccess = geoObjectsData => {
  return {type: types.FETCH_GEO_OBJECTS_SUCCESS, payload: geoObjectsData};
};

const fetchGeoObjectsFailed = failedData => {
  return {type: types.FETCH_GEO_OBJECTS_FAILED, payload: failedData};
};

const customerRequestChanged = customerRequestData => {
  return {type: types.CUSTOMER_REQUEST_CHANGED, payload: customerRequestData};
};

const resetCustomerRequest = () => {
  return {type: types.RESET_CUSTOMER_REQUEST};
};

const postCustomerRequest = () => {
  return {type: types.POST_CUSTOMER_REQUEST};
};

const postCustomerRequestSuccess = successData => {
  return {type: types.POST_CUSTOMER_REQUEST_SUCCESS, payload: successData};
};

const postCustomerRequestFailed = failedData => {
  return {type: types.POST_CUSTOMER_REQUEST_FAILED, payload: failedData};
};

const updateCustomerRequest = () => {
  return {type: types.UPDATE_CUSTOMER_REQUEST};
};

const updateCustomerRequestSuccess = successData => {
  return {type: types.UPDATE_CUSTOMER_REQUEST_SUCCESS, payload: successData};
};

const updateCustomerRequestFailed = failedData => {
  return {type: types.UPDATE_CUSTOMER_REQUEST_FAILED, payload: failedData};
};

const deleteCustomerRequest = () => {
  return {type: types.DELETE_CUSTOMER_REQUEST};
};

const deleteCustomerRequestSuccess = successData => {
  return {type: types.DELETE_CUSTOMER_REQUEST_SUCCESS, payload: successData};
};

const deleteCustomerRequestFailed = failedData => {
  return {type: types.DELETE_CUSTOMER_REQUEST_FAILED, payload: failedData};
};

const thunkResetCustomerRequest = screenName => async dispatch => {
  dispatch(resetCustomerRequest());
  navigate(screenName);
};

const thunkFetchHomeListData = () => async dispatch => {
  try {
    dispatch(fetchHomeListData());

    const customerId = await AsyncStorage.getItem('customerId');

    const [allServiceRes, requestRes, subscriptionRes] = await Promise.all([
      Client.get(CompanyUrl.getAll('company-detail')),
      Client.get(CustomerRequestUrl.getAll('customer', customerId)),
      Client.get(SubscriptionUrl.getSubscription(customerId)),
    ]);
    if (requestRes) {
      requestRes.data.forEach(e => {
        e.wasteDescription.forEach(wd => {
          wd.amount = wd.amount.toString();
        });
      });
    }
    dispatch(
      fetchHomeListDataSuccess({
        property: 'allServiceListData',
        data: allServiceRes.data,
      }),
    );
    dispatch(
      fetchHomeListDataSuccess({
        property: 'requestListData',
        data: requestRes.data,
      }),
    );
    dispatch(
      fetchHomeListDataSuccess({
        property: 'subscriptionListData',
        data: subscriptionRes.data,
      }),
    );
  } catch (err) {
    requestErrorLog(err);
    dispatch(fetchHomeListDataFailed('Data failed to load'));
  }
};

const thunkFetchListItemData =
  (arrayIndex, listItemType, refId) => async (dispatch, getState) => {
    try {
      dispatch(fetchListItemData());
      const customerId = await AsyncStorage.getItem('customerId');

      if (listItemType == 'aboutCompany') {
        const companyId = refId;
        const [companyServiceDetailRes, utilActionRes, wasteListRes] =
          await Promise.all([
            Client.get(
              CompanyUrl.getByRef('company-service-detail', 'companyId', refId),
            ),
            Client.post(UtilActionUrl.verify(), {
              type: 'companyServicesAndStatus',
              customerId,
              companyId,
            }),
            Client.get(WasteListUrl.getByRef('companyId', refId)),
          ]);

        dispatch(
          fetchListItemDataSuccess({
            data: {
              companyServiceDetail: companyServiceDetailRes.data,
              companyServicesAndStatus:
                utilActionRes.data.companyServicesAndStatus,
              wasteList: wasteListRes.data,
            },
          }),
        );
      }
    } catch (err) {
      requestErrorLog(err);
      dispatch(fetchListItemDataFailed('Data failed to load'));
    }
  };

const thunkFetchGeoObjects = companyId => async (dispatch, getState) => {
  try {
    dispatch(fetchGeoObjects());

    const [trackRes, zoneRes] = await Promise.all([
      Client.get(GeoObjectUrl.getAll(companyId, 'track')),
      Client.get(GeoObjectUrl.getAll(companyId, 'zone')),
    ]);
    dispatch(
      fetchGeoObjectsSuccess({
        track: trackRes.data,
        zone: zoneRes.data,
      }),
    );
  } catch (err) {
    requestErrorLog(err);
    dispatch(fetchGeoObjectsFailed('Data failed to load'));
  }
};

const thunkPostCustomerRequest =
  (companyId, serviceType, screenName) => async (dispatch, getState) => {
    try {
      dispatch(postCustomerRequest());

      const customerId = await AsyncStorage.getItem('customerId');

      const customerRequest = _.cloneDeep(getState().home.customerRequest);
      customerRequest.companyId = companyId;
      customerRequest.customerId = customerId;
      customerRequest.requestType = serviceType;

      const companyServicesAndStatus = _.cloneDeep(
        getState().home.listItemData.companyServicesAndStatus,
      );

      switch (serviceType) {
        case 'subscription': {
          companyServicesAndStatus.subscription = 'pending';
          companyServicesAndStatus.subscriptionLoc = 'deactive';
          delete customerRequest.requestCoordinate;
          delete customerRequest.wasteDescription;
          delete customerRequest.workDescription;
          break;
        }
        case 'subscription with location': {
          companyServicesAndStatus.subscription = 'deactive';
          companyServicesAndStatus.subscriptionLoc = 'pending';
          break;
        }
        case 'one time': {
          companyServicesAndStatus.oneTime = 'pending';
          break;
        }
      }

      const customerRequestRes = await Client.post(
        CustomerRequestUrl.post(),
        customerRequest,
      );

      if (customerRequestRes.status == 200) {
        dispatch(
          postCustomerRequestSuccess({
            companyServicesAndStatus,
            msg: 'Request send success',
          }),
        );
        dispatch(resetCustomerRequest());
        navigate(screenName);
      }
    } catch (err) {
      requestErrorLog(err);
      dispatch(postCustomerRequestFailed('Failed to post request'));
      dispatch(resetCustomerRequest());
      navigate(screenName);
    }
  };

const thunkUpdateCustomerRequest =
  (requestListIndex, screenName) => async (dispatch, getState) => {
    try {
      dispatch(updateCustomerRequest());

      const customerRequest = _.cloneDeep(
        getState().home.homeListData.requestListData[requestListIndex],
      );
      const editedCustomerRequest = _.cloneDeep(
        getState().home.customerRequest,
      );
      customerRequest.wasteDescription = editedCustomerRequest.wasteDescription;
      customerRequest.workDescription = editedCustomerRequest.workDescription;
      customerRequest.requestCoordinate =
        editedCustomerRequest.requestCoordinate;
      const customerRequestId = _.clone(customerRequest._id);
      const modifiedCustomerRequest = _.cloneDeep(customerRequest);
      delete customerRequest._id;
      delete customerRequest.companyId;
      delete customerRequest.customerId;
      delete customerRequest.companyDetail;

      const customerRequestRes = await Client.put(
        CustomerRequestUrl.put(customerRequestId),
        customerRequest,
      );

      if (customerRequestRes.status == 200) {
        dispatch(
          updateCustomerRequestSuccess({
            msg: 'Request update success',
            requestListIndex,
            customerRequest: modifiedCustomerRequest,
          }),
        );
        dispatch(resetCustomerRequest());
        navigate(screenName);
      }
    } catch (err) {
      requestErrorLog(err);
      dispatch(updateCustomerRequestFailed('Failed to update request'));
      dispatch(resetCustomerRequest());
      navigate(screenName);
    }
  };

const thunkDeleteCustomerRequest =
  (requestListIndex, screenName) => async (dispatch, getState) => {
    try {
      dispatch(deleteCustomerRequest());
      dispatch(toggleHeaderOptions());

      const customerRequest = _.cloneDeep(
        getState().home.homeListData.requestListData[requestListIndex],
      );

      const customerRequestId = _.clone(customerRequest._id);

      await Client.delete(
        CustomerRequestUrl.delete(customerRequestId),
        customerRequest,
      );

      dispatch(
        deleteCustomerRequestSuccess({
          msg: 'Request update success',
        }),
      );
      navigate(screenName);
    } catch (err) {
      requestErrorLog(err);
      dispatch(deleteCustomerRequestFailed('Failed to update request'));
      navigate(screenName);
    }
  };

export const actions = {
  tabSelected,
  toggleHeaderOptions,
  customerRequestChanged,
  thunkResetCustomerRequest,
  thunkFetchHomeListData,
  thunkFetchListItemData,
  thunkFetchGeoObjects,
  thunkPostCustomerRequest,
  thunkUpdateCustomerRequest,
  thunkDeleteCustomerRequest,
};
