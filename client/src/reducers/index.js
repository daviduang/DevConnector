import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import post from "./post";
/**
 * Root Reducer, for all reducer's registration
 */
export default combineReducers({
  alert,
  auth,
  profile,
  post,
});
