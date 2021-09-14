import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from "./types";

// Load user
export const loadUser = () => async (dispatch) => {
  // If there is a token in the local storage,
  // then set the auth header with token to the req
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

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
