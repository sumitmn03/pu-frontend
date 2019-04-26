import { NAVIGATION } from "../actions/types";

const initialState = {
  navigation: ""
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case NAVIGATION:
      return {
        ...state,
        navigation: action.payload
      };

    default:
      return state;
  }
}
