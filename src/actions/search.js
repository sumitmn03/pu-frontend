import axios from "axios";
// import { returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { SEARCH } from "./types";

// GET POSTS

export const search = search_query => (dispatch, getState) => {
  axios
    .get(
      `http://localhost:8000/api/search/${search_query}`,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: SEARCH,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("something wrong !!");
    });
};
