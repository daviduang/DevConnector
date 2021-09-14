import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

/**
 * State: a list of alerts(in payload)
 */

// Initialize a alert object as empty list
const initialState = [];

// Update the list of alerts(state) based on the options
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ALERT:
      // Add alert object to the list(state)
      // ...: make a copy of original list
      // this list stores all the payloads(alert)
      return [...state, action.payload];
    case REMOVE_ALERT:
      // Filter out the alert by id
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
}
