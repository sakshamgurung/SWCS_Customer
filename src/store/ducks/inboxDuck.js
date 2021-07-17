export const types = {
  TAB_SELECTED: 'inbox/tabSelected',

  FETCH_NOTIFICATION_LIST: 'inbox/fetchNotificationList',
  FETCH_NOTIFICATION_LIST_SUCCESS: 'inbox/fetchNotificationListSuccess',
  FETCH_NOTIFICATION_LIST_FAILED: 'inbox/fetchNotificationListFailed',

  FETCH_SCHEDULE_LIST: 'inbox/fetchScheduleList',
  FETCH_SCHEDULE_LIST_SUCCESS: 'inbox/fetchScheduleListSuccess',
  FETCH_SCHEDULE_LIST_FAILED: 'inbox/fetchScheduleListFailed',

  FETCH_WORK: 'inbox/fetchWork',
  FETCH_WORK_SUCCESS: 'inbox/fetchWorkSuccess',
  FETCH_WORK_FAILED: 'inbox/fetchWorkFailed',
};

export const initialState = {
  selectedTab: 'notification',
  loading: false,
  notificationList: {},
  scheduleList: {},
  work: {},
  logMessage: {type: '', msg: ''}, //type = failed, success
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.TAB_SELECTED: {
      const selectedTab = action.payload;
      return {...state, selectedTab};
    }

    case types.FETCH_NOTIFICATION_LIST: {
      return {...state, loading: false};
    }

    case types.FETCH_NOTIFICATION_LIST_SUCCESS: {
      const {notificationList} = action.payload;
      return {
        ...state,
        loading: false,
        notificationList,
      };
    }

    case types.FETCH_NOTIFICATION_LIST_FAILED: {
      const {msg} = action.payload;
      return {...state, loading: false, logMessage: {type: 'failed', msg}};
    }

    case types.FETCH_SCHEDULE_LIST: {
      return {...state, loading: false};
    }

    case types.FETCH_SCHEDULE_LIST_SUCCESS: {
      const {scheduleList} = action.payload;
      return {
        ...state,
        loading: false,
        scheduleList,
      };
    }

    case types.FETCH_SCHEDULE_LIST_FAILED: {
      const {msg} = action.payload;
      return {...state, loading: false, logMessage: {type: 'failed', msg}};
    }

    case types.FETCH_WORK: {
      return {...state, loading: false};
    }

    case types.FETCH_WORK_SUCCESS: {
      const {work} = action.payload;
      return {
        ...state,
        loading: false,
        work,
      };
    }

    case types.FETCH_WORK_FAILED: {
      const {msg} = action.payload;
      return {...state, loading: false, logMessage: {type: 'failed', msg}};
    }

    default:
      return {...state};
  }
}

const tabSelected = selectedTab => {
  return {type: types.TAB_SELECTED, payload: selectedTab};
};

const fetchNotificationList = () => {
  return {type: types.FETCH_NOTIFICATION_LIST};
};

const fetchNotificationListSuccess = successData => {
  return {type: types.FETCH_NOTIFICATION_LIST_SUCCESS, payload: successData};
};

const fetchNotificationListFailed = failedData => {
  return {type: types.FETCH_NOTIFICATION_LIST_FAILED, payload: failedData};
};

const fetchScheduleList = () => {
  return {type: types.FETCH_SCHEDULE_LIST};
};

const fetchScheduleListSuccess = successData => {
  return {type: types.FETCH_SCHEDULE_LIST_SUCCESS, payload: successData};
};

const fetchScheduleListFailed = failedData => {
  return {type: types.FETCH_SCHEDULE_LIST_FAILED, payload: failedData};
};

const fetchWork = () => {
  return {type: types.FETCH_WORK};
};

const fetchWorkSuccess = successData => {
  return {type: types.FETCH_WORK_SUCCESS, payload: successData};
};

const fetchWorkFailed = failedData => {
  return {type: types.FETCH_WORK_FAILED, payload: failedData};
};

export const actions = {
  tabSelected,
};

export const internalActions = {
  fetchNotificationList,
  fetchNotificationListSuccess,
  fetchNotificationListFailed,
  fetchScheduleList,
  fetchScheduleListSuccess,
  fetchScheduleListFailed,
  fetchWork,
  fetchWorkSuccess,
  fetchWorkFailed,
};
