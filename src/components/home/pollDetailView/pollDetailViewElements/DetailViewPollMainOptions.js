import React, { Component } from "react";
import DetailViewPollOptions from "./DetailViewPollOptions";

export class DetailViewPollMainOptions extends Component {
  render() {
    return <DetailViewPollOptions {...this.props} />;
  }
}

export default DetailViewPollMainOptions;
