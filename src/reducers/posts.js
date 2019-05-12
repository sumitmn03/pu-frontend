import {
  GET_POSTS,
  INCREMENT_OPTION_COUNT,
  DECREMENT_OPTION_COUNT
  // ADD_COMMENT,
  // ADD_REPLY,
  // POSTREPORTED
} from "../actions/types";

const initialState = {
  posts: [],
  page: 0,
  has_more_posts: true
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.polls],
        page: action.payload.page,
        has_more_posts: action.payload.has_more
      };
    case DECREMENT_OPTION_COUNT:
      let {
          decrement_option_result,
          decrement_post_index,
          decrement_option_index
        } = action.payload,
        decrement_selected_post = state.posts[decrement_post_index];
      return {
        ...state,
        // updating the posts
        posts: [
          // keeping post datas before the selected post as it is
          ...state.posts.slice(0, decrement_post_index),

          // updating the count of the option of the selected post
          // **********************************************************
          // **********************************************************

          {
            ...decrement_selected_post,
            options: [
              // keeping options before selected option unchanged
              ...decrement_selected_post.options.slice(
                0,
                decrement_option_index
              ),
              // updating the selected option
              decrement_option_result,
              // keeping options after selected option unchanged

              ...decrement_selected_post.options.slice(
                decrement_option_index + 1
              )
            ],
            option_opted_by_current_user: []
          },

          // **********************************************************
          // **********************************************************
          // updating finished... so keeping all other post datas ater the selected post as it is

          ...state.posts.slice(decrement_post_index + 1)
        ]
      };
    case INCREMENT_OPTION_COUNT:
      let {
          optedby_result,
          increment_option_result,
          increment_post_index,
          increment_option_index
        } = action.payload,
        increment_selected_post = state.posts[increment_post_index];
      return {
        ...state,
        // updating the posts
        posts: [
          // keeping post datas before the selected post as it is
          ...state.posts.slice(0, increment_post_index),

          // updating the count of the option of the selected post
          // **********************************************************
          // **********************************************************

          {
            ...increment_selected_post,
            options: [
              // keeping options before selected option unchanged
              ...increment_selected_post.options.slice(
                0,
                increment_option_index
              ),
              // updating the selected option
              increment_option_result,
              // keeping options after selected option unchanged

              ...increment_selected_post.options.slice(
                increment_option_index + 1
              )
            ],
            option_opted_by_current_user: [optedby_result]
          },

          // **********************************************************
          // **********************************************************
          // updating finished... so keeping all other post datas ater the selected post as it is

          ...state.posts.slice(increment_post_index + 1)
        ]
      };

    default:
      return state;
  }
}
