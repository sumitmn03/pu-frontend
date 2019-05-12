import React, { Component } from "react";
import DetailViewPollOptions from "./DetailViewPollOptions";

export class DetailViewPollMainOptions extends Component {
  state = {
    is_any_option_opted: false,
    last_option_opted: {},
    last_option_opted_index: null,
    count_of_previous_option_opted: 0,
    actions_are_ready: false,
    total_option_count: 0
  };

  render() {
    return <DetailViewPollOptions {...this.props} />;
  }
}

export default DetailViewPollMainOptions;
