import React, { Component, Fragment } from "react";

import PollCommentReplies from "./PollCommentReplies";
import PollSingleCommentFooter from "./PollSingleCommentFooter";

export class PollSingleComment extends Component {
  state = {
    id: "id"
  };
  componentDidMount() {
    let id = this.props.comment.id + "comment_id";
    this.setState({ id });
  }

  handle_replies_button = () => {
    document.getElementById(this.state.id).classList.toggle("show");
  };

  render() {
    const { comment } = this.props;
    const { id } = this.state;
    return (
      <Fragment>
        <div className="ms-poll-single-comment">
          <div className="ms-poll-single-comment-header">
            {comment.author_name}
          </div>
          <div className="ms-poll-single-comment-content">
            {comment.comment}
          </div>
          <PollSingleCommentFooter
            comment={comment}
            handle_replies_button={this.handle_replies_button}
          />

          <div id={id} className="ms-replies-container">
            <PollCommentReplies comment={comment} {...this.props} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default PollSingleComment;
