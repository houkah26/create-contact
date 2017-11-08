import axios from "axios";

import {
  CREATE_CONTACT_REQUEST,
  CREATE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAILURE,
  CLEAR_CREATE_CONTACT
} from "../types.js";
import { API_URL } from "../../constants";
import errorHandler from "../handlers/errorHandler";
import { getIsContactRequesting } from "../../reducers/index";

// const exampleContact = {
//   gender: "male",
//   title: "Mr.",
//   givenName: "Nicholas",
//   middleInitial: "A",
//   surname: "Heath",
//   streetAddress: "2950 Davis Avenue",
//   city: "Petaluma",
//   state: "CA",
//   stateFull: "California",
//   zipCode: 94952,
//   emailAddress: "NicholasAHeath@einrot.com",
//   username: "Adminaraince54",
//   password: "Shai5EiJ9ph",
//   browserUserAgent:
//     "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.1 Safari/603.1.30",
//   telephoneNumber: "707-776-2456",
//   mothersMaiden: "Mercedes",
//   birthday: "5/4/1954",
//   age: 63,
//   ccType: "Visa",
//   ccNumber: 4485879514125361,
//   cvv2: 888,
//   ccExpires: "5/2021",
//   nationalId: "562-50-6115",
//   ups: "1Z 549 157 06 5192 731 7",
//   westernUnionMTCN: 729671227,
//   moneyGramMTCN: 91334794,
//   color: "Green",
//   occupation: "Patient representative",
//   company: "Casa Bonita",
//   vehicle: "2015 BMW X4",
//   domain: "weirdwithwords.com"
// };

//= =====================
// Contact Action Creators
//= =====================
export const createContact = newContact => (dispatch, getState) => {
  if (getIsContactRequesting(getState())) {
    return;
  }

  dispatch({
    type: CREATE_CONTACT_REQUEST
  });

  axios
    .post(`${API_URL}/contacts`, newContact)
    .then(response => {
      dispatch({
        type: CREATE_CONTACT_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      errorHandler(dispatch, error, CREATE_CONTACT_FAILURE);
    });
};

export const clearContact = () => dispatch => {
  dispatch({
    type: CLEAR_CREATE_CONTACT
  });
};
