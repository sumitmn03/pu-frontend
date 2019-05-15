import axios from "axios";
// import { returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import {
  VOTE_GET_POSTS,
  VOTE_INCREMENT_OPTION_COUNT,
  VOTE_DECREMENT_OPTION_COUNT,
  SET_VOTE_PAGE_TO_NORMAL
} from "./types";

// GET POSTS
export const getPosts = next_link => (dispatch, getState) => {
  axios
    .get(next_link, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: VOTE_GET_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("something wrong !!");
    });
};

// decrement_then_increment

// I thought to use async await but it's working just with the promise

export const decrement_then_increment = (
  last_option_opted_id,
  opted_by_id,
  count_of_previous_option_opted,
  post_index,
  last_option_opted_index,
  option_id,
  post_id,
  count,
  option_index
) => (dispatch, getState) => {
  count_of_previous_option_opted -= 1;
  axios
    .delete(
      `http://localhost:8000/api/optedby/${opted_by_id}/`,
      tokenConfig(getState)
    )
    .then(() => {
      axios
        .patch(
          `http://localhost:8000/api/options/${last_option_opted_id}/`,
          JSON.stringify({
            count: count_of_previous_option_opted
          }),
          tokenConfig(getState)
        )
        .then(option_result => {
          dispatch({
            type: VOTE_DECREMENT_OPTION_COUNT,
            payload: {
              decrement_option_result: option_result.data,
              decrement_post_index: post_index,
              decrement_option_index: last_option_opted_index
            }
          });
          dispatch(
            incrementOption(option_id, post_id, count, post_index, option_index)
          );
        });
    })
    .catch(err => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      console.log(err);
    });
};

// DECREMENT THE COUNT OF THE OPTION
export const decrementOption = (
  last_option_opted_id,
  opted_by_id,
  count_of_previous_option_opted,
  post_index,
  last_option_opted_index
) => (dispatch, getState) => {
  count_of_previous_option_opted -= 1;
  axios
    .delete(
      `http://localhost:8000/api/optedby/${opted_by_id}/`,
      tokenConfig(getState)
    )
    .then(() => {
      axios
        .patch(
          `http://localhost:8000/api/options/${last_option_opted_id}/`,
          JSON.stringify({
            count: count_of_previous_option_opted
          }),
          tokenConfig(getState)
        )
        .then(option_result => {
          dispatch({
            type: VOTE_DECREMENT_OPTION_COUNT,
            payload: {
              decrement_option_result: option_result.data,
              decrement_post_index: post_index,
              decrement_option_index: last_option_opted_index
            }
          });
        });
    })
    .catch(err => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      console.log(err);
    });
};

// INCREMENT THE COUNT OF THE OPTION
export const incrementOption = (
  posts_option,
  post_id,
  count,
  post_index,
  option_index
) => (dispatch, getState) => {
  count += 1;
  axios
    .post(
      `http://localhost:8000/api/optedby/`,
      JSON.stringify({ posts: post_id, posts_option }),
      tokenConfig(getState)
    )
    .then(optedby_result => {
      axios
        .patch(
          `http://localhost:8000/api/options/${posts_option}/`,
          JSON.stringify({ count }),
          tokenConfig(getState)
        )
        .then(option_result => {
          dispatch({
            type: VOTE_INCREMENT_OPTION_COUNT,
            payload: {
              optedby_result: optedby_result.data,
              increment_option_result: option_result.data,
              increment_post_index: post_index,
              increment_option_index: option_index
            }
          });
        });
    })
    .catch(err => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      console.log(err);
    });
};

// re retrieve votepage posts

export const setVotePageToNormal = () => dispatch => {
  dispatch({
    type: SET_VOTE_PAGE_TO_NORMAL
  });
};
