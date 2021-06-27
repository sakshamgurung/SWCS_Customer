import _ from 'lodash';

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

  UNSUBSCRIBE: 'home/unsubscribe',
  UNSUBSCRIBE_SUCCESS: 'home/unsubscribeSuccess',
  UNSUBSCRIBE_FAILED: 'home/unsubscribeFailed',

  UPDATE_CUSTOMER_REQUEST: 'home/updateCustomerRequest',
  UPDATE_CUSTOMER_REQUEST_SUCCESS: 'home/updateCustomerRequestSuccess',
  UPDATE_CUSTOMER_REQUEST_FAILED: 'home/updateCustomerRequestFailed',

  DELETE_CUSTOMER_REQUEST: 'home/deleteCustomerRequest',
  DELETE_CUSTOMER_REQUEST_SUCCESS: 'home/deleteCustomerRequestSuccess',
  DELETE_CUSTOMER_REQUEST_FAILED: 'home/deleteCustomerRequestFailed',

  FETCH_MAP_PROFILE: 'home/fetchMapProfile',
  FETCH_MAP_PROFILE_SUCCESS: 'home/fetchMapProfileSuccess',
  FETCH_MAP_PROFILE_FAILED: 'home/fetchMapProfileFailed',

  MAP_PROFILE_DATA_CHANGED: 'home/mapProfileDataChanged',
  WASTE_DUMP_DATA_CHANGED: 'home/wasteDumpDataChanged',
  RESET_MAP_PROFILE: 'home/resetMapProfile',

  POST_WASTE_DUMP: 'home/postWasteDump',
  POST_WASTE_DUMP_SUCCESS: 'home/postWasteDumpSuccess',
  POST_WASTE_DUMP_FAILED: 'home/postWasteDumpFailed',

  UPDATE_WASTE_DUMP: 'home/updateWasteDump',
  UPDATE_WASTE_DUMP_SUCCESS: 'home/updateWasteDumpSuccess',
  UPDATE_WASTE_DUMP_FAILED: 'home/updateWasteDumpFailed',

  DELETE_WASTE_DUMP: 'home/deleteWasteDump',
  DELETE_WASTE_DUMP_SUCCESS: 'home/deleteWasteDumpSuccess',
  DELETE_WASTE_DUMP_FAILED: 'home/deleteWasteDumpFailed',
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
  mapProfileData: {
    track: [],
    zone: [],
    customerUsedGeoObject: {},
    isBottomSheetShown: false,
    bottomSheetData: {},
    selectedGeoObjectIndex: -1,
    selectedGeoObjectId: '',
  },
  wasteDumpData: [],
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
      const {msg} = action.payload;
      return {
        ...state,
        loading: false,
        logMessage: {type: 'success', msg},
      };
    }

    case types.POST_CUSTOMER_REQUEST_FAILED: {
      const msg = action.payload;
      return {...state, loading: false, logMessage: {type: 'failed', msg}};
    }

    case types.UNSUBSCRIBE: {
      return {...state, loading: true};
    }

    case types.UNSUBSCRIBE_SUCCESS: {
      return {...state, loading: false};
    }

    case types.UNSUBSCRIBE_FAILED: {
      const {msg} = action.payload;
      return {...state, loading: false, logMessage: {type: 'failed', msg}};
    }

    case types.UPDATE_CUSTOMER_REQUEST: {
      return {...state, loading: true};
    }

    case types.UPDATE_CUSTOMER_REQUEST_SUCCESS: {
      const {msg, customerRequest} = action.payload;
      const listItemData = _.cloneDeep(state.listItemData);
      listItemData.customerRequest = customerRequest;
      return {
        ...state,
        loading: false,
        listItemData,
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

    case types.FETCH_MAP_PROFILE: {
      return {...state, loading: true};
    }

    case types.FETCH_MAP_PROFILE_SUCCESS: {
      const {property, data} = action.payload;
      const mapProfileData = _.cloneDeep(state.mapProfileData);
      mapProfileData[`${property}`] = data;
      return {...state, loading: false, mapProfileData};
    }

    case types.FETCH_MAP_PROFILE_FAILED: {
      const msg = action.payload;
      return {...state, loading: false, logMessage: {type: 'failed', msg}};
    }

    case types.MAP_PROFILE_DATA_CHANGED: {
      const {property, data} = action.payload;
      const mapProfileData = _.cloneDeep(state.mapProfileData);
      mapProfileData[`${property}`] = data;
      return {...state, mapProfileData};
    }

    case types.WASTE_DUMP_DATA_CHANGED: {
      const wasteDumpData = action.payload;
      return {...state, wasteDumpData};
    }

    case types.RESET_MAP_PROFILE: {
      return {
        ...state,
        mapProfileData: {
          track: [],
          zone: [],
          customerUsedGeoObject: {},
          isBottomSheetShown: false,
          bottomSheetData: {},
          selectedGeoObjectIndex: -1,
          selectedGeoObjectId: '',
        },
        wasteDumpData: [],
      };
    }

    case types.POST_WASTE_DUMP: {
      return {...state, loading: true};
    }

    case types.POST_WASTE_DUMP_SUCCESS: {
      const {msg} = action.payload;
      return {
        ...state,
        loading: false,
        logMessage: {type: 'success', msg},
      };
    }

    case types.POST_WASTE_DUMP_FAILED: {
      const msg = action.payload;
      return {...state, loading: false, logMessage: {type: 'failed', msg}};
    }

    case types.UPDATE_WASTE_DUMP: {
      return {...state, loading: true};
    }

    case types.UPDATE_WASTE_DUMP_SUCCESS: {
      const {msg} = action.payload;
      return {
        ...state,
        loading: false,
        logMessage: {type: 'success', msg},
      };
    }

    case types.UPDATE_WASTE_DUMP_FAILED: {
      const msg = action.payload;
      return {...state, loading: false, logMessage: {type: 'failed', msg}};
    }

    case types.DELETE_WASTE_DUMP: {
      return {...state, loading: true};
    }

    case types.DELETE_WASTE_DUMP_SUCCESS: {
      const {msg} = action.payload;
      return {
        ...state,
        loading: false,
        logMessage: {type: 'success', msg},
      };
    }

    case types.DELETE_WASTE_DUMP_FAILED: {
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

const unsubscribe = () => {
  return {type: types.UNSUBSCRIBE};
};

const unsubscribeSuccess = successData => {
  return {type: types.UNSUBSCRIBE_SUCCESS, payload: successData};
};

const unsubscribeFailed = failedData => {
  return {type: types.UNSUBSCRIBE_FAILED, payload: failedData};
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

const fetchMapProfile = () => {
  return {type: types.FETCH_MAP_PROFILE};
};

const fetchMapProfileSuccess = successData => {
  return {type: types.FETCH_MAP_PROFILE_SUCCESS, payload: successData};
};

const fetchMapProfileFailed = failedData => {
  return {type: types.FETCH_MAP_PROFILE_FAILED, payload: failedData};
};

const mapProfileDataChanged = mapProfileData => {
  return {type: types.MAP_PROFILE_DATA_CHANGED, payload: mapProfileData};
};

const wasteDumpDataChanged = wasteDumpData => {
  return {type: types.WASTE_DUMP_DATA_CHANGED, payload: wasteDumpData};
};

const resetMapProfile = () => {
  return {type: types.RESET_MAP_PROFILE};
};

const postWasteDump = () => {
  return {type: types.POST_WASTE_DUMP};
};

const postWasteDumpSuccess = successData => {
  return {type: types.POST_WASTE_DUMP_SUCCESS, payload: successData};
};

const postWasteDumpFailed = failedData => {
  return {type: types.POST_WASTE_DUMP_FAILED, payload: failedData};
};

const updateWasteDump = () => {
  return {type: types.UPDATE_WASTE_DUMP};
};

const updateWasteDumpSuccess = successData => {
  return {type: types.UPDATE_WASTE_DUMP_SUCCESS, payload: successData};
};

const updateWasteDumpFailed = failedData => {
  return {type: types.UPDATE_WASTE_DUMP_FAILED, payload: failedData};
};

const deleteWasteDump = () => {
  return {type: types.DELETE_WASTE_DUMP};
};

const deleteWasteDumpSuccess = successData => {
  return {type: types.DELETE_WASTE_DUMP_SUCCESS, payload: successData};
};

const deleteWasteDumpFailed = failedData => {
  return {type: types.DELETE_WASTE_DUMP_FAILED, payload: failedData};
};

export const internalActions = {
  fetchHomeListData,
  fetchHomeListDataSuccess,
  fetchHomeListDataFailed,

  fetchListItemData,
  fetchListItemDataSuccess,
  fetchListItemDataFailed,

  fetchGeoObjects,
  fetchGeoObjectsSuccess,
  fetchGeoObjectsFailed,

  postCustomerRequest,
  postCustomerRequestSuccess,
  postCustomerRequestFailed,

  unsubscribe,
  unsubscribeSuccess,
  unsubscribeFailed,

  updateCustomerRequest,
  updateCustomerRequestSuccess,
  updateCustomerRequestFailed,

  deleteCustomerRequest,
  deleteCustomerRequestSuccess,
  deleteCustomerRequestFailed,

  fetchMapProfile,
  fetchMapProfileSuccess,
  fetchMapProfileFailed,

  postWasteDump,
  postWasteDumpSuccess,
  postWasteDumpFailed,

  updateWasteDump,
  updateWasteDumpSuccess,
  updateWasteDumpFailed,

  deleteWasteDump,
  deleteWasteDumpSuccess,
  deleteWasteDumpFailed,
};

export const actions = {
  tabSelected,
  toggleHeaderOptions,
  customerRequestChanged,
  resetCustomerRequest,
  mapProfileDataChanged,
  wasteDumpDataChanged,
  resetMapProfile,
};
