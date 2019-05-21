import React, { Component } from "react";

import { Link } from "react-router-dom";

export class PollHeader extends Component {
  render() {
    let {
      author_id,
      author_name,
      created_at,
      poll_expired,
      expiry_date
    } = this.props;

    // let { poll_expired } = this.state;

    created_at = created_at.slice(0, 10);

    return (
      <div className="post-header">
        <Link
          to={{
            pathname: "/profile/:user_id".replace(":user_id", author_id)
          }}
          className="ms-link ms-findpeoples-name"
        >
          <span className="post-author-name">{author_name} </span>{" "}
        </Link>{" "}
        <span className="post-date"> {created_at}</span>
        {poll_expired ? (
          <span className="ms-poll-ended"> Poll ended</span>
        ) : expiry_date !== null ? (
          <span className="ms-poll-endson">
            {" "}
            <span className="ms-poll-endson-text">Poll ends on</span>
            {expiry_date}
          </span>
        ) : (
          ""
        )}
        {/* <span className="post-date"> {expiry_date}</span> */}
      </div>
    );
  }
}

export default PollHeader;
