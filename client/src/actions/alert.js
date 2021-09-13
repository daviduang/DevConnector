import { SET_ALERT, REMOVE_ALERT } from "./types";
import { v4 as uuidv4 } from "uuid";

export const setAlert =
  (msg, alertType, timeout = 5000) =>
  (dispatch) => {
    {
      // Randomly generate id
      const id = uuidv4();

      // Generate the alert state object
      dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id },
      });

      // Set a lifecycle for all alert state objects (default: die after 5s)
      setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
    }
  };
