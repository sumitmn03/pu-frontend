import { NAVIGATION } from "./types";

// GET POSTS

export const navigate = navigate_to => dispatch => {
  dispatch({
    type: NAVIGATION,
    payload: navigate_to
  });
};
