import { send } from "@giantmachines/redux-websocket";
// ADD COMMENT

export const addComment = (
  post_type,
  posts,
  author,
  parent_comment,
  comment_content,
  parent_comment_index
) => dispatch => {
  let final_data = JSON.stringify({
    post_type,
    posts,
    author,
    parent_comment,
    comment_content,
    parent_comment_index
  });
  dispatch(send(final_data));
};
