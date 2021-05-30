import _ from 'lodash';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {actions as homeActions, internalActions} from './homeDuck';
import {navigate} from '../navigationService';
import {requestErrorLog} from 'util/log';
import {
  Client,
  UtilActionUrl,
  CompanyUrl,
  WasteListUrl,
  CustomerRequestUrl,
  SubscriptionUrl,
  GeoObjectUrl,
  CustomerUsedGeoObjectUrl,
  WasteDumpUrl,
} from 'api';

const thunkFetchHomeListData = () => async dispatch => {
  try {
    dispatch(internalActions.fetchHomeListData());

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
      internalActions.fetchHomeListDataSuccess({
        property: 'allServiceListData',
        data: allServiceRes.data,
      }),
    );
    dispatch(
      internalActions.fetchHomeListDataSuccess({
        property: 'requestListData',
        data: requestRes.data,
      }),
    );
    dispatch(
      internalActions.fetchHomeListDataSuccess({
        property: 'subscriptionListData',
        data: subscriptionRes.data,
      }),
    );
  } catch (err) {
    requestErrorLog(err);
    dispatch(internalActions.fetchHomeListDataFailed('Data failed to load'));
  }
};

const thunkFetchListItemData =
  (listItemType, companyId, itemId) => async (dispatch, getState) => {
    try {
      dispatch(internalActions.fetchListItemData());
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
          internalActions.fetchListItemDataSuccess({
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
          internalActions.fetchListItemDataSuccess({
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
      internalActions.dispatch(fetchListItemDataFailed('Data failed to load'));
    }
  };

const thunkFetchGeoObjects = companyId => async (dispatch, getState) => {
  try {
    dispatch(internalActions.fetchGeoObjects());

    const [trackRes, zoneRes] = await Promise.all([
      Client.get(GeoObjectUrl.getAll(companyId, 'track')),
      Client.get(GeoObjectUrl.getAll(companyId, 'zone')),
    ]);
    dispatch(
      internalActions.fetchGeoObjectsSuccess({
        track: trackRes.data,
        zone: zoneRes.data,
      }),
    );
  } catch (err) {
    requestErrorLog(err);
    dispatch(internalActions.fetchGeoObjectsFailed('Data failed to load'));
  }
};

const thunkPostCustomerRequest =
  (companyId, serviceType, screenName) => async (dispatch, getState) => {
    try {
      dispatch(internalActions.postCustomerRequest());

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
          internalActions.postCustomerRequestSuccess({
            companyServicesAndStatus,
            msg: 'Request send success',
          }),
        );
        dispatch(homeActions.resetCustomerRequest());
        navigate(screenName);
      }
    } catch (err) {
      requestErrorLog(err);
      dispatch(
        internalActions.postCustomerRequestFailed('Failed to post request'),
      );
      dispatch(homeActions.resetCustomerRequest());
      navigate(screenName);
    }
  };

const thunkUpdateCustomerRequest = screenName => async (dispatch, getState) => {
  try {
    dispatch(internalActions.updateCustomerRequest());

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
        internalActions.updateCustomerRequestSuccess({
          msg: 'Request update success',
          customerRequest: modifiedCustomerRequest,
        }),
      );
      dispatch(homeActions.resetCustomerRequest());
      navigate(screenName);
    }
  } catch (err) {
    requestErrorLog(err);
    dispatch(
      internalActions.updateCustomerRequestFailed('Failed to update request'),
    );
    dispatch(homeActions.resetCustomerRequest());
    navigate(screenName);
  }
};

const thunkDeleteCustomerRequest =
  customerRequestId => async (dispatch, getState) => {
    try {
      dispatch(internalActions.deleteCustomerRequest());
      dispatch(homeActions.toggleHeaderOptions());

      await Client.delete(CustomerRequestUrl.delete(customerRequestId));

      dispatch(
        internalActions.deleteCustomerRequestSuccess({
          msg: 'Request update success',
        }),
      );
    } catch (err) {
      requestErrorLog(err);
      dispatch(
        internalActions.deleteCustomerRequestFailed('Failed to update request'),
      );
    }
  };

const thunkFetchMapProfile = companyId => async (dispatch, getState) => {
  try {
    dispatch(internalActions.fetchMapProfile());
    const customerId = await AsyncStorage.getItem('customerId');
    const [
      companyDetailRes,
      trackRes,
      zoneRes,
      customerUsedGeoObjectRes,
      utilActionRes,
      wasteDumpRes,
    ] = await Promise.all([
      Client.get(CompanyUrl.getByRef('company-detail', 'companyId', companyId)),
      Client.get(GeoObjectUrl.getByRef('track', 'companyId', companyId)),
      Client.get(GeoObjectUrl.getByRef('zone', 'companyId', companyId)),
      Client.get(CustomerUsedGeoObjectUrl.getByRef('customerId', customerId)),
      Client.post(UtilActionUrl.verify(), {
        type: 'companyServicesAndStatus',
        customerId,
        companyId: companyId,
      }),
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

    const companyServicesAndStatus =
      utilActionRes.data.companyServicesAndStatus;
    const {subscription} = companyServicesAndStatus;
    for (let e of track) {
      if (subscription != 'unsubscribe') {
        e.isDumpBtnPressable = false;
      }
    }

    dispatch(
      internalActions.fetchMapProfileSuccess({
        property: 'bottomSheetData',
        data: {companyDetail: companyDetailRes.data[0]},
      }),
    );
    dispatch(
      internalActions.fetchMapProfileSuccess({
        property: 'track',
        data: trackRes.data,
      }),
    );
    dispatch(
      internalActions.fetchMapProfileSuccess({
        property: 'zone',
        data: zoneRes.data,
      }),
    );
    dispatch(
      internalActions.fetchMapProfileSuccess({
        property: 'customerUsedGeoObject',
        data: customerUsedGeoObjectRes.data[0],
      }),
    );
    if (!_.isEmpty(wasteDumpRes)) {
      dispatch(
        internalActions.fetchMapProfileSuccess({
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
      dispatch(
        homeActions.wasteDumpDataChanged(wasteDumpRes.data[0].dumpedWaste),
      );
    }
  } catch (err) {
    requestErrorLog(err);
    dispatch(internalActions.fetchMapProfileFailed('Data failed to load'));
  }
};

const thunkPostWasteDump =
  (companyId, selectedGeoObjectId, screenName) =>
  async (dispatch, getState) => {
    try {
      dispatch(internalActions.postWasteDump());
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

      dispatch(internalActions.postWasteDumpSuccess({msg: 'Waste dumped'}));
      navigate(screenName);
    } catch (err) {
      requestErrorLog(err);
      dispatch(internalActions.postWasteDumpFailed('Data post failed'));
      navigate(screenName);
    }
  };

const thunkUpdateWasteDump =
  (companyId, selectedGeoObjectId, screenName) =>
  async (dispatch, getState) => {
    try {
      dispatch(internalActions.updateWasteDump());
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

      dispatch(internalActions.updateWasteDumpSuccess({msg: 'Waste dumped'}));
      navigate(screenName);
    } catch (err) {
      requestErrorLog(err);
      dispatch(internalActions.updateWasteDumpFailed('Data post failed'));
      navigate(screenName);
    }
  };

const thunkDeleteWasteDump = () => async (dispatch, getState) => {
  try {
    dispatch(internalActions.deleteWasteDump());

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
      internalActions.fetchMapProfileSuccess({
        property: 'track',
        data: track,
      }),
    );
    dispatch(
      internalActions.fetchMapProfileSuccess({
        property: 'customerUsedGeoObject',
        data: {},
      }),
    );

    bottomSheetData.wasteDump = {};
    dispatch(
      internalActions.fetchMapProfileSuccess({
        property: 'bottomSheetData',
        data: bottomSheetData,
      }),
    );
    dispatch(homeActions.wasteDumpDataChanged([]));
    dispatch(
      homeActions.mapProfileDataChanged({
        property: 'isBottomSheetShown',
        data: false,
      }),
    );
    dispatch(
      homeActions.mapProfileDataChanged({
        property: 'selectedGeoObjectId',
        data: '',
      }),
    );
    dispatch(
      homeActions.mapProfileDataChanged({
        property: 'selectedGeoObjectIndex',
        data: -1,
      }),
    );
    dispatch(
      internalActions.deleteWasteDumpSuccess({msg: 'Data delete success'}),
    );
  } catch (err) {
    requestErrorLog(err);
    dispatch(internalActions.deleteWasteDumpFailed('Data delete failed'));
  }
};

export const actions = {
  ...homeActions,
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
