import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

// A list to store all alert objects
const initialState = [];

// Generate/Remove the alert state object based on the options
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ALERT:
      // Add alert object to the list(state)
      return [...state, action.payload];
    case REMOVE_ALERT:
      // Filter out the alert by id
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
}
