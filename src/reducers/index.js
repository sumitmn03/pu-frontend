import { combineReducers } from "redux";

import current_user from "./current_user";

import navigation from "./navigation";
import posts from "../reducers/posts";
import auth from "./auth";
// import errors from "../../../../../oc/oc/frontend/src/reducers/errors";
// import messages from "../../../../../oc/oc/frontend/src/reducers/messages";
import users from "./users";

// import PostToBeUpdated from "../../../../../oc/oc/frontend/src/reducers/PostToBeUpdated";
// import post_stats from "../../../../../oc/oc/frontend/src/reducers/stats";
import notifications from "./notifications";
import search from "./search";
import post from "./post";
import comment from "./comment";

export default combineReducers({
  navigation,
  current_user,
  posts,
  auth,
  notifications,
  users,
  search,
  post,
  comment

  // errors,
  // messages,
  // PostToBeUpdated,
  // post_stats,
});
