import React, { Component } from "react";

// import components

import PollSingleComment from "./PollSingleComment";

export class PollComments extends Component {
  state = {
    comment: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { comment } = this.state;
    const { post, current_user } = this.props;
    this.props.addComment(
      post.post_type,
      post.id,
      current_user.id,
      null,
      comment
    );
    this.setState({ comment: "" });
  };

  render() {
    const { comment } = this.state;
    const { post, current_user } = this.props;

    return (
      <div className="ms-poll-comments-container">
        <form className="ms-poll-comments-header" onSubmit={this.onSubmit}>
          <input
            type="text"
            name="comment"
            className="ms-comment-input"
            placeholder="Write your comment here..."
            value={comment}
            onChange={this.onChange}
          />
          <button type="submit" className="ms-comment-button">
            Comment
          </button>
        </form>
        <div className="ms-poll-comments-body">
          {post.comments.map((comment, index) => {
            return (
              <PollSingleComment
                key={index}
                post={post}
                comment={comment}
                addComment={this.props.addComment}
                current_user={current_user}
              />
            );
          })}
        </div>{" "}
      </div>
    );
  }
}

export default PollComments;
