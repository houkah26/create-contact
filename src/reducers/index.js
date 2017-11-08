import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import contactReducer, * as fromContact from "./contactReducer";

export default combineReducers({
  contact: contactReducer(),
  form: formReducer
});

// Quote Selectors ----------------------------------------
export const getContactName = state => fromContact.getName(state.contact);
export const getIsContactRequesting = state =>
  fromContact.getIsRequesting(state.contact);

export const getContactErrorMessage = state =>
  fromContact.getErrorMessage(state.contact);
