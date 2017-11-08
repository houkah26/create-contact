import { combineReducers } from "redux";

import {
  CREATE_CONTACT_REQUEST,
  CREATE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAILURE,
  CLEAR_CREATE_CONTACT
} from "../actions/types.js";

const contact = () => {
  const result = (state = {}, action) => {
    switch (action.type) {
      case CREATE_CONTACT_SUCCESS:
        const data = action.payload;
        return {
          name: `${data.givenName} ${data.surname}`
        };
      case CLEAR_CREATE_CONTACT:
      case CREATE_CONTACT_FAILURE:
      case CREATE_CONTACT_REQUEST:
        return {};
      default:
        return state;
    }
  };

  const isRequesting = (state = false, action) => {
    switch (action.type) {
      case CREATE_CONTACT_REQUEST:
        return true;
      case CREATE_CONTACT_SUCCESS:
      case CREATE_CONTACT_FAILURE:
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = "", action) => {
    switch (action.type) {
      case CREATE_CONTACT_REQUEST:
      case CREATE_CONTACT_SUCCESS:
      case CLEAR_CREATE_CONTACT:
        return "";
      case CREATE_CONTACT_FAILURE:
        return action.payload;
      default:
        return state;
    }
  };

  return combineReducers({ result, isRequesting, errorMessage });
};

export default contact;

export const getName = state => state.result.name;
export const getIsRequesting = state => state.isRequesting;
export const getErrorMessage = state => state.errorMessage;
