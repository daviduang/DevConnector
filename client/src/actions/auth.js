import axios from "axios";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";
import { setAlert } from "./alert";

// Destruct the params, set headers
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Construct a res body by params
    const body = JSON.stringify({ name, email, password });

    try {
      // Get response from the post request
      const res = await axios.post("/api/users", body, config);

      // Notify the reducer with a success registration
      // dispatch: Call action in reducers/auth.js
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data, // the token
      });
    } catch (error) {
      // Collect all error msgs sent from server
      const errors = error.response.data.errors;

      if (errors) {
        // For each error, print an error alert
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      // Notify the reducer with a failed regestration
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
