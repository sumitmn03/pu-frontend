import {
  GET_ALL_USERS,
  GET_SINGLE_USER,
  FOLLOWING,
  FOLLOW,
  UNFOLLOW,
  GET_PROFILE_POLLS_OTHER_USERS,
  SET_PROFILE_POLLS_TO_NORMAL
} from "../actions/types";

const initialState = {
  following: [],
  all_users: [],
  host_user: {},
  profile: {},
  posts: [],
  next: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        all_users: [...action.payload]
      };

    case GET_SINGLE_USER:
      return {
        ...state,
        host_user: { ...action.payload },
        profile: { ...action.payload.profile },
        next: `http://localhost:8000/api/profilepoll/${action.payload.id}/`
      };

    case FOLLOWING:
      return {
        ...state,
        following: [...action.payload]
      };

    case FOLLOW:
      return {
        ...state,
        following: [...state.following, action.payload]
      };

    case UNFOLLOW:
      return {
        ...state,
        following: [
          ...state.following.slice(0, action.payload.following_index),
          ...state.following.slice(action.payload.following_index + 1)
        ]
      };

    case GET_PROFILE_POLLS_OTHER_USERS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.results],
        next: action.payload.next
      };

    case SET_PROFILE_POLLS_TO_NORMAL:
      return {
        ...state,
        following: [],
        all_users: [],
        host_user: {},
        profile: {},
        posts: [],
        next: ""
      };

    default:
      return state;
  }
}
