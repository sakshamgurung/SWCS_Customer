export const types = {
  FETCH_WASTE_DUMP_LIST: 'inbox/fetchWasteDumpList',
  FETCH_WASTE_DUMP_LIST_SUCCESS: 'inbox/fetchWasteDumpListSuccess',
  FETCH_WASTE_DUMP_LIST_FAILED: 'inbox/fetchWasteDumpListFailed',
};

export const initialState = {
  loading: false,
  wasteDumpList: [],
  logMessage: {type: '', msg: ''}, //type = failed, success
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_WASTE_DUMP_LIST: {
      return {...state, loading: false};
    }

    case types.FETCH_WASTE_DUMP_LIST_SUCCESS: {
      const {wasteDumpList} = action.payload;
      return {
        ...state,
        loading: false,
        wasteDumpList,
      };
    }

    case types.FETCH_WASTE_DUMP_LIST_FAILED: {
      const {msg} = action.payload;
      return {...state, loading: false, logMessage: {type: 'failed', msg}};
    }

    default:
      return {...state};
  }
}

const fetchWasteDumpList = () => {
  return {type: types.FETCH_WASTE_DUMP_LIST};
};

const fetchWasteDumpListSuccess = successData => {
  return {type: types.FETCH_WASTE_DUMP_LIST_SUCCESS, payload: successData};
};

const fetchWasteDumpListFailed = failedData => {
  return {type: types.FETCH_WASTE_DUMP_LIST_FAILED, payload: failedData};
};

export const actions = {};

export const internalActions = {
  fetchWasteDumpList,
  fetchWasteDumpListSuccess,
  fetchWasteDumpListFailed,
};
