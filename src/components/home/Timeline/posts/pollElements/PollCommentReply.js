import React, { Component, Fragment } from "react";

export class PollCommentReply extends Component {
  render() {
    const { reply } = this.props;

    return (
      <Fragment>
        <div className="ms-poll-single-comment-reply">
          <div className="ms-poll-single-comment-header">
            {reply.author_name}
          </div>
          <div className="ms-poll-single-comment-content">{reply.comment}</div>
        </div>
      </Fragment>
    );
  }
}

export default PollCommentReply;
