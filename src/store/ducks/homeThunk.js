import _ from 'lodash';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
