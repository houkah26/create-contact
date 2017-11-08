import { has as _has } from "lodash";

// Error handler
const errorHandler = (dispatch, error, type, dataType) => {
  console.log("error handler:", type, error);
  console.log(error.name);
  console.log(error.message);

  // check for error message otherwise set as network error
  let errorMessage;

  if (!error.response) {
    dispatch({
      type,
      dataType,
      payload: error.message
    });

    return;
  }

  const containsMessage = _has(error.response, "data.message");
  if (containsMessage) {
    errorMessage = error.response.data.message;
  } else {
    errorMessage = "Network Error: Please wait and try again.";
  }

  // if there is no message and status code is 401, send unauthorized error message
  if (
    _has(error.response, "status") &&
    error.response.status === 401 &&
    !containsMessage
  ) {
    dispatch({
      type,
      dataType,
      payload: "You are not authorized to do this. Please login and try again."
    });
  } else {
    dispatch({
      type,
      dataType,
      payload: errorMessage
    });
  }
};

export default errorHandler;
