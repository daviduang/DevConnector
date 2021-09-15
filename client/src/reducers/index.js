import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
/**
 * Root Reducer
 */
export default combineReducers({
  alert,
  auth,
  profile,
});
