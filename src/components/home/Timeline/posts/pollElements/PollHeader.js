import React, { Component } from "react";

export class PollHeader extends Component {
  render() {
    return (
      <div className="post-header">
        <span className="post-author-name">{this.props.author_name} </span>{" "}
        <span className="post-date"> {this.props.created_at}</span>
      </div>
    );
  }
}

export default PollHeader;
