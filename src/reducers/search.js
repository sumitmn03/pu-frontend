import { SEARCH } from "../actions/types";

const initialState = {
  search_result: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        search_result: [...action.payload]
      };
    default:
      return state;
  }
}
