import React, { Component } from "react";

import { Link } from "react-router-dom";

export class PollContent extends Component {
  render() {
    return (
      <Link
        to={{
          pathname: "/polldetail/:post_id".replace(
            ":post_id",
            this.props.post_id
          )
        }}
        // params={{ post_id: this.props.post_id }}
        className="ms-link"
      >
        <div className="post-para">{this.props.content}</div>
      </Link>
    );
  }
}

export default PollContent;
