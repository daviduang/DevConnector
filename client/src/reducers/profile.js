import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
} from "../actions/types";

const initialState = {
  // Individual profile page:
  // 1. Logged in user profile page,
  // 2. other user's profile page that is currently viewed
  profile: null,

  // Profile listing page
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  // Destruct action, get type, payload
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };

    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };

    case GET_REPOS:
      return { ...state, repos: payload, loading: false };

    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    // Reset profile when loggout
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repo: [],
        loading: false,
      };

    default: {
      return state;
    }
  }
}
