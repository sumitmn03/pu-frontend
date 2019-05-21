import axios from "axios";
// import { returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import {
  GET_SINGLE_POST,
  GET_COMMENTS,
  SET_COMMENTS_TO_NORMAL,
  INCREMENT_OPTION_COUNT_OF_DETAILED_POST,
  DECREMENT_OPTION_COUNT_OF_DETAILED_POST,
  DETAIL_OPTION_OPTED_LOADING,
  DETAIL_OPTION_OPTED_LOADED
} from "./types";

// GET POSTS

export const getSinglePost = post_id => (dispatch, getState) => {
  axios
    .get(
      `http://localhost:8000/api/getallpolls/${post_id}`,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: GET_SINGLE_POST,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("something wrong !!");
    });
};

export const getComments = next => (dispatch, getState) => {
  axios
    .get(next, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_COMMENTS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const setCommentsToNormal = () => dispatch => {
  dispatch({
    type: SET_COMMENTS_TO_NORMAL
  });
};

// decrement_then_increment

// I thought to use async await but it's working just with the promise

export const decrement_then_incrementOfDetailedPost = (
  last_option_opted_id,
  opted_by_id,
  count_of_previous_option_opted,
  last_option_opted_index,
  option_id,
  post_id,
  count,
  option_index
) => (dispatch, getState) => {
  dispatch({
    type: DETAIL_OPTION_OPTED_LOADING,
    payload: null
  });
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
            type: DECREMENT_OPTION_COUNT_OF_DETAILED_POST,
            payload: {
              decrement_option_result: option_result.data,
              decrement_option_index: last_option_opted_index
            }
          });
          dispatch(
            incrementOptionOfDetailedPost(
              option_id,
              post_id,
              count,
              option_index
            )
          );
          dispatch({
            type: DETAIL_OPTION_OPTED_LOADED,
            payload: null
          });
        });
    })
    .catch(err => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      console.log(err);
      dispatch({
        type: DETAIL_OPTION_OPTED_LOADED,
        payload: null
      });
    });
};

// DECREMENT THE COUNT OF THE OPTION
export const decrementOptionOfDetailedPost = (
  last_option_opted_id,
  opted_by_id,
  count_of_previous_option_opted,
  last_option_opted_index,
  post_id
) => (dispatch, getState) => {
  dispatch({
    type: DETAIL_OPTION_OPTED_LOADING,
    payload: null
  });
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
            type: DECREMENT_OPTION_COUNT_OF_DETAILED_POST,
            payload: {
              decrement_option_result: option_result.data,
              decrement_option_index: last_option_opted_index
            }
          });
          dispatch({
            type: DETAIL_OPTION_OPTED_LOADED,
            payload: null
          });
        });
    })
    .catch(err => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      console.log(err);
      dispatch({
        type: DETAIL_OPTION_OPTED_LOADED,
        payload: null
      });
    });
};

// INCREMENT THE COUNT OF THE OPTION
export const incrementOptionOfDetailedPost = (
  posts_option,
  post_id,
  count,
  option_index
) => (dispatch, getState) => {
  dispatch({
    type: DETAIL_OPTION_OPTED_LOADING,
    payload: null
  });
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
            type: INCREMENT_OPTION_COUNT_OF_DETAILED_POST,
            payload: {
              optedby_result: optedby_result.data,
              increment_option_result: option_result.data,
              increment_option_index: option_index
            }
          });
          dispatch({
            type: DETAIL_OPTION_OPTED_LOADED,
            payload: null
          });
        });
    })
    .catch(err => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      console.log(err);
      dispatch({
        type: DETAIL_OPTION_OPTED_LOADED,
        payload: null
      });
    });
};
