import React, { Component } from "react";

export class PollContent extends Component {
  render() {
    return <div className="post-para">{this.props.content}</div>;
  }
}

export default PollContent;
