import axios from "axios";
import { tokenConfig } from "./auth";
// import { socket } from "../store";

import { ADD_COMMENT, GET_COMMENTS } from "./types";

// ADD COMMENT

export const addComment = (
  post_type,
  posts,
  author,
  parent_comment,
  comment_content
) => (dispatch, getState) => {
  const comment = {
    post_type,
    posts,
    author,
    parent_comment,
    comment: comment_content
  };
  axios
    .post(
      "http://localhost:8000/api/comments/",
      JSON.stringify(comment),
      tokenConfig(getState)
    )
    .then(
      dispatch({
        type: ADD_COMMENT
      })
    )
    .catch(err => {
      console.log(err);
      //   dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// websocket actions

export const getComments = () => (dispatch, getState) => {
  dispatch({
    type: GET_COMMENTS,
    payload: "Receive this",
    socket: {
      send: true
    }
  });
};

// export const addComment = (
//   post_type,
//   posts,
//   author,
//   parent_comment,
//   comment_content
// ) => (dispatch, getState) => {
//   const comment = {
//     post_type,
//     posts,
//     author,
//     parent_comment,
//     comment: comment_content
//   };
//   socket.send(posts);
//   dispatch({
//     type: TEMP,
//     payload: "abc bla bla..."
//   });
// };
