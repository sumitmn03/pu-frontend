import axios from "axios";
// import { returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_SINGLE_POST } from "./types";

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
