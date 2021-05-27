import _ from 'lodash';
import moment from 'moment';
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
  CustomerUsedGeoObjectUrl,
  WasteDumpUrl,
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
  (listItemType, companyId, itemId) => async (dispatch, getState) => {
    try {
      dispatch(fetchListItemData());
      const customerId = await AsyncStorage.getItem('customerId');

      if (listItemType == 'aboutCompany') {
        const [
          companyDetailRes,
          companyServiceDetailRes,
          utilActionRes,
          wasteListRes,
        ] = await Promise.all([
          Client.get(
            CompanyUrl.getByRef('company-detail', 'companyId', companyId),
          ),
          Client.get(
            CompanyUrl.getByRef(
              'company-service-detail',
              'companyId',
              companyId,
            ),
          ),
          Client.post(UtilActionUrl.verify(), {
            type: 'companyServicesAndStatus',
            customerId,
            companyId: companyId,
          }),
          Client.get(WasteListUrl.getByRef('companyId', companyId)),
        ]);

        dispatch(
          fetchListItemDataSuccess({
            data: {
              companyDetail: companyDetailRes.data[0],
              companyServiceDetail: companyServiceDetailRes.data[0],
              companyServicesAndStatus:
                utilActionRes.data.companyServicesAndStatus,
              wasteList: wasteListRes.data,
            },
          }),
        );
      } else if (listItemType == 'aboutRequest') {
        const [
          companyDetailRes,
          companyServiceDetailRes,
          utilActionRes,
          wasteListRes,
          requestRes,
        ] = await Promise.all([
          Client.get(
            CompanyUrl.getByRef('company-detail', 'companyId', companyId),
          ),
          Client.get(
            CompanyUrl.getByRef(
              'company-service-detail',
              'companyId',
              companyId,
            ),
          ),
          Client.post(UtilActionUrl.verify(), {
            type: 'companyServicesAndStatus',
            customerId,
            companyId,
          }),
          Client.get(WasteListUrl.getByRef('companyId', companyId)),
          Client.get(CustomerRequestUrl.getById(itemId)),
        ]);

        if (requestRes) {
          requestRes.data.wasteDescription.forEach(wd => {
            wd.amount = wd.amount.toString();
          });
        }

        dispatch(
          fetchListItemDataSuccess({
            data: {
              companyDetail: companyDetailRes.data[0],
              companyServiceDetail: companyServiceDetailRes.data[0],
              companyServicesAndStatus:
                utilActionRes.data.companyServicesAndStatus,
              wasteList: wasteListRes.data,
              customerRequest: requestRes.data,
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
      for (let wd of customerRequest.wasteDescription) {
        wd.amount = parseInt(wd.amount);
      }
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

const thunkUpdateCustomerRequest = screenName => async (dispatch, getState) => {
  try {
    dispatch(updateCustomerRequest());

    const customerRequest = _.cloneDeep(
      getState().home.listItemData.customerRequest,
    );
    const editedCustomerRequest = _.cloneDeep(getState().home.customerRequest);
    customerRequest.wasteDescription = editedCustomerRequest.wasteDescription;
    customerRequest.workDescription = editedCustomerRequest.workDescription;
    customerRequest.requestCoordinate = editedCustomerRequest.requestCoordinate;
    for (let wd of customerRequest.wasteDescription) {
      wd.amount = parseInt(wd.amount);
    }
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
  (customerRequestId, screenName) => async (dispatch, getState) => {
    try {
      dispatch(deleteCustomerRequest());
      dispatch(toggleHeaderOptions());

      await Client.delete(CustomerRequestUrl.delete(customerRequestId));

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

const thunkFetchMapProfile = companyId => async (dispatch, getState) => {
  try {
    dispatch(fetchMapProfile());
    const customerId = await AsyncStorage.getItem('customerId');
    const [
      companyDetailRes,
      trackRes,
      zoneRes,
      customerUsedGeoObjectRes,
      wasteDumpRes,
    ] = await Promise.all([
      Client.get(CompanyUrl.getByRef('company-detail', 'companyId', companyId)),
      Client.get(GeoObjectUrl.getByRef('track', 'companyId', companyId)),
      Client.get(GeoObjectUrl.getByRef('zone', 'companyId', companyId)),
      Client.get(CustomerUsedGeoObjectUrl.getByRef('customerId', customerId)),
      Client.get(WasteDumpUrl.getByRef('customerId', customerId), {
        params: {companyId},
      }),
    ]);

    const track = trackRes.data;
    let usedTrack = undefined;
    if (customerUsedGeoObjectRes.data[0]) {
      usedTrack = customerUsedGeoObjectRes.data[0].usedTrack;
    }

    for (let e of track) {
      e.isPressable = true;
      e.isDumpBtnPressable = true;
      e.isEditBtnPressable = false;
      e.isClearBtnPressable = false;
      if (!_.isEmpty(usedTrack)) {
        for (let ut of usedTrack) {
          if (e.companyId._id == ut.companyId) {
            if (e._id != ut.trackId) {
              e.isPressable = false;
            } else {
              e.isDumpBtnPressable = false;
              e.isEditBtnPressable = true;
              e.isClearBtnPressable = true;
            }
          }
        }
      }
    }
    dispatch(
      fetchMapProfileSuccess({
        property: 'bottomSheetData',
        data: {companyDetail: companyDetailRes.data[0]},
      }),
    );
    dispatch(
      fetchMapProfileSuccess({
        property: 'track',
        data: trackRes.data,
      }),
    );
    dispatch(
      fetchMapProfileSuccess({
        property: 'zone',
        data: zoneRes.data,
      }),
    );
    dispatch(
      fetchMapProfileSuccess({
        property: 'customerUsedGeoObject',
        data: customerUsedGeoObjectRes.data[0],
      }),
    );
    if (!_.isEmpty(wasteDumpRes)) {
      dispatch(
        fetchMapProfileSuccess({
          property: 'bottomSheetData',
          data: {
            companyDetail: companyDetailRes.data[0],
            wasteDump: wasteDumpRes.data[0],
          },
        }),
      );

      for (let dw of wasteDumpRes.data[0].dumpedWaste) {
        dw.wasteListId = dw.wasteListId._id;
        dw.amount = dw.amount.toString();
      }
      dispatch(wasteDumpDataChanged(wasteDumpRes.data[0].dumpedWaste));
    }
  } catch (err) {
    requestErrorLog(err);
    dispatch(fetchMapProfileFailed('Data failed to load'));
  }
};

const thunkPostWasteDump =
  (companyId, selectedGeoObjectId, screenName) =>
  async (dispatch, getState) => {
    try {
      dispatch(postWasteDump());
      const customerId = await AsyncStorage.getItem('customerId');
      const dumpedWaste = _.cloneDeep(getState().home.wasteDumpData);
      for (let dw of dumpedWaste) {
        dw.amount = parseInt(dw.amount);
      }
      const wasteDumpData = {};
      wasteDumpData.companyId = companyId;
      wasteDumpData.customerId = customerId;
      wasteDumpData.geoObjectType = 'track';
      wasteDumpData.geoObjectId = selectedGeoObjectId;
      wasteDumpData.addedDate = moment().format('YYYY-MM-DDTHH:mm:ss[Z]');
      wasteDumpData.dumpedWaste = dumpedWaste;
      wasteDumpData.isCollected = false;

      await Client.post(WasteDumpUrl.post(), wasteDumpData);

      dispatch(postWasteDumpSuccess({msg: 'Waste dumped'}));
      navigate(screenName);
    } catch (err) {
      requestErrorLog(err);
      dispatch(postWasteDumpFailed('Data post failed'));
      navigate(screenName);
    }
  };

const thunkUpdateWasteDump =
  (companyId, selectedGeoObjectId, screenName) =>
  async (dispatch, getState) => {
    try {
      dispatch(updateWasteDump());
      const customerId = await AsyncStorage.getItem('customerId');
      const wasteDumpId = _.clone(
        getState().home.mapProfileData.bottomSheetData.wasteDump._id,
      );
      const dumpedWaste = _.cloneDeep(getState().home.wasteDumpData);
      for (let dw of dumpedWaste) {
        dw.amount = parseInt(dw.amount);
      }
      const wasteDumpData = {};
      wasteDumpData.companyId = companyId;
      wasteDumpData.customerId = customerId;
      wasteDumpData.geoObjectType = 'track';
      wasteDumpData.geoObjectId = selectedGeoObjectId;
      wasteDumpData.addedDate = moment().format('YYYY-MM-DDTHH:mm:ss[Z]');
      wasteDumpData.dumpedWaste = dumpedWaste;
      wasteDumpData.isCollected = false;

      await Client.put(WasteDumpUrl.put(wasteDumpId), wasteDumpData);

      dispatch(updateWasteDumpSuccess({msg: 'Waste dumped'}));
      navigate(screenName);
    } catch (err) {
      requestErrorLog(err);
      dispatch(updateWasteDumpFailed('Data post failed'));
      navigate(screenName);
    }
  };

const thunkDeleteWasteDump = () => async (dispatch, getState) => {
  try {
    dispatch(deleteWasteDump());

    const mapProfileData = _.cloneDeep(getState().home.mapProfileData);
    let {bottomSheetData, track} = mapProfileData;

    for (let e of track) {
      e.isPressable = true;
      e.isDumpBtnPressable = true;
      e.isEditBtnPressable = false;
      e.isClearBtnPressable = false;
    }

    const wasteDumpId = _.clone(
      getState().home.mapProfileData.bottomSheetData.wasteDump._id,
    );
    await Client.delete(WasteDumpUrl.delete(wasteDumpId));

    dispatch(
      fetchMapProfileSuccess({
        property: 'track',
        data: track,
      }),
    );
    dispatch(
      fetchMapProfileSuccess({
        property: 'customerUsedGeoObject',
        data: {},
      }),
    );

    bottomSheetData.wasteDump = {};
    dispatch(
      fetchMapProfileSuccess({
        property: 'bottomSheetData',
        data: bottomSheetData,
      }),
    );
    dispatch(wasteDumpDataChanged([]));
    dispatch(
      mapProfileDataChanged({property: 'isBottomSheetShown', data: false}),
    );
    dispatch(
      mapProfileDataChanged({property: 'selectedGeoObjectId', data: ''}),
    );
    dispatch(
      mapProfileDataChanged({property: 'selectedGeoObjectIndex', data: -1}),
    );
    dispatch(deleteWasteDumpSuccess({msg: 'Data delete success'}));
  } catch (err) {
    requestErrorLog(err);
    dispatch(deleteWasteDumpFailed('Data delete failed'));
  }
};

export const actions = {
  tabSelected,
  toggleHeaderOptions,
  customerRequestChanged,
  mapProfileDataChanged,
  wasteDumpDataChanged,
  resetMapProfile,
  thunkResetCustomerRequest,
  thunkFetchHomeListData,
  thunkFetchListItemData,
  thunkFetchGeoObjects,
  thunkPostCustomerRequest,
  thunkUpdateCustomerRequest,
  thunkDeleteCustomerRequest,
  thunkFetchMapProfile,
  thunkPostWasteDump,
  thunkUpdateWasteDump,
  thunkDeleteWasteDump,
};
