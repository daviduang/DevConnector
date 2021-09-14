import { REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/types";

/**
 * State: an object tracking user info
 */

// Construct register state object
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  // Destruct action, get type, payload
  const { type, payload } = action;
  switch (type) {
    // If registeration succeed
    case REGISTER_SUCCESS:
      // Set the token to local storage
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    // If registration failed
    case REGISTER_FAIL:
      // Remove token from local storage if there is one
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
}
