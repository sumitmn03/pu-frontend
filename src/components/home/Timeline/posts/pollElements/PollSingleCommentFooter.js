import React, { Component } from "react";

import more from "../../../../../logos/more_logos/more.svg";

export class PollSingleCommentFooter extends Component {
  render() {
    return (
      <div className="ms-poll-single-comment-footer">
        <span
          className="ms-poll-single-comment-footer-item"
          onClick={this.props.handle_replies_button}
        >
          Replies
        </span>
        <span className="ms-poll-single-comment-footer-item">
          <img src={more} alt="more" className="ms-more-logo" />
        </span>
      </div>
    );
  }
}

export default PollSingleCommentFooter;
