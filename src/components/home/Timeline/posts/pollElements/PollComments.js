import React, { Component } from "react";

import InfiniteScroll from "react-infinite-scroller";

// import components

import PollSingleComment from "./PollSingleComment";

export class PollComments extends Component {
  state = {
    comment: ""
  };

  // componentDidMount() {
  //   this.loadMoreComments();
  // }

  loadMoreComments = () => {
    const { post, comment_page } = this.props;
    this.props.getComments(post.id, comment_page);
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
      comment,
      null
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
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMoreComments}
            hasMore={this.props.has_more_comments}
            loader={
              <div key={0} className="ms-timeline-loading-page">
                Loading ...
              </div>
            }
          >
            {this.props.comments.map((comment, index) => {
              return (
                <PollSingleComment
                  key={comment.id}
                  post={post}
                  comment={comment}
                  addComment={this.props.addComment}
                  current_user={current_user}
                  comment_index={index}
                />
              );
            })}
          </InfiniteScroll>
        </div>{" "}
      </div>
    );
  }
}

export default PollComments;
