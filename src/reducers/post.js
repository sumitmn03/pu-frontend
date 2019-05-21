import {
  GET_SINGLE_POST,
  GET_COMMENTS,
  SET_COMMENTS_TO_NORMAL,
  INCREMENT_OPTION_COUNT_OF_DETAILED_POST,
  DECREMENT_OPTION_COUNT_OF_DETAILED_POST,
  DETAIL_OPTION_OPTED_LOADING,
  DETAIL_OPTION_OPTED_LOADED
} from "../actions/types";

const initialState = {
  post: {},
  comments: [],
  comment_next_page: "",
  detail_option_opted_loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_COMMENTS_TO_NORMAL:
      return {
        ...state,
        post: {},
        comments: [],
        comment_next_page: ""
      };

    case GET_SINGLE_POST:
      return {
        ...state,
        post: action.payload,
        comment_next_page: `http://localhost:8000/api/getcomments/${
          action.payload.id
        }/`
      };
    case INCREMENT_OPTION_COUNT_OF_DETAILED_POST:
      let {
        optedby_result,
        increment_option_result,
        increment_option_index
      } = action.payload;
      return {
        ...state,
        post: {
          ...state.post,
          options: [
            // keeping options before selected option unchanged
            ...state.post.options.slice(0, increment_option_index),
            // updating the selected option
            increment_option_result,
            // keeping options after selected option unchanged

            ...state.post.options.slice(increment_option_index + 1)
          ],
          option_opted_by_current_user: [optedby_result]
        }
      };
    case DECREMENT_OPTION_COUNT_OF_DETAILED_POST:
      let { decrement_option_result, decrement_option_index } = action.payload;
      return {
        ...state,
        post: {
          ...state.post,
          options: [
            // keeping options before selected option unchanged
            ...state.post.options.slice(0, decrement_option_index),
            // updating the selected option
            decrement_option_result,
            // keeping options after selected option unchanged

            ...state.post.options.slice(decrement_option_index + 1)
          ],
          option_opted_by_current_user: []
        }
      };
    case GET_COMMENTS:
      return {
        ...state,
        comments: [...state.comments, ...action.payload.results],
        comment_next_page: action.payload.next
      };

    // triggered when the websocket receives a new message from the server
    case "REDUX_WEBSOCKET::MESSAGE":
      const { comment_data, parent_comment_index } = JSON.parse(
        action.payload.message
      );
      if (comment_data.parent_comment === null) {
        return {
          ...state,
          comments: [comment_data, ...state.comments]
        };
      } else {
        return {
          ...state,
          comments: [
            ...state.comments.slice(0, parent_comment_index),
            {
              ...state.comments[parent_comment_index],
              replies: [
                comment_data,
                ...state.comments[parent_comment_index].replies
              ]
            },
            ...state.comments.slice(parent_comment_index + 1)
          ]
        };
      }

    case DETAIL_OPTION_OPTED_LOADING:
      return {
        ...state,
        detail_option_opted_loading: true
      };

    case DETAIL_OPTION_OPTED_LOADED:
      return {
        ...state,
        detail_option_opted_loading: false
      };

    default:
      return state;
  }
}
