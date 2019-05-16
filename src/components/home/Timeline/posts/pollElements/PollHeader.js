import React, { Component } from "react";

import { Link } from "react-router-dom";

export class PollHeader extends Component {
  render() {
    const { author_id, author_name, created_at } = this.props;

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
      </div>
    );
  }
}

export default PollHeader;
