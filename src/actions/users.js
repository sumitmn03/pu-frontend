import axios from "axios";
// import { returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import {
  GET_ALL_USERS,
  GET_SINGLE_USER,
  FOLLOWING,
  FOLLOW,
  UNFOLLOW,
  GET_PROFILE_POLLS_OTHER_USERS,
  SET_PROFILE_POLLS_TO_NORMAL
} from "./types";

// GET ALL USERS

export const getAllUsers = () => (dispatch, getState) => {
  axios
    .get("http://localhost:8000/api/getallusers", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      // dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// GET A SINGLE USER

export const getSingleUser = user_id => (dispatch, getState) => {
  axios
    .get(
      `http://localhost:8000/api/getallusers/${user_id}`,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: GET_SINGLE_USER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      // dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// get all the following users

export const following = () => (dispatch, getState) => {
  axios
    .get("http://localhost:8000/api/followingusers", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: FOLLOWING,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      // dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// follow

export const follow = following_user_id => (dispatch, getState) => {
  axios
    .post(
      `http://localhost:8000/api/follow/`,
      JSON.stringify({ following: following_user_id }),
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: FOLLOW,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      // dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// unfollow

export const unfollow = (following_id, following_index) => (
  dispatch,
  getState
) => {
  axios
    .delete(
      `http://localhost:8000/api/follow/${following_id}/`,
      tokenConfig(getState)
    )
    .then(
      dispatch({
        type: UNFOLLOW,
        payload: { following_index }
      })
    )
    .catch(err => {
      console.log(err);
      // dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// GET POSTS
export const getProfilePollsOfOtherUser = next_link => (dispatch, getState) => {
  axios
    .get(next_link, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_PROFILE_POLLS_OTHER_USERS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("something wrong !!");
    });
};

// re retrieve timeline posts

export const setProfilePollsToNormal = () => dispatch => {
  dispatch({
    type: SET_PROFILE_POLLS_TO_NORMAL
  });
};
