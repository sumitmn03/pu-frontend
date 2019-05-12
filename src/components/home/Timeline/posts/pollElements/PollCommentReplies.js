import React, { Component, Fragment } from "react";

import PollCommentReply from "./PollCommentReply";

export class PollCommentReplies extends Component {
  state = {
    reply: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { reply } = this.state;
    const { post, comment, current_user, comment_index } = this.props;
    this.props.addComment(
      post.post_type,
      post.id,
      current_user.id,
      comment.id,
      reply,
      comment_index
    );
    this.setState({ reply: "" });
  };

  render() {
    const { reply } = this.state;
    const { comment } = this.props;

    return (
      <Fragment>
        {" "}
        <form className="ms-poll-replies-header" onSubmit={this.onSubmit}>
          <input
            type="text"
            name="reply"
            className="ms-comment-input"
            placeholder="Write your Reply here..."
            value={reply}
            onChange={this.onChange}
          />
          <button type="submit" className="ms-comment-button">
            Reply
          </button>
        </form>
        <div className="ms-poll-replies-body">
          {comment.replies.map((reply, index) => {
            return <PollCommentReply key={index} reply={reply} />;
          })}
        </div>
      </Fragment>
    );
  }
}

export default PollCommentReplies;
