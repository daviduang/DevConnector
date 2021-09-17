import { SET_ALERT, REMOVE_ALERT } from "./types";
import { v4 as uuidv4 } from "uuid";

// Destructure the params, with a default timeout of 5s
export const setAlert =
  (msg, alertType, timeout = 5000) =>
  (dispatch) => {
    // Randomly generate id
    const id = uuidv4();

    // Construct the alert state object, pass it to reducer
    dispatch({
      type: SET_ALERT,

      // construct a payload object
      payload: { msg, alertType, id },
    });

    // Set a lifecycle for the alert state objects
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };
