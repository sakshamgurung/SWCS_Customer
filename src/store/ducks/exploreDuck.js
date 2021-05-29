import _ from 'lodash';

export const types = {};

export const initialState = {
  logMessage: {type: '', msg: ''}, //type = failed, success
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return {...state};
  }
}

export const internalActions = {};
export const actions = {};
