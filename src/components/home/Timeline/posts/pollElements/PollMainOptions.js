import React, { Component } from "react";
import PollOptions from "./PollOptions";

export class PollMainOptions extends Component {
  render() {
    return <PollOptions {...this.props} />;
  }
}

export default PollMainOptions;
